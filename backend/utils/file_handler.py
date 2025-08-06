import os
import uuid
from pathlib import Path
from typing import Optional
import PyPDF2
from docx import Document
import io

class FileHandler:
    def __init__(self):
        self.upload_dir = Path("uploads")
        self.upload_dir.mkdir(exist_ok=True)
        
        # Allowed file extensions and their MIME types
        self.allowed_extensions = {
            '.pdf': 'application/pdf',
            '.doc': 'application/msword',
            '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            '.txt': 'text/plain'
        }
    
    def is_valid_file_type(self, filename: str) -> bool:
        """Check if the uploaded file has a valid extension"""
        if not filename:
            return False
        
        file_extension = Path(filename).suffix.lower()
        return file_extension in self.allowed_extensions
    
    def save_uploaded_file(self, file) -> Path:
        """Save uploaded file to disk"""
        # Get file extension
        file_extension = Path(file.filename).suffix.lower()
        
        # Create unique filename
        unique_id = str(uuid.uuid4())
        filename = f"{unique_id}{file_extension}"
        file_path = self.upload_dir / filename
        
        # Save file
        with open(file_path, 'wb') as f:
            content = file.file.read()
            f.write(content)
        
        return file_path
    
    def extract_text_from_file(self, file_path: Path) -> Optional[str]:
        """Extract text from various file formats"""
        try:
            file_extension = file_path.suffix.lower()
            
            if file_extension == '.pdf':
                return self._extract_text_from_pdf(file_path)
            elif file_extension in ['.doc', '.docx']:
                return self._extract_text_from_docx(file_path)
            elif file_extension == '.txt':
                return self._extract_text_from_txt(file_path)
            else:
                return None
                
        except Exception as e:
            print(f"Error extracting text from file {file_path}: {str(e)}")
            return None
    
    def _extract_text_from_pdf(self, file_path: Path) -> str:
        """Extract text from PDF file"""
        try:
            with open(file_path, 'rb') as f:
                content = f.read()
            
            pdf_reader = PyPDF2.PdfReader(io.BytesIO(content))
            text = ""
            
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"
            
            return text.strip()
        except Exception as e:
            print(f"Error reading PDF file: {str(e)}")
            return ""
    
    def _extract_text_from_docx(self, file_path: Path) -> str:
        """Extract text from DOCX file"""
        try:
            doc = Document(file_path)
            text = ""
            
            for paragraph in doc.paragraphs:
                text += paragraph.text + "\n"
            
            return text.strip()
        except Exception as e:
            print(f"Error reading DOCX file: {str(e)}")
            return ""
    
    def _extract_text_from_txt(self, file_path: Path) -> str:
        """Extract text from TXT file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            return content.strip()
        except Exception as e:
            print(f"Error reading TXT file: {str(e)}")
            return ""
    
    def cleanup_file(self, file_path: Path):
        """Remove processed file from disk"""
        try:
            if file_path.exists():
                file_path.unlink()
                print(f"Cleaned up file: {file_path}")
        except Exception as e:
            print(f"Error cleaning up file {file_path}: {str(e)}") 
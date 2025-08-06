# JobWiz AI - AI-Powered Resume Optimization Platform

JobWiz AI is a full-stack web application that helps job seekers optimize their resumes using artificial intelligence. The platform analyzes resumes against specific job descriptions and provides AI-enhanced versions tailored for each position.

## 🚀 Features

### Core Functionality
- **Resume Upload**: Support for PDF, DOCX, and TXT files
- **Job Description Analysis**: AI-powered analysis of job requirements
- **Resume Optimization**: AI-enhanced resume generation
- **Side-by-Side Comparison**: Original vs AI-optimized resume view
- **Download Optimized Resume**: Export AI-enhanced resume as text file

### AI-Powered Analysis
- **Resume Analysis**: Comprehensive analysis of skills, experience, and education
- **Job Matching**: Matching resume skills with job requirements
- **Skill Gap Analysis**: Identification of missing skills
- **ATS Optimization**: Keyword optimization for Applicant Tracking Systems
- **Professional Enhancement**: Language and presentation improvements

### User Experience
- **Landing Page**: Upload resume and job description directly
- **Analysis Results**: Detailed breakdown of resume strengths and improvements
- **AI Resume Editor**: Interactive side-by-side comparison
- **Real-time Processing**: Live AI generation with progress indicators
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **React Router** for navigation
- **React Hook Form** with Zod validation
- **Lucide React** for icons
- **Sonner** for toast notifications

### Backend
- **FastAPI** (Python) for API server
- **Uvicorn** for ASGI server
- **OpenAI GPT-4** for AI analysis and optimization
- **PyPDF2** for PDF text extraction
- **python-docx** for DOCX text extraction
- **python-multipart** for file uploads
- **CORS** middleware for cross-origin requests

### Development Tools
- **TypeScript** for type safety
- **ESLint** and **Prettier** for code formatting
- **Git** for version control
- **Python virtual environment** for backend dependencies

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **OpenAI API Key** (for AI functionality)
- **Git** (for cloning the repository)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd jobwiz-ai-landing
```

### 2. Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:8080`

### 3. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
# Create a .env file in the backend directory
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
```

### 4. Start Backend Server
```bash
# From the backend directory
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend API will be available at `http://localhost:8000`

## 🔧 Environment Variables

### Backend (.env file)
```env
OPENAI_API_KEY=your_openai_api_key_here
```

### Frontend (.env file)
```env
VITE_API_URL=http://localhost:8000
```

## 📖 Usage

### 1. Upload Resume and Job Description
- Visit the landing page
- Upload your resume (PDF, DOCX, or TXT format)
- Paste or upload the job description
- Click "Analyze Resume"

### 2. Review Analysis Results
- View detailed analysis of your resume
- See skill matching and gaps
- Review AI recommendations
- Access the AI Resume Editor

### 3. AI Resume Editor
- Compare original vs AI-optimized resume
- Copy sections to clipboard
- Download the complete AI-optimized resume
- View detailed changes and improvements

### 4. Download Optimized Resume
- Click "Download Optimized Resume"
- Get a text file with the AI-enhanced version
- Use the optimized resume for job applications

## 🏗️ Project Structure

```
jobwiz-ai-landing/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Page components
│   │   ├── Upload.tsx      # Resume upload page
│   │   ├── AnalysisResults.tsx  # Analysis results page
│   │   └── ResumeEditor.tsx     # AI resume editor
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── backend/
│   ├── main.py             # FastAPI application
│   ├── services/           # AI analysis services
│   │   ├── resume_analyzer.py
│   │   └── job_matcher.py
│   ├── utils/              # Utility functions
│   │   └── file_handler.py
│   ├── requirements.txt    # Python dependencies
│   └── .gitignore         # Backend gitignore
├── public/                 # Static assets
├── package.json           # Frontend dependencies
└── README.md             # This file
```

## 🔌 API Endpoints

### Resume Analysis
- `POST /api/upload` - Upload resume and job description for analysis
- `POST /api/generate-optimized-resume` - Generate AI-optimized resume
- `POST /api/resume-suggestions` - Get AI suggestions for resume sections

### Job Analysis
- `POST /api/job-description-analysis` - Analyze job posting
- `POST /api/resume-optimization-tips` - Get optimization tips
- `POST /api/interview-preparation` - Get interview guidance
- `POST /api/career-advice` - Get personalized career advice

### Health Check
- `GET /health` - Backend health status
- `GET /` - API root endpoint

## 🎯 Key Features Explained

### Resume Analysis
The AI analyzes your resume and extracts:
- **Professional Summary**: Key highlights and value proposition
- **Work Experience**: Detailed job history and achievements
- **Skills**: Technical and soft skills
- **Education**: Academic background and certifications

### Job Matching
The system compares your resume with job requirements:
- **Matching Skills**: Skills you have that match the job
- **Missing Skills**: Critical skills you need to develop
- **Match Percentage**: Overall compatibility score
- **Recommendations**: Specific improvements for the role

### AI Optimization
The AI enhances your resume by:
- **Keyword Optimization**: Adding relevant keywords for ATS
- **Language Enhancement**: Improving professional language
- **Structure Optimization**: Better organization and formatting
- **Content Enhancement**: Making achievements more compelling

## 🚀 Deployment

### Frontend Deployment
```bash
# Build for production
npm run build

# Deploy to your preferred hosting service
# (Vercel, Netlify, AWS S3, etc.)
```

### Backend Deployment
```bash
# Install production dependencies
pip install -r requirements.txt

# Set production environment variables
export OPENAI_API_KEY=your_production_key

# Run with production server
uvicorn main:app --host 0.0.0.0 --port 8000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed description
3. Include error messages and steps to reproduce

## 🔮 Future Enhancements

- **Multiple Resume Templates**: Different resume formats and styles
- **Cover Letter Generator**: AI-powered cover letter creation
- **Interview Preparation**: Mock interview questions and answers
- **Career Path Analysis**: Long-term career planning suggestions
- **Resume Tracking**: Track application success rates
- **Mobile App**: Native mobile application
- **Multi-language Support**: Support for multiple languages

## 🙏 Acknowledgments

- **OpenAI** for providing the GPT-4 API
- **shadcn/ui** for the beautiful UI components
- **Tailwind CSS** for the utility-first CSS framework
- **FastAPI** for the modern Python web framework

---

**JobWiz AI** - Making job applications smarter with AI! 🚀

# JobWiz AI - Complete Setup Guide

This guide will help you set up both the frontend and backend for the JobWiz AI application.

## Project Overview

JobWiz AI is a full-stack application that provides AI-powered resume analysis and job matching. It consists of:

- **Frontend**: React TypeScript application with modern UI
- **Backend**: FastAPI Python application with AI analysis capabilities

## Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- Git

## Quick Start

### 1. Clone and Setup Frontend

```bash
# Navigate to the project directory
cd jobwiz-ai-landing

# Install frontend dependencies
npm install

# Start the frontend development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 2. Setup Backend

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

# Copy environment file
cp env.example .env

# Edit .env and add your OpenAI API key
# OPENAI_API_KEY=your-actual-openai-api-key-here

# Start the backend server
python start.py
```

The backend will be available at `http://localhost:8000`

### 3. Test the Application

1. Open `http://localhost:5173` in your browser
2. Navigate to the upload page
3. Upload a resume and provide job details
4. View the AI analysis results

## Detailed Setup Instructions

### Frontend Setup

The frontend is a React TypeScript application using:
- Vite for build tooling
- Tailwind CSS for styling
- shadcn/ui for components
- React Hook Form for form handling
- React Router for navigation

**Key Features:**
- Modern, responsive UI
- File upload with validation
- Real-time form validation
- Toast notifications
- CORS-enabled API integration

### Backend Setup

The backend is a FastAPI application with:
- File upload handling
- Text extraction from multiple formats
- AI-powered resume analysis
- Job matching algorithms
- CORS support

**Supported File Formats:**
- PDF (using PyPDF2)
- DOCX (using python-docx)
- TXT (direct text reading)

**API Endpoints:**
- `GET /health` - Health check
- `POST /api/upload` - Upload resume and job details
- `GET /api/analysis/{id}` - Get analysis results

### Environment Configuration

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000
```

#### Backend (.env)
```env
OPENAI_API_KEY=your-openai-api-key-here
HOST=0.0.0.0
PORT=8000
DEBUG=True
```

## Development Workflow

### Running Both Services

1. **Terminal 1 - Frontend:**
   ```bash
   npm run dev
   ```

2. **Terminal 2 - Backend:**
   ```bash
   cd backend
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   python start.py
   ```

### Testing

#### Frontend Tests
```bash
npm run build  # Check for TypeScript errors
```

#### Backend Tests
```bash
cd backend
python test_api.py
```

## API Integration

The frontend communicates with the backend through the `/api/upload` endpoint:

```javascript
// Example API call from frontend
const formData = new FormData();
formData.append("resume", file);
formData.append("job_title", "Software Engineer");
formData.append("company", "Tech Corp");
formData.append("job_description", "Job description text...");

const response = await fetch("http://localhost:8000/api/upload", {
  method: "POST",
  body: formData,
});
```

## File Structure

```
jobwiz-ai-landing/
├── src/                    # Frontend source code
│   ├── pages/             # React pages
│   ├── components/        # React components
│   └── ...
├── backend/               # Backend source code
│   ├── main.py           # FastAPI application
│   ├── services/         # Business logic
│   ├── utils/            # Utilities
│   └── ...
├── package.json           # Frontend dependencies
└── README.md             # Project documentation
```

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend is running on port 8000
   - Check that frontend URL is in CORS configuration

2. **File Upload Errors**
   - Verify file size is under 5MB
   - Check file format (PDF, DOC, DOCX, TXT only)

3. **OpenAI API Errors**
   - Ensure API key is correctly set in `.env`
   - Check API key has sufficient credits

4. **Port Conflicts**
   - Frontend: Change port in `vite.config.ts`
   - Backend: Change port in `.env` file

### Debugging

#### Frontend
- Check browser console for errors
- Use React DevTools for component debugging
- Check network tab for API calls

#### Backend
- Check console output for error messages
- Use FastAPI's automatic documentation at `http://localhost:8000/docs`
- Test endpoints with `python test_api.py`

## Production Deployment

### Frontend
```bash
npm run build
# Deploy dist/ folder to your hosting service
```

### Backend
```bash
# Install production dependencies
pip install gunicorn

# Run with gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review the API documentation at `http://localhost:8000/docs`
3. Check console logs for error messages
4. Ensure all dependencies are installed correctly 
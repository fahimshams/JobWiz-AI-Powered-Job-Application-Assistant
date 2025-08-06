# JobWiz AI Backend

A FastAPI-based backend service for AI-powered resume analysis and job matching.

## Features

- Resume upload and text extraction (PDF, DOC, DOCX, TXT)
- **Enhanced AI-powered resume analysis** with detailed insights
- **Advanced job requirement matching** with skill gap analysis
- **Personalized AI recommendations** for career improvement
- **Comprehensive skill analysis** with transferable skills identification
- **Resume scoring** (0-100) based on multiple criteria
- **AI insights** for career trajectory and market positioning
- File validation and security
- CORS support for frontend integration

## Setup Instructions

### 1. Install Dependencies

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Environment Configuration

Copy the example environment file and configure your settings:

```bash
cp env.example .env
```

Edit `.env` and add your OpenAI API key:

```env
OPENAI_API_KEY=your-actual-openai-api-key-here
```

### 3. Run the Server

```bash
# Development mode with auto-reload
python main.py

# Or using uvicorn directly
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The server will be available at `http://localhost:8000`

## API Documentation

### Health Check
- **GET** `/health`
- Returns server health status

### Upload Resume and Job Details
- **POST** `/api/upload`
- **Content-Type**: `multipart/form-data`

**Parameters:**
- `resume`: File upload (PDF, DOC, DOCX, TXT, max 5MB)
- `job_title`: String
- `company`: String  
- `job_description`: String

**Response:**
```json
{
  "success": true,
  "message": "Analysis completed successfully",
  "analysis_id": "uuid-string",
  "resume_analysis": {
    "skills": ["Python", "React", "SQL"],
    "experience": [...],
    "education": [...],
    "contact_info": {...},
    "summary": "...",
    "strengths": [...],
    "areas_for_improvement": [...],
    "ai_insights": [
      "Strong technical foundation with leadership potential",
      "Career trajectory shows consistent growth in responsibility",
      "Well-positioned for senior-level roles in tech industry"
    ],
    "overall_score": 85
  },
  "job_matching": {
    "match_percentage": 75.5,
    "matching_skills": ["Python", "React"],
    "missing_skills": ["Docker", "Kubernetes"],
    "extra_skills": ["MongoDB", "AWS"],
    "total_resume_skills": 15,
    "total_job_skills": 8,
    "matching_count": 6,
    "ai_analysis": {
      "overall_fit": "Good fit for the role with some skill gaps",
      "strength_areas": ["Technical skills", "Project management"],
      "concern_areas": ["DevOps experience", "Cloud platforms"],
      "role_alignment": "Candidate's background aligns well with the position"
    },
    "skill_gaps": [
      {
        "skill": "Docker",
        "importance": "High",
        "suggestion": "Consider taking Docker certification course"
      }
    ],
    "transferable_skills": [
      {
        "skill": "Project Management",
        "relevance": "Highly relevant for team leadership",
        "application": "Can be applied to technical project coordination"
      }
    ]
  },
  "recommendations": [
    "Highlight your leadership experience in team management and mentoring",
    "Consider gaining Docker and Kubernetes certifications to address skill gaps",
    "Quantify your achievements with specific metrics and percentages",
    "Tailor your resume to emphasize cloud platform experience",
    "Include specific examples of cross-functional collaboration"
  ]
}
```

### Get Analysis Results
- **GET** `/api/analysis/{analysis_id}`
- Retrieve analysis results by ID

## Project Structure

```
backend/
├── main.py                 # FastAPI application entry point
├── requirements.txt        # Python dependencies
├── env.example            # Environment variables template
├── README.md              # This file
├── uploads/               # Uploaded files directory
├── services/
│   ├── resume_analyzer.py # Resume analysis service
│   └── job_matcher.py     # Job matching service
└── utils/
    └── file_handler.py    # File processing utilities
```

## File Support

The backend supports the following file formats:
- **PDF**: Text extraction using PyPDF2
- **DOCX**: Text extraction using python-docx
- **TXT**: Direct text reading
- **DOC**: Basic support (requires additional setup)

## Security Features

- File type validation
- File size limits (5MB)
- CORS configuration
- Input validation
- Error handling

## Development

### Running Tests
```bash
# Test API endpoints
pytest

# Test AI prompts (requires OpenAI API key)
python test_ai_prompts.py

# Test basic API functionality
python test_api.py
```

### Code Formatting
```bash
# Install black for code formatting
pip install black

# Format code
black .
```

## Production Deployment

For production deployment:

1. Set `DEBUG=False` in environment variables
2. Configure proper CORS origins
3. Set up a reverse proxy (nginx)
4. Use a production ASGI server (gunicorn)
5. Implement proper logging
6. Add database integration for persistent storage

## Troubleshooting

### Common Issues

1. **OpenAI API Key Error**: Ensure your API key is correctly set in `.env`
2. **File Upload Errors**: Check file size and format restrictions
3. **CORS Errors**: Verify frontend URL is in `ALLOWED_ORIGINS`
4. **Import Errors**: Ensure all dependencies are installed

### Logs

Check console output for detailed error messages and debugging information. 
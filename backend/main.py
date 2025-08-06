from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
from dotenv import load_dotenv
from utils.file_handler import FileHandler
from services.resume_analyzer import ResumeAnalyzer
from services.job_matcher import JobMatcher
from pydantic import BaseModel
from typing import List, Optional

# Load environment variables
load_dotenv()

app = FastAPI(
    title="JobWiz AI Resume Analyzer",
    description="AI-powered resume analysis and job matching service",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:8080",
        "http://127.0.0.1:8080",
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
file_handler = FileHandler()
resume_analyzer = ResumeAnalyzer()
job_matcher = JobMatcher()

class ResumeSectionRequest(BaseModel):
    section_id: str
    section_title: str
    original_content: str
    job_title: str
    job_description: str
    matching_skills: List[str]
    missing_skills: List[str]
    full_resume: str = ""

class JobDescriptionRequest(BaseModel):
    job_title: str
    company: str
    job_description: str

class ResumeOptimizationRequest(BaseModel):
    resume_text: str
    job_title: str
    job_description: str
    target_role: str

class AIResumeGenerationRequest(BaseModel):
    original_resume: str
    job_title: str
    job_description: str
    matching_skills: List[str]
    missing_skills: List[str]
    section_type: str  # "full", "summary", "experience", "skills", "education"

class InterviewPrepRequest(BaseModel):
    job_title: str
    company: str
    resume_analysis: dict
    job_matching: dict

@app.get("/")
async def root():
    return {"message": "JobWiz AI Resume Analyzer API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "JobWiz AI Resume Analyzer"}

@app.post("/api/upload")
async def upload_resume(
    resume: UploadFile = File(...),
    job_title: str = Form(...),
    company: str = Form(...),
    job_description: str = Form(...)
):
    try:
        # Validate file
        if not file_handler.is_valid_file_type(resume.filename):
            raise HTTPException(status_code=400, detail="Invalid file type. Only PDF, DOC, DOCX, and TXT files are allowed.")
        
        # Save file
        file_path = file_handler.save_uploaded_file(resume)
        
        # Extract text
        resume_text = file_handler.extract_text_from_file(file_path)
        
        # Analyze resume
        resume_analysis = resume_analyzer.analyze_resume(resume_text)
        
        # Match job
        job_matching = job_matcher.match_job(resume_text, job_description)
        
        # Generate recommendations
        recommendations = job_matcher.generate_recommendations(resume_text, job_description)
        
        # Cleanup file
        file_handler.cleanup_file(file_path)
        
        return {
            "resume_analysis": resume_analysis,
            "job_matching": job_matching,
            "recommendations": recommendations,
            "originalResume": resume_text
        }
        
    except Exception as e:
        # Cleanup file if it exists
        if 'file_path' in locals():
            file_handler.cleanup_file(file_path)
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/resume-suggestions")
async def get_resume_suggestions(request: ResumeSectionRequest):
    try:
        # Create a comprehensive prompt for AI suggestions
        if request.section_id == "full-resume":
            # For full resume analysis, use the complete resume content
            prompt = f"""
            As an expert resume writer and career coach, provide 7-10 specific, actionable suggestions for improving this complete resume to better match the job requirements.
            
            COMPLETE RESUME:
            {request.full_resume}
            
            JOB CONTEXT:
            - Job Title: {request.job_title}
            - Matching Skills: {', '.join(request.matching_skills)}
            - Missing Skills: {', '.join(request.missing_skills)}
            
            REQUIREMENTS:
            1. Analyze the complete resume structure and content
            2. Focus on industry-specific improvements
            3. Include ATS optimization strategies
            4. Provide quantifiable achievement suggestions
            5. Use executive-level language
            6. Address specific skill gaps
            7. Include leadership and strategic thinking elements
            8. Provide specific action verbs and metrics
            9. Consider overall resume flow and organization
            10. Suggest improvements for each major section
            
            Format each suggestion as a clear, actionable recommendation that a job seeker can immediately implement.
            """
        else:
            # For individual sections, use the section content
            prompt = f"""
            As an expert resume writer and career coach, provide 5-7 specific, actionable suggestions for improving the {request.section_title} section of a resume.
            
            SECTION CONTENT:
            {request.original_content}
            
            CONTEXT:
            - Job Title: {request.job_title}
            - Matching Skills: {', '.join(request.matching_skills)}
            - Missing Skills: {', '.join(request.missing_skills)}
            
            REQUIREMENTS:
            1. Focus on industry-specific improvements
            2. Include ATS optimization strategies
            3. Provide quantifiable achievement suggestions
            4. Use executive-level language
            5. Address specific skill gaps
            6. Include leadership and strategic thinking elements
            7. Provide specific action verbs and metrics
            
            Format each suggestion as a clear, actionable recommendation that a job seeker can immediately implement.
            """
        
        # Call OpenAI for suggestions with increased tokens
        response = resume_analyzer.client.chat.completions.create(
            model="gpt-4",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert resume writer and career coach with 15+ years of experience helping executives and professionals land their dream jobs. Provide specific, actionable, and industry-standard recommendations."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            max_tokens=1000,  # Increased from 500 to 1000
            temperature=0.7
        )
        
        # Extract suggestions from response
        ai_suggestions = response.choices[0].message.content.strip().split('\n')
        # Clean up suggestions
        suggestions = [s.strip().replace('- ', '').replace('• ', '').replace('* ', '') for s in ai_suggestions if s.strip()]
        
        return {
            "suggestions": suggestions,
            "section_id": request.section_id,
            "message": "Expert AI recommendations generated successfully"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate AI suggestions: {str(e)}")

@app.post("/api/job-description-analysis")
async def analyze_job_description(request: JobDescriptionRequest):
    try:
        prompt = f"""
        As an expert career coach and job market analyst, provide a comprehensive analysis of this job posting:
        
        Job Title: {request.job_title}
        Company: {request.company}
        Job Description: {request.job_description}
        
        Provide analysis in the following areas:
        1. Key Requirements Analysis - What are the most critical skills and qualifications?
        2. Company Culture Insights - What does this posting reveal about the company culture?
        3. Career Growth Potential - What opportunities for advancement does this role offer?
        4. Salary Range Estimation - Based on the requirements, what's the likely salary range?
        5. Application Strategy - What should a candidate emphasize in their application?
        6. Red Flags or Concerns - Are there any warning signs in this posting?
        7. Competitive Advantages - What would make a candidate stand out for this role?
        
        Format as a structured analysis with clear sections and actionable insights.
        """
        
        response = resume_analyzer.client.chat.completions.create(
            model="gpt-4",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert career coach and job market analyst with deep knowledge of various industries and hiring practices."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            max_tokens=800,
            temperature=0.6
        )
        
        analysis = response.choices[0].message.content.strip()
        
        return {
            "analysis": analysis,
            "job_title": request.job_title,
            "company": request.company,
            "message": "Job description analysis completed"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to analyze job description: {str(e)}")

@app.post("/api/resume-optimization-tips")
async def get_resume_optimization_tips(request: ResumeOptimizationRequest):
    try:
        prompt = f"""
        As an expert resume writer and ATS specialist, provide comprehensive optimization tips for a resume targeting this specific role:
        
        Target Role: {request.target_role}
        Job Title: {request.job_title}
        Job Description: {request.job_description}
        
        Provide optimization tips in these categories:
        1. ATS Optimization - Keywords and formatting for applicant tracking systems
        2. Content Enhancement - How to improve the actual content and achievements
        3. Structure Improvements - Better organization and flow
        4. Industry-Specific Tips - Tailored advice for this field
        5. Quantifiable Achievements - How to add measurable impact
        6. Professional Summary - How to craft a compelling opening
        7. Skills Section - How to organize and prioritize skills
        
        Make each tip specific, actionable, and relevant to this particular job.
        """
        
        response = resume_analyzer.client.chat.completions.create(
            model="gpt-4",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert resume writer and ATS specialist with extensive experience helping candidates optimize their resumes for specific roles."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            max_tokens=600,
            temperature=0.7
        )
        
        tips = response.choices[0].message.content.strip()
        
        return {
            "optimization_tips": tips,
            "target_role": request.target_role,
            "message": "Resume optimization tips generated"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate optimization tips: {str(e)}")

@app.post("/api/interview-preparation")
async def get_interview_preparation(request: InterviewPrepRequest):
    try:
        prompt = f"""
        As an expert interview coach and career consultant, provide comprehensive interview preparation guidance for this specific role:
        
        Job Title: {request.job_title}
        Company: {request.company}
        
        Based on the resume analysis and job matching data, provide:
        1. Key Talking Points - What achievements and experiences to emphasize
        2. Potential Questions - Likely interview questions for this role
        3. Skill Demonstrations - How to showcase relevant skills
        4. Company Research - What to research about this company
        5. Salary Negotiation - Tips for salary discussions
        6. Follow-up Strategy - How to follow up after the interview
        7. Common Pitfalls - What to avoid during the interview
        
        Make all advice specific to this role and company.
        """
        
        response = resume_analyzer.client.chat.completions.create(
            model="gpt-4",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert interview coach and career consultant with extensive experience preparing candidates for interviews across various industries."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            max_tokens=700,
            temperature=0.6
        )
        
        preparation_guide = response.choices[0].message.content.strip()
        
        return {
            "interview_preparation": preparation_guide,
            "job_title": request.job_title,
            "company": request.company,
            "message": "Interview preparation guide generated"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate interview preparation: {str(e)}")

@app.post("/api/career-advice")
async def get_career_advice(request: JobDescriptionRequest):
    try:
        prompt = f"""
        As an expert career coach and industry consultant, provide personalized career advice for someone applying to this position:
        
        Job Title: {request.job_title}
        Company: {request.company}
        Job Description: {request.job_description}
        
        Provide advice in these areas:
        1. Career Trajectory - How this role fits into long-term career goals
        2. Skill Development - What skills to develop for this role
        3. Industry Trends - Current trends in this field
        4. Networking Opportunities - How to build relevant connections
        5. Professional Development - Certifications or training to consider
        6. Alternative Paths - Similar roles or career directions
        7. Market Positioning - How to position yourself in this market
        
        Make advice specific to this role and industry.
        """
        
        response = resume_analyzer.client.chat.completions.create(
            model="gpt-4",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert career coach and industry consultant with deep knowledge of various career paths and industry trends."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            max_tokens=600,
            temperature=0.7
        )
        
        career_advice = response.choices[0].message.content.strip()
        
        return {
            "career_advice": career_advice,
            "job_title": request.job_title,
            "company": request.company,
            "message": "Career advice generated"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate career advice: {str(e)}") 

@app.post("/api/generate-optimized-resume")
async def generate_optimized_resume(request: AIResumeGenerationRequest):
    try:
        # Create comprehensive prompt for AI resume generation
        if request.section_type == "full_resume":
            prompt = f"""
            As an expert resume writer, optimize this resume for the specific job below.
            IMPORTANT: Only enhance the existing content, do NOT add fake experience or achievements.
            
            ORIGINAL RESUME:
            {request.original_resume}
            
            JOB TITLE: {request.job_title}
            JOB DESCRIPTION: {request.job_description}
            REQUIRED SKILLS: {', '.join(request.matching_skills)}
            MISSING SKILLS: {', '.join(request.missing_skills)}
            
            REQUIREMENTS:
            1. Keep ALL existing information exactly as it is
            2. Only enhance the language and presentation
            3. Add relevant keywords naturally to existing content
            4. Use professional language and power verbs
            5. Do NOT add fake achievements, metrics, or experience
            6. Do NOT add skills the person doesn't have
            7. Maintain the same structure and format as the original
            8. Only improve the wording of existing content
            9. Use clear section headers like "PROFESSIONAL SUMMARY", "WORK EXPERIENCE", "SKILLS", "EDUCATION"
            10. Make the resume more compelling for this specific job
            
            Generate an optimized version of the resume that maintains the same structure but enhances the language and presentation for this specific job.
            """
        elif request.section_type == "summary":
            prompt = f"""
            As an expert resume writer, enhance the existing professional summary for this job.
            IMPORTANT: Only improve the existing summary, do NOT create a new one with fake experience.
            MAINTAIN THE SAME FORMAT AND STRUCTURE as the original.
            
            EXISTING SUMMARY:
            {request.original_resume}
            
            JOB TITLE: {request.job_title}
            JOB DESCRIPTION: {request.job_description}
            REQUIRED SKILLS: {', '.join(request.matching_skills)}
            
            REQUIREMENTS:
            1. Keep the same experience level and background
            2. Only enhance the language and presentation
            3. Add relevant keywords naturally
            4. Use professional language
            5. Do NOT add fake years of experience or achievements
            6. Only improve what's already there
            7. MAINTAIN THE EXACT SAME FORMAT AND STRUCTURE
            8. Keep the same length and style
            
            Generate an enhanced version that maintains the exact same format and structure.
            """
        elif request.section_type == "experience":
            prompt = f"""
            As an expert resume writer, enhance the existing experience descriptions for this job.
            IMPORTANT: Only improve the existing experience, do NOT add fake achievements or metrics.
            MAINTAIN THE EXACT SAME FORMAT AND STRUCTURE as the original.
            
            EXISTING EXPERIENCE:
            {request.original_resume}
            
            JOB TITLE: {request.job_title}
            JOB DESCRIPTION: {request.job_description}
            REQUIRED SKILLS: {', '.join(request.matching_skills)}
            
            REQUIREMENTS:
            1. Keep ALL existing achievements and responsibilities
            2. Only enhance the language and presentation
            3. Use power verbs for existing tasks
            4. Add relevant keywords naturally to existing content
            5. Do NOT add fake quantifiable metrics
            6. Do NOT add fake responsibilities or achievements
            7. Only improve the wording of what's already there
            8. MAINTAIN THE EXACT SAME FORMAT AND STRUCTURE
            9. Keep the same company names, durations, and basic information
            10. Only enhance the descriptions, not the structure
            
            Generate enhanced descriptions that maintain the exact same format and structure.
            """
        elif request.section_type == "skills":
            prompt = f"""
            As an expert resume writer, optimize the existing skills section for this job.
            IMPORTANT: Only work with existing skills, do NOT add skills the person doesn't have.
            MAINTAIN THE EXACT SAME FORMAT AND STRUCTURE as the original.
            
            EXISTING SKILLS:
            {request.original_resume}
            
            JOB TITLE: {request.job_title}
            REQUIRED SKILLS: {', '.join(request.matching_skills)}
            MISSING SKILLS: {', '.join(request.missing_skills)}
            
            REQUIREMENTS:
            1. Keep ALL existing skills exactly as they are
            2. Only reorganize and present them better
            3. Prioritize skills that match job requirements
            4. Use industry-standard terminology for existing skills
            5. Do NOT add skills the person doesn't have
            6. Only improve the presentation of existing skills
            7. MAINTAIN THE EXACT SAME FORMAT AND STRUCTURE
            8. Keep the same skills, just enhance the presentation
            
            Generate an optimized presentation that maintains the exact same format and structure.
            """
        else:  # education
            prompt = f"""
            As an expert resume writer, enhance the existing education section for this job.
            IMPORTANT: Only improve the existing education, do NOT add fake degrees or achievements.
            MAINTAIN THE EXACT SAME FORMAT AND STRUCTURE as the original.
            
            EXISTING EDUCATION:
            {request.original_resume}
            
            JOB TITLE: {request.job_title}
            REQUIRED SKILLS: {', '.join(request.matching_skills)}
            
            REQUIREMENTS:
            1. Keep ALL existing education exactly as it is
            2. Only enhance the language and presentation
            3. Highlight relevant aspects of existing education
            4. Use professional language
            5. Do NOT add fake degrees, certifications, or achievements
            6. Only improve the presentation of existing education
            7. MAINTAIN THE EXACT SAME FORMAT AND STRUCTURE
            8. Keep the same institution names, degrees, and basic information
            9. Only enhance the descriptions, not the structure
            
            Generate an enhanced presentation that maintains the exact same format and structure.
            """
        
        # Call OpenAI for resume generation
        response = resume_analyzer.client.chat.completions.create(
            model="gpt-4",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert resume writer who enhances existing content without adding fake experience or achievements. Always work with what's real and only improve the presentation."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            max_tokens=1500,  # Increased for comprehensive resume generation
            temperature=0.7
        )
        
        optimized_content = response.choices[0].message.content.strip()
        
        return {
            "optimized_content": optimized_content,
            "section_type": request.section_type,
            "job_title": request.job_title,
            "message": "AI-optimized resume content generated successfully"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate optimized resume: {str(e)}") 
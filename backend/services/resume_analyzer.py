import os
import re
from typing import Dict, List, Optional
import openai
from dotenv import load_dotenv

load_dotenv()

class ResumeAnalyzer:
    def __init__(self):
       self.client = openai.OpenAI(
            api_key=os.getenv("OPENAI_API_KEY", "your-openai-api-key")
        )
    
    def analyze_resume(self, resume_text: str) -> Dict:
        """
        Analyze resume text and extract key information using AI
        """
        try:
            # Use OpenAI API for sophisticated analysis
            analysis_prompt = self._create_resume_analysis_prompt(resume_text)
            
            try:
                response = self.client.chat.completions.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {
                            "role": "system",
                            "content": "You are an expert resume analyst and career coach with 15+ years of experience in HR and recruitment. You provide detailed, actionable feedback on resumes. You also provide exact suggestions that needs to be taken in the resume. "
                        },
                        {
                            "role": "user",
                            "content": analysis_prompt
                        }
                    ],
                    temperature=0.3,
                    max_tokens=2000
                )
                
                # Parse AI response
                ai_analysis = self._parse_ai_response(response.choices[0].message.content)
                
                # Combine AI analysis with regex-based extraction for comprehensive results
                analysis = {
                    "skills": ai_analysis.get("skills", self._extract_skills(resume_text)),
                    "experience": ai_analysis.get("experience", self._extract_experience(resume_text)),
                    "education": ai_analysis.get("education", self._extract_education(resume_text)),
                    "contact_info": self._extract_contact_info(resume_text),
                    "summary": ai_analysis.get("summary", self._generate_summary(resume_text)),
                    "strengths": ai_analysis.get("strengths", self._identify_strengths(resume_text)),
                    "areas_for_improvement": ai_analysis.get("areas_for_improvement", self._identify_improvements(resume_text)),
                    "ai_insights": ai_analysis.get("ai_insights", []),
                    "overall_score": ai_analysis.get("overall_score", 0)
                }
                
                return analysis
                
            except Exception as ai_error:
                print(f"AI analysis failed, falling back to regex: {str(ai_error)}")
                # Fallback to regex-based analysis
                return {
                    "skills": self._extract_skills(resume_text),
                    "experience": self._extract_experience(resume_text),
                    "education": self._extract_education(resume_text),
                    "contact_info": self._extract_contact_info(resume_text),
                    "summary": self._generate_summary(resume_text),
                    "strengths": self._identify_strengths(resume_text),
                    "areas_for_improvement": self._identify_improvements(resume_text),
                    "ai_insights": [],
                    "overall_score": 0
                }
            
        except Exception as e:
            print(f"Error analyzing resume: {str(e)}")
            return {
                "error": "Failed to analyze resume",
                "skills": [],
                "experience": [],
                "education": [],
                "contact_info": {},
                "summary": "",
                "strengths": [],
                "areas_for_improvement": []
            }
    
    def _extract_skills(self, text: str) -> List[str]:
        """Extract technical skills from resume text"""
        # Common technical skills to look for
        skill_patterns = [
            r'\b(?:Python|Java|JavaScript|React|Node\.js|Angular|Vue\.js|TypeScript|HTML|CSS|SQL|MongoDB|PostgreSQL|MySQL|AWS|Azure|Docker|Kubernetes|Git|GitHub|Agile|Scrum|JIRA|Jenkins|CI/CD|REST API|GraphQL|Microservices|Machine Learning|AI|Data Science|Tableau|Power BI|Excel|Word|PowerPoint|Photoshop|Illustrator|Figma|Sketch)\b',
            r'\b(?:Programming|Development|Coding|Software|Web|Mobile|Database|Cloud|DevOps|Testing|QA|UI/UX|Design|Analytics|Business Intelligence|Project Management|Leadership|Communication|Problem Solving|Critical Thinking|Teamwork|Collaboration)\b'
        ]
        
        skills = set()
        for pattern in skill_patterns:
            matches = re.findall(pattern, text, re.IGNORECASE)
            skills.update(matches)
        
        return list(skills)
    
    def _extract_experience(self, text: str) -> List[Dict]:
        """Extract work experience from resume text"""
        # This is a simplified extraction - in production, you'd use more sophisticated NLP
        experience_sections = re.findall(
            r'(?:experience|work|employment|job).*?(?=\n\n|\n[A-Z]|$)',
            text,
            re.IGNORECASE | re.DOTALL
        )
        
        experiences = []
        for section in experience_sections:
            # Extract company name (simplified)
            company_match = re.search(r'at\s+([A-Z][A-Za-z\s&]+)', section, re.IGNORECASE)
            company = company_match.group(1).strip() if company_match else "Unknown Company"
            
            # Extract duration (simplified)
            duration_match = re.search(r'(\d{4}\s*[-–]\s*\d{4}|\d{4}\s*[-–]\s*present)', section, re.IGNORECASE)
            duration = duration_match.group(1) if duration_match else "Duration not specified"
            
            experiences.append({
                "company": company,
                "duration": duration,
                "description": section.strip()
            })
        
        return experiences
    
    def _extract_education(self, text: str) -> List[Dict]:
        """Extract education information from resume text"""
        education_sections = re.findall(
            r'(?:education|degree|university|college|school).*?(?=\n\n|\n[A-Z]|$)',
            text,
            re.IGNORECASE | re.DOTALL
        )
        
        education = []
        for section in education_sections:
            # Extract degree (simplified)
            degree_match = re.search(r'(Bachelor|Master|PhD|BSc|MSc|MBA|Associate|Diploma)', section, re.IGNORECASE)
            degree = degree_match.group(1) if degree_match else "Degree not specified"
            
            # Extract institution (simplified)
            institution_match = re.search(r'at\s+([A-Z][A-Za-z\s&]+)', section, re.IGNORECASE)
            institution = institution_match.group(1).strip() if institution_match else "Institution not specified"
            
            education.append({
                "degree": degree,
                "institution": institution,
                "description": section.strip()
            })
        
        return education
    
    def _extract_contact_info(self, text: str) -> Dict:
        """Extract contact information from resume text"""
        contact_info = {}
        
        # Extract email
        email_match = re.search(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', text)
        if email_match:
            contact_info["email"] = email_match.group(0)
        
        # Extract phone number
        phone_match = re.search(r'(\+?1?[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})', text)
        if phone_match:
            contact_info["phone"] = phone_match.group(0)
        
        # Extract LinkedIn
        linkedin_match = re.search(r'linkedin\.com/in/[A-Za-z0-9-]+', text, re.IGNORECASE)
        if linkedin_match:
            contact_info["linkedin"] = linkedin_match.group(0)
        
        return contact_info
    
    def _generate_summary(self, text: str) -> str:
        """Generate a summary of the resume"""
        # In production, you'd use OpenAI API for this
        lines = text.split('\n')
        summary_lines = [line.strip() for line in lines if line.strip() and len(line.strip()) > 20]
        
        if summary_lines:
            return summary_lines[0][:200] + "..." if len(summary_lines[0]) > 200 else summary_lines[0]
        else:
            return "Professional summary not found in resume."
    
    def _identify_strengths(self, text: str) -> List[str]:
        """Identify strengths in the resume"""
        strengths = []
        
        # Look for positive indicators
        positive_indicators = [
            "achieved", "improved", "increased", "decreased", "led", "managed",
            "developed", "created", "implemented", "designed", "optimized",
            "awarded", "recognized", "certified", "expert", "senior", "lead"
        ]
        
        for indicator in positive_indicators:
            if re.search(rf'\b{indicator}\b', text, re.IGNORECASE):
                strengths.append(f"Demonstrates {indicator} experience")
        
        return strengths[:5]  # Limit to top 5 strengths
    
    def _identify_improvements(self, text: str) -> List[str]:
        """Identify areas for improvement in the resume"""
        improvements = []
        
        # Check for common resume issues
        if len(text) < 500:
            improvements.append("Resume appears too short - consider adding more details")
        
        if not re.search(r'\b\d{4}\b', text):
            improvements.append("Consider adding specific dates and durations")
        
        if not re.search(r'\b(?:achieved|improved|increased|decreased)\b', text, re.IGNORECASE):
            improvements.append("Consider adding quantifiable achievements")
        
        if not re.search(r'\b(?:Python|Java|JavaScript|React|SQL)\b', text, re.IGNORECASE):
            improvements.append("Consider highlighting technical skills more prominently")
        
        return improvements
    
    def _create_resume_analysis_prompt(self, resume_text: str) -> str:
        """Create a comprehensive prompt for AI resume analysis"""
        return f"""
Please analyze this resume comprehensively and provide detailed feedback. Return your analysis in the following JSON format:

{{
    "skills": ["skill1", "skill2", "skill3"],
    "experience": [
        {{
            "company": "Company Name",
            "duration": "2020-2023",
            "description": "Detailed role description"
        }}
    ],
    "education": [
        {{
            "degree": "Bachelor of Science",
            "institution": "University Name",
            "description": "Education details"
        }}
    ],
    "summary": "Professional summary in 2-3 sentences",
    "strengths": [
        "Specific strength 1",
        "Specific strength 2",
        "Specific strength 3"
    ],
    "areas_for_improvement": [
        "Specific improvement area 1",
        "Specific improvement area 2"
    ],
    "ai_insights": [
        "Professional insight about the candidate",
        "Career trajectory analysis",
        "Market positioning assessment"
    ],
    "overall_score": 85
}}

RESUME TEXT:
{resume_text}

ANALYSIS REQUIREMENTS:
1. Extract ALL technical and soft skills mentioned
2. Identify work experience with company names and durations
3. Extract education details with degrees and institutions
4. Create a compelling professional summary
5. Identify 3-5 specific strengths with examples
6. Provide 2-3 actionable improvement suggestions
7. Give 2-3 professional insights about the candidate
8. Score the resume from 0-100 based on:
   - Content quality and completeness
   - Achievement quantification
   - Skill relevance
   - Professional presentation
   - ATS optimization

Focus on being specific, actionable, and professional in your analysis.
"""
    
    def _parse_ai_response(self, ai_response: str) -> Dict:
        """Parse the AI response and extract structured data"""
        try:
            # Try to extract JSON from the response
            import json
            
            # Find JSON content in the response
            json_start = ai_response.find('{')
            json_end = ai_response.rfind('}') + 1
            
            if json_start != -1 and json_end > json_start:
                json_str = ai_response[json_start:json_end]
                parsed_data = json.loads(json_str)
                
                # Validate and clean the data
                return {
                    "skills": parsed_data.get("skills", []),
                    "experience": parsed_data.get("experience", []),
                    "education": parsed_data.get("education", []),
                    "summary": parsed_data.get("summary", ""),
                    "strengths": parsed_data.get("strengths", []),
                    "areas_for_improvement": parsed_data.get("areas_for_improvement", []),
                    "ai_insights": parsed_data.get("ai_insights", []),
                    "overall_score": parsed_data.get("overall_score", 0)
                }
            else:
                # If no JSON found, return empty structure
                return {
                    "skills": [],
                    "experience": [],
                    "education": [],
                    "summary": "",
                    "strengths": [],
                    "areas_for_improvement": [],
                    "ai_insights": [],
                    "overall_score": 0
                }
                
        except Exception as e:
            print(f"Error parsing AI response: {str(e)}")
            return {
                "skills": [],
                "experience": [],
                "education": [],
                "summary": "",
                "strengths": [],
                "areas_for_improvement": [],
                "ai_insights": [],
                "overall_score": 0
            } 
import re
import json
from typing import Dict, List, Optional
import openai
import os
from dotenv import load_dotenv

load_dotenv()

class JobMatcher:
    def __init__(self):
        self.client = openai.OpenAI(
            api_key=os.getenv("OPENAI_API_KEY", "your-openai-api-key")
        )
    
    def match_job(self, resume_text: str, job_description: str) -> Dict:
        """
        Match resume skills with job requirements using AI
        """
        try:
            # Use AI for sophisticated job matching
            matching_prompt = self._create_job_matching_prompt(resume_text, job_description)
            
            try:
                response = self.client.chat.completions.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {
                            "role": "system",
                            "content": "You are an expert HR recruiter and career consultant with deep knowledge of job market trends, skill requirements, and candidate evaluation. You provide accurate skill matching and career guidance. You also provide exact suggestions that needs to be taken in the resume."
                        },
                        {
                            "role": "user",
                            "content": matching_prompt
                        }
                    ],
                    temperature=0.2,
                    max_tokens=1500
                )
                
                # Parse AI response
                ai_matching = self._parse_matching_response(response.choices[0].message.content)
                
                # Combine AI analysis with regex-based extraction
                resume_skills = self._extract_skills_from_text(resume_text)
                job_skills = self._extract_skills_from_job_description(job_description)
                
                # Use AI results if available, otherwise fall back to regex
                matching_skills = ai_matching.get("matching_skills", list(set(resume_skills) & set(job_skills)))
                missing_skills = ai_matching.get("missing_skills", list(set(job_skills) - set(resume_skills)))
                extra_skills = ai_matching.get("extra_skills", list(set(resume_skills) - set(job_skills)))
                
                # Calculate match percentage
                match_percentage = ai_matching.get("match_percentage", 
                    (len(matching_skills) / len(job_skills)) * 100 if job_skills else 0)
                
                return {
                    "match_percentage": round(match_percentage, 2),
                    "matching_skills": matching_skills,
                    "missing_skills": missing_skills,
                    "extra_skills": extra_skills,
                    "total_resume_skills": len(resume_skills),
                    "total_job_skills": len(job_skills),
                    "matching_count": len(matching_skills),
                    "ai_analysis": ai_matching.get("ai_analysis", {}),
                    "skill_gaps": ai_matching.get("skill_gaps", []),
                    "transferable_skills": ai_matching.get("transferable_skills", [])
                }
                
            except Exception as ai_error:
                print(f"AI matching failed, falling back to regex: {str(ai_error)}")
                # Fallback to regex-based matching
                resume_skills = self._extract_skills_from_text(resume_text)
                job_skills = self._extract_skills_from_job_description(job_description)
                matching_skills = list(set(resume_skills) & set(job_skills))
                missing_skills = list(set(job_skills) - set(resume_skills))
                extra_skills = list(set(resume_skills) - set(job_skills))
                match_percentage = (len(matching_skills) / len(job_skills)) * 100 if job_skills else 0
                
                return {
                    "match_percentage": round(match_percentage, 2),
                    "matching_skills": matching_skills,
                    "missing_skills": missing_skills,
                    "extra_skills": extra_skills,
                    "total_resume_skills": len(resume_skills),
                    "total_job_skills": len(job_skills),
                    "matching_count": len(matching_skills),
                    "ai_analysis": {},
                    "skill_gaps": [],
                    "transferable_skills": []
                }
            
        except Exception as e:
            print(f"Error matching job: {str(e)}")
            return {
                "match_percentage": 0,
                "matching_skills": [],
                "missing_skills": [],
                "extra_skills": [],
                "total_resume_skills": 0,
                "total_job_skills": 0,
                "matching_count": 0,
                "error": "Failed to match job requirements"
            }
    
    def generate_recommendations(self, resume_text: str, job_description: str) -> List[str]:
        """Generate personalized recommendations based on resume and job description"""
        try:
            # Extract skills from resume and job description
            resume_skills = self._extract_skills_from_text(resume_text)
            job_skills = self._extract_skills_from_job_description(job_description)
            
            # Create AI prompt for recommendations
            prompt = self._create_recommendations_prompt_simple(resume_text, job_description, resume_skills, job_skills)
            
            # Call OpenAI API
            response = self.client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {
                        "role": "system",
                        "content": "You are an expert career coach and resume writer with 15+ years of experience helping professionals land their dream jobs. Provide specific, actionable recommendations."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                max_tokens=600,
                temperature=0.7
            )
            
            ai_response = response.choices[0].message.content.strip()
            recommendations = self._parse_recommendations_response(ai_response)
            
            # If AI recommendations fail, use fallback
            if not recommendations:
                recommendations = self._generate_fallback_recommendations_simple(resume_skills, job_skills)
            
            return recommendations[:5]  # Limit to 5 recommendations
            
        except Exception as e:
            print(f"AI recommendations failed, falling back to basic recommendations: {str(e)}")
            # Extract skills for fallback
            resume_skills = self._extract_skills_from_text(resume_text)
            job_skills = self._extract_skills_from_job_description(job_description)
            return self._generate_fallback_recommendations_simple(resume_skills, job_skills)
            
        except Exception as e:
            print(f"Error generating recommendations: {str(e)}")
            return [
                "Review your resume for any typos or formatting issues",
                "Ensure all contact information is up to date",
                "Consider having someone review your application materials"
            ]
    
    def _extract_skills_from_text(self, text: str) -> List[str]:
        """Extract skills from resume text"""
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
    
    def _extract_skills_from_job_description(self, job_description: str) -> List[str]:
        """Extract required skills from job description"""
        # Look for skills mentioned in the job description
        skill_indicators = [
            r'required.*?skills?.*?[:;]',
            r'qualifications.*?[:;]',
            r'requirements.*?[:;]',
            r'experience.*?with.*?[:;]',
            r'proficient.*?in.*?[:;]',
            r'familiar.*?with.*?[:;]',
            r'expertise.*?in.*?[:;]'
        ]
        
        skills = set()
        
        # Extract skills from the entire job description
        skills.update(self._extract_skills_from_text(job_description))
        
        # Look for skills in specific sections
        for indicator in skill_indicators:
            sections = re.findall(indicator, job_description, re.IGNORECASE | re.DOTALL)
            for section in sections:
                section_skills = self._extract_skills_from_text(section)
                skills.update(section_skills)
        
        return list(skills)
    
    def _calculate_skill_match(self, resume_skills: List[str], job_skills: List[str]) -> float:
        """Calculate the percentage match between resume and job skills"""
        if not job_skills:
            return 0.0
        
        matching_skills = set(resume_skills) & set(job_skills)
        return (len(matching_skills) / len(job_skills)) * 100
    
    def _identify_key_requirements(self, job_description: str) -> List[str]:
        """Identify key requirements from job description"""
        requirements = []
        
        # Look for common requirement patterns
        requirement_patterns = [
            r'(?:minimum|required|must have).*?(?:years?|experience)',
            r'(?:bachelor|master|phd|degree).*?(?:required|preferred)',
            r'(?:certification|certified).*?(?:required|preferred)',
            r'(?:experience|expertise).*?(?:with|in).*?[:;]'
        ]
        
        for pattern in requirement_patterns:
            matches = re.findall(pattern, job_description, re.IGNORECASE)
            requirements.extend(matches)
        
        return requirements[:5]  # Limit to top 5 requirements
    
    def _create_job_matching_prompt(self, resume_text: str, job_description: str) -> str:
        """Create a comprehensive prompt for AI job matching"""
        return f"""
Please analyze the match between this resume and job description. Return your analysis in the following JSON format:

{{
    "match_percentage": 75.5,
    "matching_skills": ["Python", "React", "SQL"],
    "missing_skills": ["Docker", "Kubernetes"],
    "extra_skills": ["MongoDB", "AWS"],
    "ai_analysis": {{
        "overall_fit": "Good fit for the role with some skill gaps",
        "strength_areas": ["Technical skills", "Project management"],
        "concern_areas": ["DevOps experience", "Cloud platforms"],
        "role_alignment": "Candidate's background aligns well with the position"
    }},
    "skill_gaps": [
        {{
            "skill": "Docker",
            "importance": "High",
            "suggestion": "Consider taking Docker certification course"
        }}
    ],
    "transferable_skills": [
        {{
            "skill": "Project Management",
            "relevance": "Highly relevant for team leadership",
            "application": "Can be applied to technical project coordination"
        }}
    ]
}}

RESUME TEXT:
{resume_text}

JOB DESCRIPTION:
{job_description}

ANALYSIS REQUIREMENTS:
1. Calculate accurate match percentage (0-100) based on skill alignment
2. Identify ALL matching skills between resume and job requirements
3. List missing skills that are required for the job
4. Identify extra skills the candidate has beyond job requirements
5. Provide detailed AI analysis of overall fit
6. Identify specific skill gaps with importance levels and suggestions
7. Highlight transferable skills that could be valuable
8. Consider experience level, industry relevance, and career progression

Focus on being precise, actionable, and providing insights that help both the candidate and employer understand the match quality.
"""
    
    def _parse_matching_response(self, ai_response: str) -> Dict:
        """Parse the AI job matching response and extract structured data"""
        try:
            import json
            
            # Find JSON content in the response
            json_start = ai_response.find('{')
            json_end = ai_response.rfind('}') + 1
            
            if json_start != -1 and json_end > json_start:
                json_str = ai_response[json_start:json_end]
                parsed_data = json.loads(json_str)
                
                # Validate and clean the data
                return {
                    "match_percentage": parsed_data.get("match_percentage", 0),
                    "matching_skills": parsed_data.get("matching_skills", []),
                    "missing_skills": parsed_data.get("missing_skills", []),
                    "extra_skills": parsed_data.get("extra_skills", []),
                    "ai_analysis": parsed_data.get("ai_analysis", {}),
                    "skill_gaps": parsed_data.get("skill_gaps", []),
                    "transferable_skills": parsed_data.get("transferable_skills", [])
                }
            else:
                return {
                    "match_percentage": 0,
                    "matching_skills": [],
                    "missing_skills": [],
                    "extra_skills": [],
                    "ai_analysis": {},
                    "skill_gaps": [],
                    "transferable_skills": []
                }
                
        except Exception as e:
            print(f"Error parsing AI matching response: {str(e)}")
            return {
                "match_percentage": 0,
                "matching_skills": [],
                "missing_skills": [],
                "extra_skills": [],
                "ai_analysis": {},
                "skill_gaps": [],
                "transferable_skills": []
            }
    
    def _create_recommendations_prompt(self, resume_analysis: Dict, job_matching: Dict, job_title: str, company: str) -> str:
        """Create a comprehensive prompt for AI recommendations"""
        return f"""
Based on the resume analysis and job matching data, provide 5 specific, actionable recommendations for the candidate. Return as a JSON array of strings:

[
    "Specific recommendation 1",
    "Specific recommendation 2", 
    "Specific recommendation 3",
    "Specific recommendation 4",
    "Specific recommendation 5"
]

RESUME ANALYSIS:
{json.dumps(resume_analysis, indent=2)}

JOB MATCHING DATA:
{json.dumps(job_matching, indent=2)}

JOB DETAILS:
- Title: {job_title}
- Company: {company}

RECOMMENDATION REQUIREMENTS:
1. Be specific and actionable - avoid generic advice
2. Focus on the most impactful improvements first
3. Consider the candidate's current skill level and experience
4. Provide concrete steps they can take
5. Address both immediate and long-term career development
6. Consider the specific job requirements and company context
7. Include both resume improvements and skill development suggestions
8. Make recommendations that are realistic and achievable

Focus on quality over quantity - provide the most valuable 5 recommendations that will have the biggest impact on their application success.
"""
    
    def _parse_recommendations_response(self, ai_response: str) -> List[str]:
        """Parse AI recommendations response"""
        try:
            import json
            
            # Find JSON array in the response
            json_start = ai_response.find('[')
            json_end = ai_response.rfind(']') + 1
            
            if json_start != -1 and json_end > json_start:
                json_str = ai_response[json_start:json_end]
                recommendations = json.loads(json_str)
                
                # Validate that it's a list of strings
                if isinstance(recommendations, list):
                    return [str(rec) for rec in recommendations if rec]
                else:
                    return []
            else:
                return []
                
        except Exception as e:
            print(f"Error parsing AI recommendations: {str(e)}")
            return []
    
    def _generate_fallback_recommendations(self, resume_analysis: Dict, job_matching: Dict, job_title: str, company: str) -> List[str]:
        """Generate fallback recommendations when AI fails"""
        recommendations = []
        
        try:
            # Recommendations based on match percentage
            match_percentage = job_matching.get("match_percentage", 0)
            
            if match_percentage < 30:
                recommendations.append("Your skills don't align well with this position. Consider applying to roles that better match your experience.")
            elif match_percentage < 60:
                recommendations.append("You have some relevant skills, but consider highlighting transferable skills and gaining experience in missing areas.")
            elif match_percentage < 80:
                recommendations.append("Good skill alignment! Focus on showcasing your most relevant experiences and achievements.")
            else:
                recommendations.append("Excellent skill match! Your background aligns well with this position.")
            
            # Recommendations based on missing skills
            missing_skills = job_matching.get("missing_skills", [])
            if missing_skills:
                recommendations.append(f"Consider gaining experience in: {', '.join(missing_skills[:3])}")
            
            # Recommendations based on resume analysis
            if resume_analysis.get("areas_for_improvement"):
                for improvement in resume_analysis["areas_for_improvement"][:2]:
                    recommendations.append(improvement)
            
            # General recommendations
            recommendations.extend([
                f"Tailor your resume to highlight experiences relevant to {job_title} at {company}",
                "Include quantifiable achievements that demonstrate your impact",
                "Ensure your resume is ATS-friendly with clear formatting and keywords"
            ])
            
            return recommendations[:5]  # Limit to 5 recommendations
            
        except Exception as e:
            print(f"Error generating fallback recommendations: {str(e)}")
            return [
                "Review your resume for any typos or formatting issues",
                "Ensure all contact information is up to date",
                "Consider having someone review your application materials"
            ] 

    def _create_recommendations_prompt_simple(self, resume_text: str, job_description: str, resume_skills: List[str], job_skills: List[str]) -> str:
        """Create a simplified prompt for recommendations"""
        return f"""
        As an expert career coach and resume writer, provide 5 specific, actionable recommendations for improving a resume to better match this job description.

        RESUME TEXT:
        {resume_text[:1000]}...

        JOB DESCRIPTION:
        {job_description[:1000]}...

        RESUME SKILLS:
        {', '.join(resume_skills)}

        JOB SKILLS:
        {', '.join(job_skills)}

        REQUIREMENTS:
        1. Be specific and actionable - avoid generic advice
        2. Focus on the most impactful improvements first
        3. Consider the candidate's current skill level
        4. Provide concrete steps they can take
        5. Address both immediate and long-term career development
        6. Consider the specific job requirements
        7. Include both resume improvements and skill development suggestions
        8. Make recommendations that are realistic and achievable

        Format your response as a JSON array of 5 recommendation strings:
        [
            "Specific recommendation 1",
            "Specific recommendation 2",
            "Specific recommendation 3",
            "Specific recommendation 4",
            "Specific recommendation 5"
        ]
        """

    def _generate_fallback_recommendations_simple(self, resume_skills: List[str], job_skills: List[str]) -> List[str]:
        """Generate fallback recommendations when AI fails"""
        recommendations = []
        
        try:
            # Calculate basic match percentage
            matching_skills = set(resume_skills) & set(job_skills)
            missing_skills = set(job_skills) - set(resume_skills)
            
            match_percentage = len(matching_skills) / len(job_skills) * 100 if job_skills else 0
            
            # Recommendations based on match percentage
            if match_percentage < 30:
                recommendations.append("Your skills don't align well with this position. Consider applying to roles that better match your experience.")
            elif match_percentage < 60:
                recommendations.append("You have some relevant skills, but consider highlighting transferable skills and gaining experience in missing areas.")
            elif match_percentage < 80:
                recommendations.append("Good skill alignment! Focus on showcasing your most relevant experiences and achievements.")
            else:
                recommendations.append("Excellent skill match! Your background aligns well with this position.")
            
            # Recommendations based on missing skills
            if missing_skills:
                recommendations.append(f"Consider gaining experience in: {', '.join(list(missing_skills)[:3])}")
            
            # General recommendations
            recommendations.extend([
                "Tailor your resume to highlight experiences relevant to the job requirements",
                "Include quantifiable achievements that demonstrate your impact",
                "Ensure your resume is ATS-friendly with clear formatting and keywords"
            ])
            
            return recommendations[:5]  # Limit to 5 recommendations
            
        except Exception as e:
            print(f"Error generating fallback recommendations: {str(e)}")
            return [
                "Review your resume for any typos or formatting issues",
                "Ensure all contact information is up to date",
                "Consider having someone review your application materials",
                "Focus on quantifiable achievements in your experience section",
                "Make sure your resume is tailored to the specific job requirements"
            ] 
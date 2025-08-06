#!/usr/bin/env python3
"""
Test script for enhanced AI prompts in JobWiz AI Backend
"""

import asyncio
import json
from pathlib import Path
import sys

# Add the current directory to Python path
sys.path.insert(0, str(Path(__file__).parent))

from services.resume_analyzer import ResumeAnalyzer
from services.job_matcher import JobMatcher

async def test_resume_analysis():
    """Test the enhanced resume analysis with AI prompts"""
    print("🧪 Testing Enhanced Resume Analysis")
    print("=" * 50)
    
    # Sample resume text
    sample_resume = """
John Doe
Software Engineer
john.doe@email.com
(555) 123-4567
linkedin.com/in/johndoe

SUMMARY
Experienced software engineer with 5+ years in full-stack development, specializing in Python, React, and cloud technologies. Led development teams and delivered scalable solutions that improved system performance by 40%.

EXPERIENCE
Senior Software Engineer at TechCorp (2020-2023)
- Developed and maintained web applications using Python, React, and Node.js
- Led team of 5 developers in agile environment
- Improved system performance by 40% through optimization
- Implemented CI/CD pipelines using Docker and AWS
- Mentored junior developers and conducted code reviews

Software Developer at StartupXYZ (2018-2020)
- Built RESTful APIs using Python Flask and Django
- Worked with PostgreSQL and MongoDB databases
- Collaborated with cross-functional teams using Git and JIRA
- Deployed applications to AWS cloud infrastructure

EDUCATION
Bachelor of Science in Computer Science
University of Technology (2014-2018)
- GPA: 3.8/4.0
- Relevant coursework: Data Structures, Algorithms, Database Systems

SKILLS
Programming: Python, JavaScript, TypeScript, Java, SQL
Frameworks: React, Node.js, Django, Flask, Express
Databases: PostgreSQL, MongoDB, MySQL
Cloud: AWS, Docker, Kubernetes, CI/CD
Tools: Git, JIRA, Jenkins, VS Code
Soft Skills: Leadership, Team Management, Problem Solving, Communication
"""
    
    try:
        analyzer = ResumeAnalyzer()
        result = await analyzer.analyze_resume(sample_resume)
        
        print("✅ Resume Analysis Results:")
        print(f"Overall Score: {result.get('overall_score', 0)}/100")
        print(f"Skills Found: {len(result.get('skills', []))}")
        print(f"Experience Entries: {len(result.get('experience', []))}")
        print(f"Education Entries: {len(result.get('education', []))}")
        print(f"Strengths: {len(result.get('strengths', []))}")
        print(f"Areas for Improvement: {len(result.get('areas_for_improvement', []))}")
        print(f"AI Insights: {len(result.get('ai_insights', []))}")
        
        if result.get('ai_insights'):
            print("\n🤖 AI Insights:")
            for insight in result['ai_insights'][:3]:
                print(f"  • {insight}")
        
        return True
        
    except Exception as e:
        print(f"❌ Resume analysis failed: {str(e)}")
        return False

async def test_job_matching():
    """Test the enhanced job matching with AI prompts"""
    print("\n🧪 Testing Enhanced Job Matching")
    print("=" * 50)
    
    # Sample resume and job description
    sample_resume = """
Experienced software engineer with 5+ years in Python, React, and cloud technologies. 
Led development teams and delivered scalable solutions.
Skills: Python, JavaScript, React, Node.js, AWS, Docker, PostgreSQL, Git
Experience: Senior Software Engineer at TechCorp (2020-2023)
"""
    
    sample_job_description = """
Senior Software Engineer Position

We are looking for a Senior Software Engineer with experience in:
- Python development and web frameworks
- React and JavaScript frontend development
- Cloud platforms (AWS, Azure, or GCP)
- Database management (SQL and NoSQL)
- DevOps practices and CI/CD pipelines
- Team leadership and mentoring

Requirements:
- 5+ years of software development experience
- Bachelor's degree in Computer Science or related field
- Experience with agile development methodologies
- Strong problem-solving and communication skills
- Experience with Docker and containerization
- Knowledge of microservices architecture

Nice to have:
- Experience with Kubernetes
- Machine learning or data science background
- Open source contributions
"""
    
    try:
        matcher = JobMatcher()
        result = await matcher.match_job(sample_resume, sample_job_description)
        
        print("✅ Job Matching Results:")
        print(f"Match Percentage: {result.get('match_percentage', 0)}%")
        print(f"Matching Skills: {len(result.get('matching_skills', []))}")
        print(f"Missing Skills: {len(result.get('missing_skills', []))}")
        print(f"Extra Skills: {len(result.get('extra_skills', []))}")
        
        if result.get('ai_analysis'):
            print("\n🤖 AI Analysis:")
            ai_analysis = result['ai_analysis']
            print(f"  Overall Fit: {ai_analysis.get('overall_fit', 'N/A')}")
            print(f"  Strength Areas: {', '.join(ai_analysis.get('strength_areas', []))}")
            print(f"  Concern Areas: {', '.join(ai_analysis.get('concern_areas', []))}")
        
        if result.get('skill_gaps'):
            print("\n🔍 Skill Gaps:")
            for gap in result['skill_gaps'][:3]:
                print(f"  • {gap.get('skill', 'N/A')} ({gap.get('importance', 'N/A')}): {gap.get('suggestion', 'N/A')}")
        
        return True
        
    except Exception as e:
        print(f"❌ Job matching failed: {str(e)}")
        return False

async def test_recommendations():
    """Test the enhanced recommendations generation"""
    print("\n🧪 Testing Enhanced Recommendations")
    print("=" * 50)
    
    # Sample analysis data
    resume_analysis = {
        "skills": ["Python", "React", "AWS", "Docker"],
        "overall_score": 75,
        "strengths": ["Strong technical background", "Leadership experience"],
        "areas_for_improvement": ["Add more quantifiable achievements", "Include specific metrics"]
    }
    
    job_matching = {
        "match_percentage": 70,
        "matching_skills": ["Python", "React"],
        "missing_skills": ["Kubernetes", "Machine Learning"],
        "extra_skills": ["AWS", "Docker"]
    }
    
    try:
        matcher = JobMatcher()
        recommendations = await matcher.generate_recommendations(
            resume_analysis, job_matching, "Senior Software Engineer", "TechCorp"
        )
        
        print("✅ Recommendations Generated:")
        for i, rec in enumerate(recommendations, 1):
            print(f"  {i}. {rec}")
        
        return True
        
    except Exception as e:
        print(f"❌ Recommendations generation failed: {str(e)}")
        return False

async def main():
    """Run all AI prompt tests"""
    print("🚀 Testing Enhanced AI Prompts for JobWiz AI")
    print("=" * 60)
    
    tests = [
        ("Resume Analysis", test_resume_analysis),
        ("Job Matching", test_job_matching),
        ("Recommendations", test_recommendations),
    ]
    
    passed = 0
    total = len(tests)
    
    for test_name, test_func in tests:
        print(f"\n🔍 Running: {test_name}")
        if await test_func():
            passed += 1
        print("-" * 30)
    
    print(f"\n📊 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All AI prompt tests passed! Enhanced AI features are working correctly.")
    else:
        print("⚠️  Some AI prompt tests failed. Check OpenAI API key and configuration.")

if __name__ == "__main__":
    asyncio.run(main()) 
#!/usr/bin/env python3
"""
Simple test script for JobWiz AI Backend API
"""

import requests
import json
from pathlib import Path

BASE_URL = "http://localhost:8000"

def test_health_check():
    """Test the health check endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/health")
        print(f"Health Check: {response.status_code}")
        if response.status_code == 200:
            print("✅ Health check passed")
            return True
        else:
            print("❌ Health check failed")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to server. Make sure the backend is running.")
        return False

def test_root_endpoint():
    """Test the root endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/")
        print(f"Root Endpoint: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Root endpoint: {data}")
            return True
        else:
            print("❌ Root endpoint failed")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to server.")
        return False

def test_upload_endpoint():
    """Test the upload endpoint with a sample file"""
    try:
        # Create a sample text file for testing
        test_file_path = Path("test_resume.txt")
        with open(test_file_path, "w") as f:
            f.write("""
John Doe
Software Engineer
john.doe@email.com
(555) 123-4567

SUMMARY
Experienced software engineer with 5+ years in Python, React, and SQL development.

EXPERIENCE
Senior Developer at Tech Corp (2020-2023)
- Developed web applications using Python and React
- Led team of 5 developers
- Improved system performance by 40%

EDUCATION
Bachelor of Science in Computer Science
University of Technology (2015-2019)

SKILLS
Python, JavaScript, React, SQL, Git, AWS, Docker
            """)
        
        # Prepare form data
        files = {"resume": open(test_file_path, "rb")}
        data = {
            "job_title": "Senior Software Engineer",
            "company": "Tech Company Inc.",
            "job_description": """
We are looking for a Senior Software Engineer with experience in:
- Python development
- React and JavaScript
- SQL and database management
- Git and version control
- AWS cloud services
- Docker containerization

Requirements:
- 5+ years of experience
- Bachelor's degree in Computer Science
- Strong problem-solving skills
- Team collaboration experience
            """
        }
        
        response = requests.post(f"{BASE_URL}/api/upload", files=files, data=data)
        print(f"Upload Test: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Upload test passed")
            print(f"Analysis ID: {result.get('analysis_id')}")
            print(f"Match Percentage: {result.get('job_matching', {}).get('match_percentage', 0)}%")
            return True
        else:
            print(f"❌ Upload test failed: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Upload test error: {str(e)}")
        return False
    finally:
        # Clean up test file
        try:
            if test_file_path.exists():
                test_file_path.unlink()
        except PermissionError:
            # File might be locked on Windows, ignore cleanup error
            pass

def main():
    """Run all tests"""
    print("🧪 Testing JobWiz AI Backend API")
    print("=" * 40)
    
    tests = [
        ("Health Check", test_health_check),
        ("Root Endpoint", test_root_endpoint),
        ("Upload Endpoint", test_upload_endpoint),
    ]
    
    passed = 0
    total = len(tests)
    
    for test_name, test_func in tests:
        print(f"\n🔍 Testing: {test_name}")
        if test_func():
            passed += 1
        print("-" * 20)
    
    print(f"\n📊 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! Backend is working correctly.")
    else:
        print("⚠️  Some tests failed. Check the backend configuration.")

if __name__ == "__main__":
    main() 
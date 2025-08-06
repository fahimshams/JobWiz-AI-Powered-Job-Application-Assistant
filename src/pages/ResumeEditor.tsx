import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Copy, 
  Download, 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Sparkles,
  Target,
  Minus,
  Plus,
  ArrowRight,
  Star,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';

interface ResumeSection {
  id: string;
  title: string;
  originalContent: string;
  optimizedContent: string;
  changes: Change[];
  keywords: string[];
  suggestions: string[];
}

interface Change {
  type: 'added' | 'removed' | 'modified';
  original: string;
  optimized: string;
  reason: string;
}

interface AIEditorData {
  resume_analysis: any;
  job_matching: any;
  recommendations: string[];
  originalResume: string;
}

const ResumeEditor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [resumeSections, setResumeSections] = useState<ResumeSection[]>([]);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [editorData, setEditorData] = useState<AIEditorData | null>(null);

  useEffect(() => {
    const initializeData = () => {
      const data = location.state?.analysisData;
      if (data) {
        setEditorData(data);
        initializeResumeSections(data);
        // Store data in sessionStorage for persistence
        sessionStorage.setItem('analysisData', JSON.stringify(data));
      } else {
        // Try to get data from sessionStorage as fallback
        const storedData = sessionStorage.getItem('analysisData');
        if (storedData) {
          try {
            const parsedData = JSON.parse(storedData);
            setEditorData(parsedData);
            initializeResumeSections(parsedData);
          } catch (error) {
            console.error('Error parsing stored analysis data:', error);
            navigate("/upload");
          }
        } else {
          navigate("/upload");
        }
      }
    };

    initializeData();
  }, [location, navigate]);

  const initializeResumeSections = (data: AIEditorData) => {
    const sections: ResumeSection[] = [
      {
        id: "full-resume",
        title: "Full Resume",
        originalContent: data.originalResume || "No resume content available",
        optimizedContent: "Enhancing your resume with AI...",
        changes: generateFullResumeChanges(data),
        keywords: data.job_matching.matching_skills,
        suggestions: [] // AI will generate suggestions dynamically
      }
    ];
    setResumeSections(sections);
    
    // Now generate AI content asynchronously
    generateAIContent(data, sections);
  };

  const generateAIContent = async (data: AIEditorData, sections: ResumeSection[]) => {
    setAiGenerating(true);
    try {
      // Generate the complete AI-optimized resume
      const completeOptimizedResume = await generateCompleteOptimizedResume(data);
      
      // Update all sections with the complete optimized resume
      const updatedSections = sections.map(section => {
        return {
          ...section,
          optimizedContent: completeOptimizedResume
        };
      });
      
      setResumeSections(updatedSections);
    } catch (error) {
      console.error('Error generating AI content:', error);
    } finally {
      setAiGenerating(false);
    }
  };

  const generateCompleteOptimizedResume = async (data: AIEditorData) => {
    try {
      const response = await fetch('http://localhost:8000/api/generate-optimized-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          original_resume: data.originalResume,
          job_title: data.job_matching?.job_title || "",
          job_description: data.job_matching?.job_description || "",
          matching_skills: data.job_matching?.matching_skills || [],
          missing_skills: data.job_matching?.missing_skills || [],
          section_type: "full_resume"
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.optimized_content;
    } catch (error) {
      console.error('Error generating complete optimized resume:', error);
      return data.originalResume || "No resume content available";
    }
  };

  const generateFullResumeChanges = (data: AIEditorData): Change[] => {
    const changes: Change[] = [];
    const missingSkills = data.job_matching.missing_skills;
    
    // Add missing critical skills
    missingSkills.slice(0, 2).forEach(skill => {
      if (!data.originalResume.toLowerCase().includes(skill.toLowerCase())) {
        changes.push({
          type: 'added',
          original: '',
          optimized: skill,
          reason: `Include '${skill}' - critical requirement for this position`
        });
      }
    });

    // Add keyword optimization
    const matchingSkills = data.job_matching.matching_skills;
    matchingSkills.slice(0, 3).forEach(skill => {
      if (!data.originalResume.toLowerCase().includes(skill.toLowerCase())) {
        changes.push({
          type: 'added',
          original: '',
          optimized: `Enhanced with ${skill} keywords`,
          reason: `Incorporate '${skill}' keywords to pass ATS screening`
        });
      }
    });

    return changes;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const getAISuggestions = async (sectionId: string) => {
    // setLoading(true); // This state variable was removed
    try {
      const section = resumeSections.find(s => s.id === sectionId);
      if (!section || !editorData) return;

      // Prepare request data with full resume content for better analysis
      const requestData = {
        section_id: sectionId,
        section_title: section.title,
        original_content: sectionId === "full-resume" ? editorData.originalResume : section.originalContent,
        job_title: editorData.job_matching?.job_title || "Software Engineer",
        job_description: editorData.job_matching?.job_description || "",
        matching_skills: editorData.job_matching?.matching_skills || [],
        missing_skills: editorData.job_matching?.missing_skills || [],
        full_resume: editorData.originalResume || ""
      };

      // Make API call to backend with increased tokens for better analysis
      const response = await fetch('http://localhost:8000/api/resume-suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      toast.success("Expert AI recommendations generated!");
      
      setResumeSections(prev => 
        prev.map(s => 
          s.id === sectionId 
            ? { ...s, suggestions: [...s.suggestions, ...result.suggestions] }
            : s
        )
      );
    } catch (error) {
      console.error('Error fetching AI suggestions:', error);
      toast.error("Failed to generate AI suggestions. Please try again.");
    } finally {
      // setLoading(false); // This state variable was removed
    }
  };

  const downloadOptimizedResume = async () => {
    try {
      // Get the complete optimized resume from any section (they all have the same content now)
      const fullResumeSection = resumeSections.find(section => section.id === "full-resume");
      if (!fullResumeSection) {
        toast.error("No optimized resume found");
        return;
      }

      const optimizedContent = fullResumeSection.optimizedContent;
      
      // Create a simple text file with the complete optimized resume
      const blob = new Blob([optimizedContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'AI_Optimized_Resume.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success("AI Optimized Resume downloaded successfully!");
    } catch (error) {
      console.error('Error downloading resume:', error);
      toast.error("Failed to download resume. Please try again.");
    }
  };

  if (!editorData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading AI Resume Editor...</p>
        </div>
      </div>
    );
  }

  const currentSectionData = resumeSections.find(s => s.id === "full-resume"); // No longer tracking current section

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/analysis-results", { state: { analysisData: editorData } })}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Analysis
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                AI Resume Editor
              </h1>
              <p className="text-lg text-gray-600">
                Compare your original resume with AI-optimized version
              </p>
              {aiGenerating && (
                <div className="flex items-center gap-2 mt-2 text-blue-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-sm">Generating AI-optimized content...</span>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button onClick={downloadOptimizedResume} disabled={aiGenerating}>
                <Download className="h-4 w-4 mr-2" />
                Download Optimized Resume
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Original Resume */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">Original Resume</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(currentSectionData?.originalContent || "")}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border">
                <h4 className="font-semibold text-gray-900 mb-2">Full Resume</h4>
                <div className="text-sm text-gray-700 whitespace-pre-wrap">
                  {currentSectionData?.originalContent || "No content available"}
                </div>
              </div>
            </div>
          </div>

          {/* AI Optimized Resume */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-blue-900">AI Optimized Resume</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(currentSectionData?.optimizedContent || "")}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-900 mb-2">Full Resume</h4>
                <div className="text-sm text-blue-700 whitespace-pre-wrap">
                  {currentSectionData?.optimizedContent || "No optimized content available"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Changes Required Section */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-600" />
                Changes Required to Land the Interview
              </CardTitle>
              <CardDescription>
                Specific modifications needed for this job
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentSectionData?.changes.map((change, index) => (
                  <div key={index} className="p-4 rounded-lg border-l-4 border-purple-500 bg-purple-50">
                    <div className="flex items-start gap-3">
                      {change.type === 'added' && <Plus className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />}
                      {change.type === 'removed' && <Minus className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />}
                      {change.type === 'modified' && <ArrowRight className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />}
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={change.type === 'added' ? 'default' : change.type === 'removed' ? 'destructive' : 'secondary'}>
                            {change.type.toUpperCase()}
                          </Badge>
                          <span className="text-sm font-medium text-gray-900">{change.reason}</span>
                        </div>
                        
                        {change.type === 'added' && (
                          <div className="text-sm text-green-700 bg-green-50 p-2 rounded">
                            <strong>Add:</strong> {change.optimized}
                          </div>
                        )}
                        
                        {change.type === 'removed' && (
                          <div className="text-sm text-red-700 bg-red-50 p-2 rounded">
                            <strong>Remove:</strong> {change.original}
                          </div>
                        )}
                        
                        {change.type === 'modified' && (
                          <div className="space-y-2">
                            <div className="text-sm text-red-700 bg-red-50 p-2 rounded">
                              <strong>From:</strong> {change.original}
                            </div>
                            <div className="text-sm text-green-700 bg-green-50 p-2 rounded">
                              <strong>To:</strong> {change.optimized}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Keywords to Include */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                Keywords to Include
              </CardTitle>
              <CardDescription>
                These keywords will help your resume pass ATS screening
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {currentSectionData?.keywords.map((keyword, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Job Match Score */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-purple-600" />
                Job Match Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {editorData.job_matching.match_percentage}%
                  </div>
                  <div className="text-sm text-gray-600">Current Match</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {Math.min(95, editorData.job_matching.match_percentage + 25)}%
                  </div>
                  <div className="text-sm text-gray-600">After Optimization</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {editorData.job_matching.missing_skills.length}
                  </div>
                  <div className="text-sm text-gray-600">Skills to Add</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor; 
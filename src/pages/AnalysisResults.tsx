import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Briefcase, 
  Target, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Star,
  ArrowLeft,
  Download,
  Share2,
  Edit3,
  Lightbulb,
  Award,
  Users,
  BookOpen,
  Zap,
  ListTodo,
  BarChart3,
  MessageSquare,
  GraduationCap,
  Sparkles,
  Calendar,
  DollarSign
} from "lucide-react";
import { cn } from "@/lib/utils";
import AnalysisSummary from "@/components/AnalysisSummary";

interface AnalysisData {
  originalResume: string;
  success: boolean;
  message: string;
  analysis_id: string;
  resume_analysis: {
    skills: string[];
    experience: Array<{
      company: string;
      duration: string;
      description: string;
    }>;
    education: Array<{
      degree: string;
      institution: string;
      description: string;
    }>;
    contact_info: {
      email?: string;
      phone?: string;
      linkedin?: string;
    };
    summary: string;
    strengths: string[];
    areas_for_improvement: string[];
    ai_insights: string[];
    overall_score: number;
  };
  job_matching: {
    match_percentage: number;
    matching_skills: string[];
    missing_skills: string[];
    extra_skills: string[];
    total_resume_skills: number;
    total_job_skills: number;
    matching_count: number;
    ai_analysis: {
      overall_fit: string;
      strength_areas: string[];
      concern_areas: string[];
      role_alignment: string;
    };
    skill_gaps: Array<{
      skill: string;
      importance: string;
      suggestion: string;
    }>;
    transferable_skills: Array<{
      skill: string;
      relevance: string;
      application: string;
    }>;
  };
  recommendations: string[];
}

const AnalysisResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [interviewPrep, setInterviewPrep] = useState<any>(null);
  const [careerAdvice, setCareerAdvice] = useState<any>(null);
  const [optimizationTips, setOptimizationTips] = useState<any>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  useEffect(() => {
    const data = location.state?.analysisData;
    if (data) {
      setAnalysisData(data);
    } else {
      // If no data in state, try to get from sessionStorage as fallback
      const storedData = sessionStorage.getItem('analysisData');
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          setAnalysisData(parsedData);
        } catch (error) {
          console.error('Error parsing stored analysis data:', error);
          navigate("/upload");
        }
      } else {
        navigate("/upload");
      }
    }
    setLoading(false);
  }, [location, navigate]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getInterviewPreparation = async () => {
    if (!analysisData) return;
    
    setIsLoadingAI(true);
    try {
      const response = await fetch('http://localhost:8000/api/interview-preparation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          job_title: "Software Engineer", // You might want to store this in analysisData
          company: "Tech Company", // You might want to store this in analysisData
          resume_analysis: analysisData.resume_analysis,
          job_matching: analysisData.job_matching
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setInterviewPrep(result);
    } catch (error) {
      console.error('Error getting interview preparation:', error);
    } finally {
      setIsLoadingAI(false);
    }
  };

  const getCareerAdvice = async () => {
    if (!analysisData) return;
    
    setIsLoadingAI(true);
    try {
      const response = await fetch('http://localhost:8000/api/career-advice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          job_title: "Software Engineer", // You might want to store this in analysisData
          company: "Tech Company", // You might want to store this in analysisData
          job_description: "Software engineering role with focus on..." // You might want to store this in analysisData
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setCareerAdvice(result);
    } catch (error) {
      console.error('Error getting career advice:', error);
    } finally {
      setIsLoadingAI(false);
    }
  };

  const getOptimizationTips = async () => {
    if (!analysisData) return;
    
    setIsLoadingAI(true);
    try {
      const response = await fetch('http://localhost:8000/api/resume-optimization-tips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resume_text: analysisData.originalResume || "",
          job_title: "Software Engineer", // You might want to store this in analysisData
          job_description: "Software engineering role with focus on...", // You might want to store this in analysisData
          target_role: "Software Engineer"
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setOptimizationTips(result);
    } catch (error) {
      console.error('Error getting optimization tips:', error);
    } finally {
      setIsLoadingAI(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analysis results...</p>
        </div>
      </div>
    );
  }

  if (!analysisData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Analysis Data Found</h2>
          <p className="text-gray-600 mb-4">Please upload your resume and job details first.</p>
          <Button onClick={() => navigate("/upload")}>
            Go to Upload
          </Button>
        </div>
      </div>
    );
  }

  const { resume_analysis, job_matching, recommendations } = analysisData;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/upload")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Upload
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                AI Analysis Results
              </h1>
              <p className="text-lg text-gray-600">
                Expert insights and recommendations for your resume
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Analysis Summary */}
        <AnalysisSummary
          resumeScore={resume_analysis.overall_score}
          matchPercentage={job_matching.match_percentage}
          matchingSkills={job_matching.matching_skills}
          missingSkills={job_matching.missing_skills}
          strengths={resume_analysis.strengths}
          improvements={resume_analysis.areas_for_improvement}
          recommendations={recommendations}
        />

        {/* Main Content with Tabs */}
        <Tabs defaultValue="actions" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="actions" className="flex items-center gap-2">
              <ListTodo className="h-4 w-4" />
              Actions to be Taken
            </TabsTrigger>
            <TabsTrigger value="summary" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Summary
            </TabsTrigger>
          </TabsList>

          <TabsContent value="actions" className="space-y-6 mt-6">
            {/* Critical Skills to Add */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-red-600" />
                  Critical Skills to Add
                </CardTitle>
                <CardDescription>
                  These skills are required for the job - add them to your resume
                </CardDescription>
              </CardHeader>
              <CardContent>
                {job_matching.missing_skills.length > 0 ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                      <h4 className="font-semibold text-red-900 mb-3">Missing Required Skills:</h4>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {job_matching.missing_skills.map((skill, index) => (
                          <Badge key={index} variant="destructive" className="text-sm">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-red-700">
                        <strong>Action:</strong> Add these skills to your resume's skills section immediately.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-900 mb-2">✅ All Required Skills Present</h4>
                    <p className="text-sm text-green-700">Your resume already includes all the skills required for this position.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Key Experience Updates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                  Key Experience Updates
                </CardTitle>
                <CardDescription>
                  Update your experience descriptions with these keywords
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-900 mb-3">Keywords to Add to Experience:</h4>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {job_matching.matching_skills.slice(0, 6).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-blue-700">
                      <strong>Action:</strong> Rewrite your experience bullets to include these keywords and specific achievements.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-900 mb-2">Achievement Templates:</h4>
                    <div className="space-y-2 text-sm text-green-700">
                      <p>• "Increased [metric] by X%"</p>
                      <p>• "Led team of X people"</p>
                      <p>• "Reduced [cost/time] by X%"</p>
                      <p>• "Improved [performance] by X%"</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Summary Optimization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-purple-600" />
                  Summary Optimization
                </CardTitle>
                <CardDescription>
                  Create a targeted professional summary
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-purple-900 mb-3">Use This Template:</h4>
                  <div className="text-sm text-purple-700 bg-white p-3 rounded border">
                    <p className="italic">
                      "Experienced {job_matching.matching_skills[0] || 'professional'} with expertise in {job_matching.matching_skills.slice(0, 2).join(' and ')}. 
                      Skilled in {job_matching.matching_skills.slice(0, 3).join(', ')} with proven track record of delivering results."
                    </p>
                  </div>
                  <p className="text-sm text-purple-700 mt-3">
                    <strong>Action:</strong> Replace your current summary with this targeted version.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* AI Resume Editor */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit3 className="h-5 w-5 text-indigo-600" />
                  AI Resume Editor
                </CardTitle>
                <CardDescription>
                  Get AI-powered help to edit your resume
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full" 
                  variant="default"
                  onClick={() => navigate("/resume-editor", { state: { analysisData } })}
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Open AI Resume Editor
                </Button>
              </CardContent>
            </Card>

            {/* AI-Powered Additional Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Interview Preparation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-green-600" />
                    Interview Preparation
                  </CardTitle>
                  <CardDescription>
                    Get AI-powered interview guidance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {interviewPrep ? (
                    <div className="prose prose-sm max-w-none">
                      <div className="whitespace-pre-wrap text-sm text-gray-700">
                        {interviewPrep.interview_preparation}
                      </div>
                    </div>
                  ) : (
                    <Button 
                      onClick={getInterviewPreparation}
                      disabled={isLoadingAI}
                      className="w-full"
                    >
                      {isLoadingAI ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Calendar className="h-4 w-4 mr-2" />
                          Get Interview Prep
                        </>
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Career Advice */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                    Career Advice
                  </CardTitle>
                  <CardDescription>
                    Personalized career guidance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {careerAdvice ? (
                    <div className="prose prose-sm max-w-none">
                      <div className="whitespace-pre-wrap text-sm text-gray-700">
                        {careerAdvice.career_advice}
                      </div>
                    </div>
                  ) : (
                    <Button 
                      onClick={getCareerAdvice}
                      disabled={isLoadingAI}
                      className="w-full"
                      variant="outline"
                    >
                      {isLoadingAI ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Lightbulb className="h-4 w-4 mr-2" />
                          Get Career Advice
                        </>
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Resume Optimization Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  Resume Optimization Tips
                </CardTitle>
                <CardDescription>
                  Expert tips to improve your resume
                </CardDescription>
              </CardHeader>
              <CardContent>
                {optimizationTips ? (
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap text-sm text-gray-700">
                      {optimizationTips.optimization_tips}
                    </div>
                  </div>
                ) : (
                  <Button 
                    onClick={getOptimizationTips}
                    disabled={isLoadingAI}
                    className="w-full"
                    variant="outline"
                  >
                    {isLoadingAI ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600 mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <DollarSign className="h-4 w-4 mr-2" />
                        Get Optimization Tips
                      </>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="summary" className="space-y-6 mt-6">
            {/* Match Score & Key Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Match Score & Key Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{job_matching.match_percentage}%</div>
                    <div className="text-sm text-gray-600">Match Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">{job_matching.matching_count}</div>
                    <div className="text-sm text-gray-600">Matching Skills</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600 mb-2">{job_matching.missing_skills.length}</div>
                    <div className="text-sm text-gray-600">Missing Skills</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Critical Skills Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-600" />
                  Critical Skills Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-3">✅ Matching Skills ({job_matching.matching_skills.length})</h4>
                    <div className="flex flex-wrap gap-2">
                      {job_matching.matching_skills.slice(0, 8).map((skill, index) => (
                        <Badge key={index} variant="default" className="bg-green-100 text-green-800">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-red-600 mb-3">❌ Missing Skills ({job_matching.missing_skills.length})</h4>
                    <div className="flex flex-wrap gap-2">
                      {job_matching.missing_skills.slice(0, 8).map((skill, index) => (
                        <Badge key={index} variant="destructive">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600" />
                  Key Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-900 mb-2">Overall Fit</h4>
                    <p className="text-sm text-blue-700">{job_matching.ai_analysis.overall_fit}</p>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-900 mb-2">Top Strengths</h4>
                    <div className="space-y-1">
                      {job_matching.ai_analysis.strength_areas.slice(0, 3).map((strength, index) => (
                        <p key={index} className="text-sm text-green-700">• {strength}</p>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                    <h4 className="font-semibold text-orange-900 mb-2">Areas to Address</h4>
                    <div className="space-y-1">
                      {job_matching.ai_analysis.concern_areas.slice(0, 2).map((concern, index) => (
                        <p key={index} className="text-sm text-orange-700">• {concern}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  Top Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recommendations.slice(0, 3).map((recommendation, index) => (
                    <div key={index} className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                      <p className="text-sm text-purple-900">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AnalysisResults; 
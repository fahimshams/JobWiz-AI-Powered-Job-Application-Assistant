import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload as UploadIcon, FileText, Briefcase, CheckCircle, AlertCircle, Lightbulb, Sparkles, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const uploadSchema = z.object({
  resume: z.any().optional(),
  jobDescription: z.string().min(50, "Job description must be at least 50 characters"),
  jobTitle: z.string().min(2, "Job title must be at least 2 characters"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
});

type UploadFormData = z.infer<typeof uploadSchema>;

const Upload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{
    resume?: File;
  }>({});
  const [jobAnalysis, setJobAnalysis] = useState<any>(null);
  const [isAnalyzingJob, setIsAnalyzingJob] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
  });

  const watchedJobDescription = watch("jobDescription");
  const watchedJobTitle = watch("jobTitle");
  const watchedCompany = watch("company");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ];
      
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF, DOC, DOCX, or TXT file.",
          variant: "destructive",
        });
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }

      setUploadedFiles({ resume: file });
      setValue("resume", file);
      
      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been uploaded.`,
      });
    }
  };

  const analyzeJobDescription = async () => {
    if (!watchedJobDescription || !watchedJobTitle || !watchedCompany) {
      toast({
        title: "Missing information",
        description: "Please fill in job title, company, and description first.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzingJob(true);
    try {
      const response = await fetch('http://localhost:8000/api/job-description-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          job_title: watchedJobTitle,
          company: watchedCompany,
          job_description: watchedJobDescription
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setJobAnalysis(result);
      
      toast({
        title: "Job analysis completed",
        description: "AI has analyzed your job description and provided insights.",
      });
    } catch (error) {
      console.error('Error analyzing job description:', error);
      toast({
        title: "Analysis failed",
        description: "Failed to analyze job description. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzingJob(false);
    }
  };

  const onSubmit = async (data: UploadFormData) => {
    setIsUploading(true);
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      
      if (uploadedFiles.resume) {
        formData.append("resume", uploadedFiles.resume);
      }
      formData.append("job_title", data.jobTitle);
      formData.append("company", data.company);
      formData.append("job_description", data.jobDescription);
      
      // Make API call to backend
      const response = await fetch("http://localhost:8000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Store analysis data in sessionStorage
      sessionStorage.setItem('analysisData', JSON.stringify(result));
      
      toast({
        title: "Analysis completed!",
        description: `Match: ${result.job_matching.match_percentage}% | Score: ${result.resume_analysis.overall_score}/100`,
      });

      // Navigate to analysis results
      navigate("/analysis-results", { state: { analysisData: result } });
      
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: "Failed to upload resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Upload Resume & Job Details
          </h1>
          <p className="text-lg text-gray-600">
            Get AI-powered analysis and optimization suggestions for your resume
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UploadIcon className="h-5 w-5" />
                  Upload Your Resume
                </CardTitle>
                <CardDescription>
                  Upload your resume in PDF, DOC, DOCX, or TXT format (max 5MB)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="resume">Resume File</Label>
                    <Input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileUpload}
                      className="mt-1"
                    />
                    {uploadedFiles.resume && (
                      <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        {uploadedFiles.resume.name} uploaded successfully
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Job Details
                  </CardTitle>
                  <CardDescription>
                    Provide the job details for targeted analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="jobTitle">Job Title *</Label>
                    <Input
                      id="jobTitle"
                      {...register("jobTitle")}
                      placeholder="e.g., Software Engineer"
                      className="mt-1"
                    />
                    {errors.jobTitle && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.jobTitle.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="company">Company *</Label>
                    <Input
                      id="company"
                      {...register("company")}
                      placeholder="e.g., Google"
                      className="mt-1"
                    />
                    {errors.company && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.company.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="jobDescription">Job Description *</Label>
                    <div className="relative">
                      <Textarea
                        id="jobDescription"
                        {...register("jobDescription")}
                        placeholder="Paste the job description here..."
                        className="mt-1 min-h-[120px]"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={analyzeJobDescription}
                        disabled={isAnalyzingJob || !watchedJobDescription || !watchedJobTitle || !watchedCompany}
                      >
                        {isAnalyzingJob ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4 mr-2" />
                            Analyze Job
                          </>
                        )}
                      </Button>
                    </div>
                    {errors.jobDescription && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.jobDescription.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Button
                type="submit"
                className="w-full"
                disabled={isUploading || !uploadedFiles.resume}
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Analyzing Resume...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Get AI Analysis
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* AI Job Analysis */}
          <div className="space-y-6">
            {jobAnalysis && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-600" />
                    AI Job Analysis
                  </CardTitle>
                  <CardDescription>
                    Expert insights about this job posting
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap text-sm text-gray-700">
                      {jobAnalysis.analysis}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tips Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                  Pro Tips
                </CardTitle>
                <CardDescription>
                  Get the most out of your analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">
                      Use a recent resume that reflects your current skills and experience
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">
                      Include the complete job description for accurate matching
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">
                      Our AI will provide specific, actionable recommendations
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">
                      Get personalized interview preparation and career advice
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload; 
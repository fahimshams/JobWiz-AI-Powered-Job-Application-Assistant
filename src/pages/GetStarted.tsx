import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowLeft, Upload, Sparkles, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const GetStarted = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    jobTitle: "",
    experience: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const steps = [
    { number: 1, title: "Account Setup", description: "Create your free account" },
    { number: 2, title: "Upload Resume", description: "Upload your current resume" },
    { number: 3, title: "First Job Application", description: "Let AI tailor your first application" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="pt-24 pb-8 px-6 bg-gradient-hero">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Get Started with JobWiz
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create your free account and start applying to jobs 10x faster
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-center mb-12">
            {steps.map((stepItem, index) => (
              <div key={stepItem.number} className="flex items-center">
                <div className={`flex flex-col items-center ${index !== steps.length - 1 ? 'mr-8' : ''}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 mb-2 transition-colors ${
                    step >= stepItem.number 
                      ? 'bg-primary border-primary text-white' 
                      : 'border-muted text-muted-foreground'
                  }`}>
                    {step > stepItem.number ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      stepItem.number
                    )}
                  </div>
                  <div className="text-center">
                    <div className={`font-medium text-sm ${step >= stepItem.number ? 'text-primary' : 'text-muted-foreground'}`}>
                      {stepItem.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {stepItem.description}
                    </div>
                  </div>
                </div>
                
                {index !== steps.length - 1 && (
                  <div className={`w-16 h-0.5 mb-8 ${step > stepItem.number ? 'bg-primary' : 'bg-muted'}`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 px-6">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-gradient-card backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-soft">
            
            {/* Step 1: Account Setup */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">Create Your Account</h2>
                  <p className="text-muted-foreground">Join thousands of professionals landing their dream jobs</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Smith"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john.smith@email.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Current Job Title</Label>
                  <Input 
                    id="jobTitle"
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                    placeholder="Software Engineer"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <select 
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
                  >
                    <option value="">Select experience level</option>
                    <option value="entry">Entry Level (0-2 years)</option>
                    <option value="mid">Mid Level (3-5 years)</option>
                    <option value="senior">Senior Level (6-10 years)</option>
                    <option value="lead">Lead/Principal (10+ years)</option>
                  </select>
                </div>
                
                <Button 
                  onClick={() => setStep(2)}
                  className="w-full bg-gradient-primary hover:shadow-glow py-6 text-lg"
                  disabled={!formData.firstName || !formData.lastName || !formData.email}
                >
                  Continue to Upload Resume
                </Button>
                
                <p className="text-center text-sm text-muted-foreground">
                  Already have an account? <Link to="/signin" className="text-primary hover:underline">Sign in here</Link>
                </p>
              </div>
            )}

            {/* Step 2: Upload Resume */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">Upload Your Resume</h2>
                  <p className="text-muted-foreground">We'll use this as the foundation for your AI-tailored applications</p>
                </div>
                
                <div className="border-2 border-dashed border-muted rounded-2xl p-12 text-center hover:border-primary/50 transition-colors">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Drag & drop your resume here
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Supports PDF, DOCX, and TXT files up to 10MB
                  </p>
                  <Button variant="outline">
                    Choose File
                  </Button>
                </div>
                
                <div className="bg-muted/20 p-4 rounded-xl">
                  <h4 className="font-medium text-foreground mb-2">💡 Pro Tips:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Use a clean, ATS-friendly format</li>
                    <li>• Include quantified achievements</li>
                    <li>• List relevant skills and technologies</li>
                  </ul>
                </div>
                
                <div className="flex gap-4">
                  <Button 
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={() => setStep(3)}
                    className="flex-1 bg-gradient-primary hover:shadow-glow"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: First Application */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-foreground mb-2">You're All Set!</h2>
                  <p className="text-muted-foreground">Your JobWiz account is ready. Let's create your first AI-tailored application.</p>
                </div>
                
                <div className="bg-gradient-primary/10 p-6 rounded-2xl border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-3">What happens next:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      Access your personalized dashboard
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      Paste any job description to get started
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      Get AI-tailored resume and cover letter in seconds
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      Track all your applications in one place
                    </li>
                  </ul>
                </div>
                
                <Button 
                  className="w-full bg-gradient-primary hover:shadow-glow py-6 text-lg"
                >
                  Enter Dashboard
                </Button>
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Free plan includes 3 applications per month
                  </p>
                  <Link to="/pricing" className="text-primary hover:underline text-sm">
                    Upgrade to Premium for unlimited applications
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default GetStarted;
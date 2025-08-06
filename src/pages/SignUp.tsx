import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Navigation from "@/components/Navigation";
import { ArrowLeft, Sparkles, User, Mail, Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const passwordRequirements = [
    { text: "At least 8 characters", met: formData.password.length >= 8 },
    { text: "Contains uppercase letter", met: /[A-Z]/.test(formData.password) },
    { text: "Contains lowercase letter", met: /[a-z]/.test(formData.password) },
    { text: "Contains number", met: /\d/.test(formData.password) }
  ];

  const isFormValid = formData.firstName && 
                     formData.lastName && 
                     formData.email && 
                     formData.password && 
                     formData.confirmPassword && 
                     formData.password === formData.confirmPassword &&
                     passwordRequirements.every(req => req.met) &&
                     formData.agreeToTerms;

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <div className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-foreground">JobWiz</span>
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Create Your Account
            </h1>
            <p className="text-muted-foreground">
              Join thousands of professionals landing their dream jobs
            </p>
          </div>
          
          <div className="bg-gradient-card backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-soft">
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    First Name
                  </Label>
                  <Input 
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="John"
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Smith"
                    className="h-12"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                <Input 
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="john.smith@email.com"
                  className="h-12"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <div className="relative">
                  <Input 
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Create a secure password"
                    className="h-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                
                {formData.password && (
                  <div className="mt-3 space-y-2">
                    {passwordRequirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs">
                        <CheckCircle className={`w-3 h-3 ${req.met ? 'text-green-500' : 'text-muted-foreground'}`} />
                        <span className={req.met ? 'text-green-500' : 'text-muted-foreground'}>
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input 
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirm your password"
                    className="h-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-xs text-red-500">Passwords do not match</p>
                )}
              </div>
              
              <div className="space-y-4">
                <label className="flex items-start space-x-3 text-sm">
                  <input 
                    type="checkbox" 
                    checked={formData.agreeToTerms}
                    onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                    className="mt-0.5 rounded border-muted" 
                  />
                  <span className="text-muted-foreground leading-relaxed">
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                  </span>
                </label>
                
                <label className="flex items-start space-x-3 text-sm">
                  <input type="checkbox" className="mt-0.5 rounded border-muted" />
                  <span className="text-muted-foreground">
                    Send me helpful job search tips and product updates (optional)
                  </span>
                </label>
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-gradient-primary hover:shadow-glow py-6 text-lg"
                disabled={!isFormValid}
              >
                Create Account
              </Button>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <Separator className="my-6" />
                <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card px-4 text-sm text-muted-foreground">
                  Or sign up with
                </span>
              </div>
              
              <div className="space-y-3">
                <Button variant="outline" className="w-full h-12" type="button">
                  <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5 mr-2" />
                  Continue with Google
                </Button>
                <Button variant="outline" className="w-full h-12" type="button">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Microsoft
                </Button>
              </div>
            </div>
            
            <p className="text-center text-sm text-muted-foreground mt-8">
              Already have an account? <Link to="/signin" className="text-primary hover:underline font-medium">Sign in here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
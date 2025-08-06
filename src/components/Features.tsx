import { FileText, Target, Zap, Shield, BarChart, Clock } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Smart Resume Tailoring",
    description: "AI analyzes job descriptions and automatically adjusts your resume to match key requirements and keywords."
  },
  {
    icon: FileText,
    title: "Personalized Cover Letters",
    description: "Generate compelling, personalized cover letters that highlight your relevant experience for each role."
  },
  {
    icon: Zap,
    title: "Instant Processing",
    description: "Get your tailored documents in seconds, not hours. Apply to multiple jobs in the time it used to take for one."
  },
  {
    icon: BarChart,
    title: "ATS Optimization",
    description: "Ensure your resume passes Applicant Tracking Systems with our ATS-friendly formatting and keyword optimization."
  },
  {
    icon: Clock,
    title: "Application Tracking",
    description: "Keep track of all your applications, follow-ups, and deadlines in one organized dashboard."
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data is encrypted and secure. We never share your information with third parties."
  }
];

const Features = () => {
  return (
    <section className="py-20 px-6 bg-gradient-hero">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Core Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to streamline your job application process
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-gradient-card backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-soft hover:shadow-glow transition-all duration-300 h-full">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-primary rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
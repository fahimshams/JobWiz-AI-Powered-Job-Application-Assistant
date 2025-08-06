import { Brain, Sparkles, TrendingUp, Users } from "lucide-react";

const magicFeatures = [
  {
    icon: Brain,
    title: "Advanced AI Analysis",
    description: "Our AI reads between the lines of job descriptions to understand what employers really want.",
    metric: "99.2% accuracy"
  },
  {
    icon: Sparkles,
    title: "Smart Keyword Matching",
    description: "Automatically incorporates relevant industry keywords and phrases to boost your visibility.",
    metric: "3x more interviews"
  },
  {
    icon: TrendingUp,
    title: "Success Rate Optimization",
    description: "Continuously learns from successful applications to improve your chances.",
    metric: "85% success rate"
  },
  {
    icon: Users,
    title: "Industry Expertise",
    description: "Trained on millions of successful applications across all industries and experience levels.",
    metric: "50+ industries"
  }
];

const AIMagic = () => {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-primary text-white px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI Magic</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            The Power of AI
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">Working for You</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our cutting-edge AI doesn't just change words—it understands context, intent, and industry nuances 
            to create applications that truly stand out.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {magicFeatures.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-gradient-card backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-soft hover:shadow-glow transition-all duration-500 hover:scale-105 transform">
                <div className="flex items-start gap-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold text-foreground">
                        {feature.title}
                      </h3>
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">
                        {feature.metric}
                      </span>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Interactive Demo Preview */}
        <div className="bg-gradient-card backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-soft">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">See AI in Action</h3>
            <p className="text-muted-foreground">Watch how JobWiz transforms a generic resume into a targeted masterpiece</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Before: Generic Resume</h4>
              <div className="bg-muted/30 p-4 rounded-xl text-sm text-muted-foreground">
                <p>"Experienced software engineer with programming skills..."</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                After: AI-Tailored Resume 
                <Sparkles className="w-4 h-4 text-primary" />
              </h4>
              <div className="bg-primary/10 p-4 rounded-xl text-sm text-foreground border border-primary/20">
                <p>"Senior Full-Stack Developer with 5+ years expertise in React, Node.js, and cloud architecture, specializing in scalable SaaS solutions..."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIMagic;
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Play, ArrowLeft, Sparkles, FileText, Target } from "lucide-react";
import { Link } from "react-router-dom";

const Demo = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6 bg-gradient-hero">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              See JobWiz in Action
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Watch how our AI transforms a generic resume into a targeted masterpiece in seconds
            </p>
          </div>
        </div>
      </section>

      {/* Video Demo Section */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-card backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-soft mb-12">
            <div className="aspect-video bg-muted/20 rounded-2xl flex items-center justify-center mb-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
              <Button 
                size="lg" 
                className="bg-white/90 text-foreground hover:bg-white z-10 px-8 py-6"
              >
                <Play className="w-6 h-6 mr-2" />
                Play Demo Video
              </Button>
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                3-Minute Interactive Demo
              </h3>
              <p className="text-muted-foreground">
                See how JobWiz analyzes job descriptions and tailors resumes with real examples
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo Steps */}
      <section className="py-12 px-6 bg-gradient-hero">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Try It Yourself
            </h2>
            <p className="text-xl text-muted-foreground">
              Experience the magic with this interactive demo
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Before */}
            <div className="bg-gradient-card backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-soft">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-muted-foreground" />
                <h3 className="text-xl font-semibold text-foreground">Original Resume</h3>
              </div>
              
              <div className="space-y-4 text-sm">
                <div className="bg-muted/30 p-4 rounded-xl">
                  <h4 className="font-medium mb-2">John Smith</h4>
                  <p className="text-muted-foreground">Software Engineer</p>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-xl">
                  <h4 className="font-medium mb-2">Experience</h4>
                  <p className="text-muted-foreground">
                    "Worked on various web development projects using different technologies..."
                  </p>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-xl">
                  <h4 className="font-medium mb-2">Skills</h4>
                  <p className="text-muted-foreground">
                    JavaScript, HTML, CSS, React
                  </p>
                </div>
              </div>
            </div>
            
            {/* After */}
            <div className="bg-gradient-card backdrop-blur-sm rounded-3xl p-8 border border-primary/20 shadow-glow">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">AI-Tailored Resume</h3>
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              
              <div className="space-y-4 text-sm">
                <div className="bg-primary/10 p-4 rounded-xl border border-primary/20">
                  <h4 className="font-medium mb-2">John Smith</h4>
                  <p className="text-primary">Senior Full-Stack Developer</p>
                </div>
                
                <div className="bg-primary/10 p-4 rounded-xl border border-primary/20">
                  <h4 className="font-medium mb-2">Experience</h4>
                  <p className="text-foreground">
                    "Led development of scalable React applications serving 100K+ users, implementing microservices architecture with Node.js and AWS..."
                  </p>
                </div>
                
                <div className="bg-primary/10 p-4 rounded-xl border border-primary/20">
                  <h4 className="font-medium mb-2">Skills</h4>
                  <p className="text-foreground">
                    React, Node.js, TypeScript, AWS, Microservices, CI/CD, Docker, PostgreSQL
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full border border-white/40 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Tailored for Senior Full-Stack Developer at TechCorp</span>
            </div>
            
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground">
                Ready to create your own AI-tailored resume?
              </p>
              <Link to="/get-started">
                <Button size="lg" className="bg-gradient-primary hover:shadow-glow px-8 py-6 text-lg">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Demo;
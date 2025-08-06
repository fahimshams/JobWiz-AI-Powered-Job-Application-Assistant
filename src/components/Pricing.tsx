import { Button } from "@/components/ui/button";
import { Check, Sparkles, Crown } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      "3 resume tailoring per month",
      "3 cover letters per month",
      "Basic ATS optimization",
      "Email support",
      "7-day application tracking"
    ],
    cta: "Get Started Free",
    popular: false
  },
  {
    name: "Premium",
    price: "$29",
    period: "per month",
    description: "For serious job seekers",
    features: [
      "Unlimited resume tailoring",
      "Unlimited cover letters",
      "Advanced ATS optimization",
      "Priority email & chat support",
      "Unlimited application tracking",
      "Interview preparation tips",
      "Salary negotiation guidance",
      "LinkedIn profile optimization"
    ],
    cta: "Start Premium Trial",
    popular: true
  }
];

const Pricing = () => {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start free and upgrade when you're ready to supercharge your job search
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className={`relative group ${plan.popular ? 'md:scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-primary text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                    <Crown className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className={`bg-gradient-card backdrop-blur-sm rounded-3xl p-8 border transition-all duration-300 h-full ${
                plan.popular 
                  ? 'border-primary/40 shadow-glow' 
                  : 'border-white/20 shadow-soft hover:shadow-glow'
              }`}>
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                    {plan.popular && <Sparkles className="w-5 h-5 text-primary" />}
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-5xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">/{plan.period}</span>
                  </div>
                  
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <div className="inline-flex items-center justify-center w-5 h-5 bg-primary/20 rounded-full flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className={`w-full py-6 text-lg font-medium transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-gradient-primary hover:shadow-glow' 
                      : 'variant-outline hover:bg-primary hover:text-white'
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
                
                {plan.popular && (
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    14-day free trial • Cancel anytime
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            All plans include 256-bit SSL encryption and GDPR compliance
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <span>✓ No hidden fees</span>
            <span>✓ Cancel anytime</span>
            <span>✓ 30-day money-back guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
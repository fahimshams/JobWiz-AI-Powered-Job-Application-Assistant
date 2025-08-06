import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowLeft, Shield, Lock, Eye, Database } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="bg-gradient-card backdrop-blur-sm rounded-3xl p-12 border border-white/20 shadow-soft">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
              <p className="text-xl text-muted-foreground">
                Your privacy is our priority. Here's how we protect and handle your data.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="text-center p-6 bg-muted/20 rounded-2xl">
                <Lock className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">256-bit Encryption</h3>
                <p className="text-sm text-muted-foreground">Your data is protected with enterprise-grade encryption</p>
              </div>
              <div className="text-center p-6 bg-muted/20 rounded-2xl">
                <Eye className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">No Data Selling</h3>
                <p className="text-sm text-muted-foreground">We never sell your personal information to third parties</p>
              </div>
              <div className="text-center p-6 bg-muted/20 rounded-2xl">
                <Database className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Full Control</h3>
                <p className="text-sm text-muted-foreground">Delete your data anytime with one click</p>
              </div>
            </div>

            <div className="space-y-8 text-foreground">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Personal Information</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      When you create an account, we collect your name, email address, and professional information. 
                      This helps us personalize your experience and provide better service.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Resume and Career Data</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We process your resume content, job preferences, and application history to provide AI-powered 
                      tailoring services. This data is encrypted and stored securely.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Usage Analytics</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We collect anonymized usage data to improve our service performance and user experience. 
                      This includes feature usage patterns and system performance metrics.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Provide AI-powered resume tailoring and cover letter generation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Track your job applications and provide insights</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Send service updates and helpful job search tips (with your consent)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Improve our AI algorithms and service quality</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Provide customer support and respond to your inquiries</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We implement industry-leading security measures to protect your personal information:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/20 rounded-xl">
                    <h4 className="font-medium text-foreground mb-2">Encryption</h4>
                    <p className="text-sm text-muted-foreground">All data is encrypted both in transit and at rest using AES-256 encryption</p>
                  </div>
                  <div className="p-4 bg-muted/20 rounded-xl">
                    <h4 className="font-medium text-foreground mb-2">Access Control</h4>
                    <p className="text-sm text-muted-foreground">Strict access controls ensure only authorized personnel can access systems</p>
                  </div>
                  <div className="p-4 bg-muted/20 rounded-xl">
                    <h4 className="font-medium text-foreground mb-2">Regular Audits</h4>
                    <p className="text-sm text-muted-foreground">Third-party security audits ensure our systems meet the highest standards</p>
                  </div>
                  <div className="p-4 bg-muted/20 rounded-xl">
                    <h4 className="font-medium text-foreground mb-2">Compliance</h4>
                    <p className="text-sm text-muted-foreground">GDPR, CCPA, and SOC 2 compliant data handling practices</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Data Sharing</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share information only in these limited circumstances:
                </p>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li>• With your explicit consent</li>
                  <li>• To comply with legal obligations or law enforcement requests</li>
                  <li>• With trusted service providers who assist in operating our platform (under strict confidentiality agreements)</li>
                  <li>• In the event of a merger or acquisition (with prior notification to users)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You have complete control over your personal data:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Access:</span>
                      <span className="text-muted-foreground ml-2">Request a copy of all personal data we have about you</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Correction:</span>
                      <span className="text-muted-foreground ml-2">Update or correct any inaccurate information</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Deletion:</span>
                      <span className="text-muted-foreground ml-2">Delete your account and all associated data permanently</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Portability:</span>
                      <span className="text-muted-foreground ml-2">Export your data in a machine-readable format</span>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use essential cookies to provide core functionality and optional analytics cookies to improve our service. 
                  You can control cookie preferences through your browser settings or our cookie banner.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or how we handle your data, please contact us:
                </p>
                <div className="p-6 bg-primary/10 rounded-2xl border border-primary/20">
                  <div className="space-y-2">
                    <p className="text-foreground"><strong>Email:</strong> privacy@jobwiz.ai</p>
                    <p className="text-foreground"><strong>Data Protection Officer:</strong> dpo@jobwiz.ai</p>
                    <p className="text-foreground"><strong>Address:</strong> 123 Innovation Drive, Tech City, TC 12345</p>
                  </div>
                </div>
              </section>

              <section className="border-t pt-8">
                <p className="text-sm text-muted-foreground">
                  Last updated: January 2024 • This policy may be updated periodically, and we'll notify you of significant changes.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Privacy;
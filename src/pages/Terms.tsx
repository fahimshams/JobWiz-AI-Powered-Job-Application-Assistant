import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Terms = () => {
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
            <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
            
            <div className="space-y-8 text-foreground">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using JobWiz ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. 
                  If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Permission is granted to temporarily download one copy of JobWiz per device for personal, non-commercial transitory viewing only. 
                  This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>modify or copy the materials</li>
                  <li>use the materials for any commercial purpose or for any public display</li>
                  <li>attempt to reverse engineer any software contained on JobWiz's website</li>
                  <li>remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. User Data and Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  JobWiz respects your privacy. We collect and use personal information solely for providing and improving our services. 
                  Your resume data and personal information are encrypted and stored securely. We do not sell or share your personal data with third parties 
                  without your explicit consent, except as required by law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. AI-Generated Content</h2>
                <p className="text-muted-foreground leading-relaxed">
                  JobWiz uses artificial intelligence to generate and modify resume content and cover letters. While our AI strives for accuracy and relevance, 
                  users are responsible for reviewing and verifying all AI-generated content before submission. JobWiz is not liable for any inaccuracies 
                  or misrepresentations in AI-generated materials.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Subscription and Billing</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Premium subscriptions are billed monthly or annually. You may cancel your subscription at any time through your account settings. 
                  Cancellations take effect at the end of the current billing period. Refunds are available within 30 days of purchase for annual subscriptions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Prohibited Uses</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You may not use JobWiz:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To submit false, misleading, or fraudulent information</li>
                  <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                  <li>To interfere with or circumvent the security features of the Service</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Disclaimer</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The materials on JobWiz are provided on an 'as is' basis. JobWiz makes no warranties, expressed or implied, 
                  and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, 
                  fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Limitations</h2>
                <p className="text-muted-foreground leading-relaxed">
                  In no event shall JobWiz or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, 
                  or due to business interruption) arising out of the use or inability to use JobWiz, even if JobWiz or a JobWiz authorized representative 
                  has been notified orally or in writing of the possibility of such damage.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Revisions and Errata</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The materials appearing on JobWiz could include technical, typographical, or photographic errors. 
                  JobWiz does not warrant that any of the materials on its website are accurate, complete, or current. 
                  JobWiz may make changes to the materials contained on its website at any time without notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-muted/20 rounded-xl">
                  <p className="text-foreground">Email: legal@jobwiz.ai</p>
                  <p className="text-foreground">Address: 123 Innovation Drive, Tech City, TC 12345</p>
                </div>
              </section>

              <section className="border-t pt-8">
                <p className="text-sm text-muted-foreground">
                  Last updated: January 2024
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

export default Terms;
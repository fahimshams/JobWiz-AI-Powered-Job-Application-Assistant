import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does JobWiz's AI tailoring actually work?",
    answer: "Our AI analyzes job descriptions using natural language processing to identify key requirements, skills, and keywords. It then intelligently modifies your resume and generates cover letters that highlight your most relevant experience while maintaining authenticity."
  },
  {
    question: "Is my personal data safe and secure?",
    answer: "Absolutely. We use enterprise-grade 256-bit SSL encryption and never share your data with third parties. Your documents are stored securely and you can delete your data at any time. We're fully GDPR compliant."
  },
  {
    question: "Can I customize the AI-generated content?",
    answer: "Yes! JobWiz provides AI-generated content as a starting point, but you have full control to edit, customize, and personalize everything. Think of it as your intelligent writing assistant, not a replacement for your voice."
  },
  {
    question: "What file formats does JobWiz support?",
    answer: "We support all major formats including PDF, DOCX, and TXT for uploads. Your optimized documents can be downloaded in PDF or DOCX formats, ensuring compatibility with any application system."
  },
  {
    question: "How many job applications can I track?",
    answer: "Free users can track up to 10 applications, while Premium users get unlimited tracking with advanced analytics, follow-up reminders, and success insights."
  },
  {
    question: "Does JobWiz work for all industries?",
    answer: "Yes! Our AI is trained on millions of successful applications across 50+ industries, from tech and finance to healthcare and creative fields. It adapts to industry-specific terminology and requirements."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Absolutely. You can cancel your Premium subscription at any time with no penalties. Your access continues until the end of your current billing period, and you can always reactivate later."
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 30-day money-back guarantee. If you're not completely satisfied with JobWiz Premium, contact our support team for a full refund within 30 days of purchase."
  }
];

const FAQ = () => {
  return (
    <section className="py-20 px-6 bg-gradient-hero">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about JobWiz
          </p>
        </div>
        
        <div className="bg-gradient-card backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-soft">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-b border-muted/20 last:border-b-0"
              >
                <AccordionTrigger className="text-left text-lg font-medium text-foreground hover:text-primary transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Still have questions?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="mailto:support@jobwiz.ai" 
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Email our support team
            </a>
            <span className="hidden sm:block text-muted-foreground">•</span>
            <a 
              href="/help" 
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Visit our help center
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
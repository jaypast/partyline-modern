import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { CompanionShowcase } from "@/components/companion-showcase";
import { PricingSection } from "@/components/pricing-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FAQSection } from "@/components/faq-section";
import { CTASection } from "@/components/cta-section";
import { ReferralSection } from "@/components/referral-section";
import { EmailCaptureSection } from "@/components/email-capture-section";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <CompanionShowcase />
        <PricingSection />
        <TestimonialsSection />
        <ReferralSection />
        <FAQSection />
        <EmailCaptureSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

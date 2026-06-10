import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import PillarsSection from "@/components/PillarsSection";
import ClientJourneySection from "@/components/ClientJourneySection";
import FeaturedTherapistsSection from "@/components/FeaturedTherapistsSection";
import TherapistJourneySection from "@/components/TherapistJourneySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import SelfAssessmentSection from "@/components/SelfAssessmentSection";
import HelpsWithSection from "@/components/HelpsWithSection";
import SelfDiscoverySection from "@/components/SelfDiscoverySection";
import TherapistSupportSection from "@/components/TherapistSupportSection";
import WhyMyDeepTalk from "@/components/WhyMyDeepTalk";


export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
	  <WhyMyDeepTalk />
	  <SelfDiscoverySection />
      <TherapistSupportSection />
	  <SelfAssessmentSection />
	  <HelpsWithSection />
      <PillarsSection />
      <ClientJourneySection />
      <FeaturedTherapistsSection />
      <TherapistJourneySection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
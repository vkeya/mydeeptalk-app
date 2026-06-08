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


export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
	  
	  <SelfAssessmentSection />
	  
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
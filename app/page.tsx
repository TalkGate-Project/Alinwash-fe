import HeroSection from "@/components/sections/HeroSection";
import BookingForm from "@/components/sections/BookingForm";
import FeaturesSection from "@/components/sections/FeaturesSection";
import ServiceTrustSection from "@/components/sections/ServiceTrustSection";
import HowToUseSection from "@/components/sections/HowToUseSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <BookingForm />
      <FeaturesSection />
      <ServiceTrustSection />
      <HowToUseSection />
      <CTASection />
    </main>
  );
}

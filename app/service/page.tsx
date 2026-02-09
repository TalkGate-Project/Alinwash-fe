import ServiceHero from "@/components/sections/service/ServiceHero";
import WhyAlinwash from "@/components/sections/service/WhyAlinwash";
import ServicesGrid from "@/components/sections/service/ServicesGrid";
import ReviewSection from "@/components/sections/service/ReviewSection";

export default function ServicePage() {
  return (
    <main>
      <ServiceHero />
      <WhyAlinwash />
      <ServicesGrid />
      <ReviewSection />
    </main>
  );
}

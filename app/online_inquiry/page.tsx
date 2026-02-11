import { Suspense } from "react";
import InquiryHero from "@/components/sections/inquiry/InquiryHero";
import FaqSection from "@/components/sections/inquiry/FaqSection";
import ConsultForm from "@/components/sections/inquiry/ConsultForm";

export default function OnlineInquiryPage() {
  return (
    <main>
      <InquiryHero />
      <FaqSection />
      <Suspense fallback={null}>
        <ConsultForm />
      </Suspense>
    </main>
  );
}

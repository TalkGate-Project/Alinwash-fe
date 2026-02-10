"use client";

import Image from "next/image";
import { useInViewOnce } from "@/hooks/useInViewOnce";

export default function CTASection() {
  const { ref: sectionRef, inView } = useInViewOnce<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-dark text-center text-white h-[246px] min-h-[246px] md:h-auto md:min-h-0 md:aspect-[1924/406]"
    >
      {/* 모바일 전용 배경 (246px 높이, 375:246 비율 유지) */}
      <div className="absolute inset-0 md:hidden" aria-hidden>
        <Image
          src="/mobile-cta.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      {/* 웹/PC 배경 (기존 유지) */}
      <div className="absolute inset-0 hidden md:block" aria-hidden>
        <Image
          src="/cta-1.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div className="container-main relative z-10 flex h-full min-h-0 flex-col items-center justify-center px-4 md:px-0">
        <h2 className={`max-w-[246px] text-center text-body font-semibold leading-6 tracking-[-0.04em] text-white md:max-w-none md:text-[32px] md:leading-[48px] reveal-fade ${inView ? "reveal-visible" : ""}`}>
          가장 편안한 장소에서 만나는 깨끗함. 지금 바로 경험해 보세요.
        </h2>
      </div>
    </section>
  );
}

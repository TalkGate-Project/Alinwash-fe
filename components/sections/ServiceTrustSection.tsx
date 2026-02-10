"use client";

import Image from "next/image";
import { useInViewOnce } from "@/hooks/useInViewOnce";

export default function ServiceTrustSection() {
  const { ref: sectionRef, inView } = useInViewOnce<HTMLElement>();

  return (
    <section ref={sectionRef} className="overflow-hidden">
      {/* 모바일: 이미지 + dim + 텍스트 오버레이 (현재 구조 유지) */}
      <div className="relative min-h-[280px] md:hidden">
        <Image
          src="/service-trust.png"
          alt="세차 서비스"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 z-10"
          style={{ background: "#21212D99" }}
          aria-hidden
        />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container-main flex w-full justify-end">
            <div className={`max-w-[528px] px-4 py-10 text-right reveal-fade ${inView ? "reveal-visible" : ""}`}>
              <h2 className="text-[18px] font-semibold tracking-[-0.04em] text-on-dark">
                만나지 않아도 믿을 수 있는 서비스
              </h2>
              <div className="mt-6 text-caption leading-relaxed tracking-[-0.04em] text-on-dark">
                <p>업무 중이신가요?</p>
                <p>세차 전/후 사진 전송부터 완료 안내까지,</p>
                <p>대면하지 않아도 내 차의 상태를</p>
                <p>실시간으로 확인하실 수 있습니다.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 웹: 그리드 (좌 이미지 | 우 단색 직사각형 + 문구) */}
      <div className="hidden md:grid md:grid-cols-[1fr_1.25fr]">
        <div className="relative min-h-[529px]">
          <Image
            src="/service-trust.png"
            alt="세차 서비스"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 40vw, 100vw"
          />
        </div>
        <div className="flex items-center justify-center bg-dark-section px-6 py-12 md:px-12 md:py-16 text-right">
          <div className={`flex max-w-[528px] flex-col reveal-fade ${inView ? "reveal-visible" : ""}`}>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-on-dark md:text-section-title-sm md:leading-[48px]">
              만나지 않아도 믿을 수 있는 서비스
            </h2>
            <div className="mt-6 text-sm leading-relaxed text-on-dark tracking-[-0.04em] md:mt-[48px] md:text-eyebrow md:leading-[28px]">
              <p>업무 중이신가요?</p>
              <p>세차 전/후 사진 전송부터 완료 안내까지,</p>
              <p>대면하지 않아도 내 차의 상태를</p>
              <p>실시간으로 확인하실 수 있습니다.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

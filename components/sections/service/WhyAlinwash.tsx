"use client";

import Image from "next/image";
import Link from "next/link";
import { useInViewOnce } from "@/hooks/useInViewOnce";

export default function WhyAlinwash() {
  const { ref: sectionRef, inView } = useInViewOnce<HTMLElement>();

  return (
    <section ref={sectionRef} className="py-12 md:py-24">
      <div className="!px-7 md:px-3 container-main grid grid-cols-1 items-center md:grid-cols-2 gap-6">
        {/* 모바일 1순위: 2줄 제목 (사진 위) / 웹: 우측 1행 */}
        <div className={`order-1 text-center md:col-start-2 md:row-start-1 md:text-left reveal-fade ${inView ? "reveal-visible" : ""}`}>
          <p className="text-small font-semibold text-muted md:text-eyebrow md:leading-[28px] md:text-heading">
            Why Alinwash?
          </p>
          <h2 className="mt-2 text-[20px] font-bold tracking-[-0.04em] text-heading md:mt-4 md:text-section-title md:leading-[52px]">
            Alinwash만의 차별점
          </h2>
        </div>

        {/* 모바일 2순위: 이미지 / 웹: 좌측 전체(2행) */}
        <div className={`order-2 flex items-center justify-center min-h-[260px] overflow-hidden rounded-xl md:col-start-1 md:row-span-2 md:row-start-1 md:min-h-[380px] reveal-up reveal-delay-1 ${inView ? "reveal-visible" : ""}`}>
          <div className="flex h-full items-center justify-center text-sm text-zinc-400">
            <Image
              src="/about-alinwash.png"
              alt="Alinwash 세차"
              width={424}
              height={360}
              className="object-cover"
            />
          </div>
        </div>

        {/* 모바일 3순위: 항목·CTA (사진 아래) / 웹: 우측 2행 */}
        <div className={`order-3 md:col-start-2 md:row-start-2 text-left reveal-up reveal-delay-2 ${inView ? "reveal-visible" : ""}`}>
          {/* 항목 1 */}
          <div className="mt-2 md:mt-0">
            <h3 className="text-base font-bold text-primary md:text-lg">
              1. 당신의 시간을 아껴드리는 편리함
            </h3>
            <p className="mt-2 text-small leading-relaxed tracking-[-0.04em] text-muted-alt md:text-body md:leading-[14px]">
              세차장까지 이동하고 대기하는 번거로움이 없습니다.<br className="hidden md:block" /><br />
              집, 직장 어디든 주차 공간만 있다면 고객님이 계신 곳으로 직접 찾아갑니다.
            </p>
          </div>

          {/* 항목 2 */}
          <div className="mt-4 md:mt-8">
            <h3 className="text-base font-bold text-primary md:text-lg">
              2. 꼼꼼한 디테일링 케어
            </h3>
            <p className="mt-2 text-small leading-relaxed tracking-[-0.04em] text-muted-alt md:text-body md:leading-[14px]">
              단순히 겉만 닦는 세차가 아니라, 전문가의 손길로 차량 내부의 작은 틈새까지 정밀하게 관리합니다.<br className="hidden md:block" /><br />
              차량의 도장면을 보호하기 위해 검증된 약재와 전문 장비를 사용하여 안전하게 작업합니다.
            </p>
          </div>

          {/* CTA 버튼 – 모바일 풀폭 */}
          <Link
            href="/online_inquiry"
            className="mt-6 flex h-[50px] w-full items-center justify-center rounded-[50px] bg-primary text-body font-semibold text-white transition-colors hover:bg-primary-hover md:mt-10 md:w-[288px]"
          >
            견적 및 예약상담
          </Link>
        </div>
      </div>
    </section>
  );
}

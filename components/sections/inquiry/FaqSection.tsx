"use client";

import { useState } from "react";
import { useInViewOnce } from "@/hooks/useInViewOnce";

const FAQ_ITEMS = [
  {
    question: "Q1. 작업 중에 혹시라도 차량이 손상되면 어떻게 보상받나요?",
    answer:
      "아린 워시는 영업배상 책임보험에 가입되어 있습니다. 작업 전후 검수를 철저히 진행하며, 만약 당사의 과실로 인한 손상이 발생할 경우 공식 서비스 센터를 통해 신속하고 확실하게 100% 보상 처리를 진행해 드립니다.",
  },
  {
    question: "Q2. 수입차나 대형 SUV는 추가 비용이 발생하나요?",
    answer:
      "차종에 따라 추가 비용이 발생할 수 있습니다. 상담 시 차량 정보를 알려주시면 정확한 견적을 안내드리겠습니다.",
  },
  {
    question: "Q3. 세차 서비스 시간은 얼마나 소요되나요?",
    answer:
      "일반 외부 세차 기준 약 1~2시간, 디테일링의 경우 3~4시간 정도 소요됩니다. 차량 상태에 따라 달라질 수 있습니다.",
  },
  {
    question:
      "Q4. 비가 오거나 기상 상황이 안 좋을 때도 서비스가 가능한가요?",
    answer:
      "기상 상황에 따라 일정 변경을 안내드릴 수 있습니다. 우천 시에는 고객님께 사전에 연락드려 일정을 조율합니다.",
  },
  {
    question: "Q5. 세차 중 차량 키를 어떻게 맡겨야 하나요?",
    answer:
      "방문 세차 시 차량 키 전달 방식은 상담 시 안내드립니다. 비대면 진행 시 별도 안내에 따라 주차 위치만 알려주시면 됩니다.",
  },
];

export default function FaqSection() {
  const { ref: sectionRef, inView } = useInViewOnce<HTMLElement>();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section ref={sectionRef} className="bg-surface-faq py-9 md:py-24">
      <div className="container-main">
        <p className={`text-center text-small font-semibold text-muted md:text-eyebrow md:text-heading reveal-fade ${inView ? "reveal-visible" : ""}`}>
          FAQ&apos;S
        </p>
        <h2 className={`mt-2 text-center text-[20px] font-bold tracking-[-0.04em] text-heading md:text-section-title reveal-fade reveal-delay-1 ${inView ? "reveal-visible" : ""}`}>
          서비스 이용 문의
        </h2>

        <div className="mx-auto mt-8 md:mt-12 max-w-3xl space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-xl bg-white reveal-up reveal-delay-${Math.min(index + 1, 4)} ${inView ? "reveal-visible" : ""} ${isOpen ? "shadow-[0px_4px_8px_0px_#0000001A]" : "shadow-[0px_1px_3px_0px_#0000000D]"}`}
              >
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-3 px-5 py-4 text-left text-sm font-medium md:text-base"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                >
                  <span className={`flex-1 ${isOpen ? "text-primary" : "text-heading"} font-semibold`}>
                    {item.question}
                  </span>
                  {isOpen ? (
                    <svg className="h-5 w-5 shrink-0 text-zinc-400 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 shrink-0 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>

                {isOpen && (
                  <div className="md:border-t md:border-zinc-100 px-5 pb-5 md:pt-3">
                    <p className="text-small leading-relaxed text-zinc-500 md:text-sm">
                      A: {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

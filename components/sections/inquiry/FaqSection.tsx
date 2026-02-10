"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "Q1. 작업 중에 혹시라도 차량이 손상되면 어떻게 보상받나요?",
    answer:
      "차량 훼손 시에는 전액배상보험(배상책임보험)에 가입되어 있습니다. 작업 전후 상태를 촬영하여 다이렉트 손상에 정확한 판별을 할 수 있으며, 서비스 이후 문의 접수하시면 100% 보상 처리를 책임지겠습니다.",
  },
  {
    question: "Q2. 수입차나 사륜 SUV는 추가 비용이 발생하나요?",
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
    question: "Q5. 세차 후 차량 관련 불만은 어떻게 처리하시나요?",
    answer:
      "서비스 완료 후 불만 사항이 있으시면 즉시 연락 주세요. 확인 후 재작업 또는 환불 등 신속하게 처리해 드립니다.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="bg-surface-faq py-16 md:py-24">
      <div className="container-main">
        <p className="text-center text-eyebrow font-semibold text-heading">
          FAQ&apos;S
        </p>
        <h2 className="mt-2 text-center text-2xl font-bold md:text-section-title tracking-[-0.04em] text-heading">
          서비스 이용 문의
        </h2>

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-lg bg-white ${isOpen ? "shadow-[0px_4px_8px_0px_#0000001A]" : ""}`}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium md:text-base"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                >
                  <span className={`${isOpen ? "text-primary" : ""} font-semibold`}>{item.question}</span>
                  <svg
                    className={`h-5 w-5 shrink-0 text-zinc-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isOpen && (
                  <div className="border-t border-zinc-100 px-5 pb-5 pt-3">
                    <p className="text-sm leading-relaxed text-zinc-500">
                      {item.answer}
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

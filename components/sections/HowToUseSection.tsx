"use client";

import { useInViewOnce } from "@/hooks/useInViewOnce";

const STEPS = [
  {
    step: 1,
    title: "간편 예약 신청",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.3333 11.6667V5M26.6667 11.6667V5M11.6667 18.3333H28.3333M8.33333 35H31.6667C33.5076 35 35 33.5076 35 31.6667V11.6667C35 9.82572 33.5076 8.33333 31.6667 8.33333H8.33333C6.49238 8.33333 5 9.82572 5 11.6667V31.6667C5 33.5076 6.49238 35 8.33333 35Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    ),
    description:
      <>홈페이지 간편 예약을 통해<br />성함, 연락처, 장소를 남겨주세요.</>,
  },
  {
    step: 2,
    title: "상담 및 일정 확정",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.7071 22.6262C15.3166 22.2357 14.6834 22.2357 14.2929 22.6262C13.9023 23.0168 13.9023 23.6499 14.2929 24.0404L15 23.3333L15.7071 22.6262ZM18.3333 26.6667L17.6262 27.3738C18.0167 27.7643 18.6499 27.7643 19.0404 27.3738L18.3333 26.6667ZM25.7071 20.7071C26.0976 20.3166 26.0976 19.6834 25.7071 19.2929C25.3166 18.9024 24.6834 18.9024 24.2929 19.2929L25 20L25.7071 20.7071ZM31.6666 11.6667H30.6666V31.6667H31.6666H32.6666V11.6667H31.6666ZM28.3333 35V34H11.6666V35V36H28.3333V35ZM8.33331 31.6667H9.33331V11.6667H8.33331H7.33331V31.6667H8.33331ZM11.6666 8.33333V9.33333H15V8.33333V7.33333H11.6666V8.33333ZM25 8.33333V9.33333H28.3333V8.33333V7.33333H25V8.33333ZM11.6666 35V34C10.378 34 9.33331 32.9553 9.33331 31.6667H8.33331H7.33331C7.33331 34.0599 9.27341 36 11.6666 36V35ZM31.6666 31.6667H30.6666C30.6666 32.9553 29.622 34 28.3333 34V35V36C30.7265 36 32.6666 34.0599 32.6666 31.6667H31.6666ZM31.6666 11.6667H32.6666C32.6666 9.27343 30.7265 7.33333 28.3333 7.33333V8.33333V9.33333C29.622 9.33333 30.6666 10.378 30.6666 11.6667H31.6666ZM8.33331 11.6667H9.33331C9.33331 10.378 10.378 9.33333 11.6666 9.33333V8.33333V7.33333C9.27341 7.33333 7.33331 9.27343 7.33331 11.6667H8.33331ZM15 23.3333L14.2929 24.0404L17.6262 27.3738L18.3333 26.6667L19.0404 25.9596L15.7071 22.6262L15 23.3333ZM18.3333 26.6667L19.0404 27.3738L25.7071 20.7071L25 20L24.2929 19.2929L17.6262 25.9596L18.3333 26.6667ZM18.3333 5V6H21.6666V5V4H18.3333V5ZM21.6666 11.6667V10.6667H18.3333V11.6667V12.6667H21.6666V11.6667ZM18.3333 11.6667V10.6667C17.0446 10.6667 16 9.622 16 8.33333H15H14C14 10.7266 15.9401 12.6667 18.3333 12.6667V11.6667ZM25 8.33333H24C24 9.622 22.9553 10.6667 21.6666 10.6667V11.6667V12.6667C24.0599 12.6667 26 10.7266 26 8.33333H25ZM21.6666 5V6C22.9553 6 24 7.04467 24 8.33333H25H26C26 5.9401 24.0599 4 21.6666 4V5ZM18.3333 5V4C15.9401 4 14 5.9401 14 8.33333H15H16C16 7.04467 17.0446 6 18.3333 6V5Z" fill="currentColor" />
      </svg>
    ),
    description:
      <>매니저가 연락드려 차종에<br />따른 정확한 견적과 방문 시간을 조율합니다.</>,
  },
  {
    step: 3,
    title: "비대면 세차 진행",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.6666 19.1667V23.3333M11.6666 19.1667V9.16667C11.6666 7.78595 12.7859 6.66667 14.1666 6.66667C15.5473 6.66667 16.6666 7.78595 16.6666 9.16667M11.6666 19.1667C11.6666 17.786 10.5473 16.6667 9.16663 16.6667C7.78591 16.6667 6.66663 17.786 6.66663 19.1667V22.5C6.66663 29.4036 12.2631 35 19.1666 35C26.0702 35 31.6666 29.4036 31.6666 22.5V14.1667C31.6666 12.786 30.5473 11.6667 29.1666 11.6667C27.7859 11.6667 26.6666 12.786 26.6666 14.1667M16.6666 9.16667V18.3333M16.6666 9.16667V7.5C16.6666 6.11929 17.7859 5 19.1666 5C20.5473 5 21.6666 6.11929 21.6666 7.5V9.16667M21.6666 9.16667V18.3333M21.6666 9.16667C21.6666 7.78595 22.7859 6.66667 24.1666 6.66667C25.5473 6.66667 26.6666 7.78596 26.6666 9.16667V14.1667M26.6666 14.1667V18.3333" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    ),
    description:
      <>약속된 장소에서 전문 매니저가 세차를 시작합니다. (내부 세차 시 키 전달 방식은 상담 시 확정)</>,
  },
  {
    step: 4,
    title: "전/후 사진 전송 및 완료",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 31.6667V16.784C5 15.6695 5.557 14.6287 6.48433 14.0105L18.151 6.23268C19.2707 5.48624 20.7293 5.48624 21.849 6.23268L33.5157 14.0105C34.443 14.6287 35 15.6695 35 16.784V31.6667M5 31.6667C5 33.5076 6.49238 35 8.33333 35H31.6667C33.5076 35 35 33.5076 35 31.6667M5 31.6667L16.25 24.1667M35 31.6667L23.75 24.1667M5 16.6667L16.25 24.1667M35 16.6667L23.75 24.1667M23.75 24.1667L21.849 25.434C20.7293 26.1805 19.2707 26.1805 18.151 25.434L16.25 24.1667" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    ),
    description:
      <>세차가 끝나면 깨끗해진 차량<br/>사진을 보내드립니다. 확인 후 결제하시면 모든 서비스가 종료됩니다.</>,
  },
];

const STEP_ORDER_MOBILE = { 1: "order-0", 2: "order-3", 3: "order-2", 4: "order-1" } as const;
const STEP_ORDER_LG = { 1: "lg:order-1", 2: "lg:order-2", 3: "lg:order-3", 4: "lg:order-4" } as const;

export default function HowToUseSection() {
  const { ref: sectionRef, inView } = useInViewOnce<HTMLElement>();

  return (
    <section ref={sectionRef} className="bg-[#F1F4FF] py-12 md:pb-[134px] md:pt-[62px]">
      <div className="container-main">
        <h2 className={`text-center text-[18px] font-bold leading-[48px] tracking-[-0.04em] text-black md:text-left md:leading-normal md:text-section-title-sm reveal-fade ${inView ? "reveal-visible" : ""}`}>
          이용방법
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-x-[27px] gap-y-3 md:mt-[62px] md:grid-cols-2 md:gap-x-5 md:gap-y-8 lg:grid-cols-4">
          {STEPS.map((item, index) => (
            <div
              key={item.step}
              className={`flex flex-col items-center gap-3 md:items-start md:gap-0 ${STEP_ORDER_MOBILE[item.step as 1 | 2 | 3 | 4]} ${STEP_ORDER_LG[item.step as 1 | 2 | 3 | 4]} reveal-up reveal-delay-${index + 1} ${inView ? "reveal-visible" : ""}`}
            >
              {/* Step Badge - 피그마: 72x28, rounded 20px, 14px semibold */}
              <span className="flex h-7 w-[72px] flex-none items-center justify-center rounded-[20px] bg-primary text-small font-semibold tracking-[-0.02em] text-white md:h-[34px] md:w-[72px]">
                Step {item.step}
              </span>

              {/* Step title - 모바일: 16px bold center #444, 데스크: eyebrow 왼쪽 정렬 */}
              <h3 className="w-full text-center text-base font-bold leading-[19px] tracking-[-0.02em] text-[#444444] md:mt-4 md:text-left md:text-eyebrow md:leading-[28px] md:tracking-[-0.04em] md:text-heading">
                {item.title}
              </h3>

              {/* Icon - 40x40, border 2px primary */}
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg text-primary md:mt-4.5">
                {item.icon}
              </div>

              {/* Description - 모바일: 13px 500 center 24px line-height #888 */}
              <p className="w-full text-center text-caption font-medium leading-6 tracking-[-0.02em] text-muted-light md:mt-4.5 md:text-left md:text-body md:leading-relaxed md:tracking-[-0.04em] md:max-w-[200px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useRef, useState, useCallback } from "react";

const SERVICE_ICONS = [
  "/service-introduce-01.png",
  "/service-introduce-02.png",
  "/service-introduce-03.png",
  "/service-introduce-04.png",
] as const;

const SERVICES = [
  {
    icon: "CAR",
    title: "이동 없는 세차",
    description:
      <>세차장까지 가고 대기하는 시간을<br/>아껴드립니다.</>,
  },
  {
    icon: "DETAIL",
    title: "정밀한 디테일링",
    description:
      <>외부는 물론 차량 내부의 작은 먼지까지<br/>꼼꼼히 관리합니다.</>,
  },
  {
    icon: "OPEN",
    title: "투명한 운영",
    description:
      <>거품을 뺀 합리적인 비용으로<br/>프리미엄 서비스를 제공합니다.</>,
  },
  {
    icon: "AFTER",
    title: "철저한 사후 관리",
    description:
      <>작업 중 발생할 수 있는 만약의 상황까지<br/>책임지고 보상합니다.</>,
  },
];

export default function ServicesGrid() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollable = el.scrollWidth - el.clientWidth;
    if (scrollable <= 0) {
      setActiveIndex(0);
      return;
    }
    const step = scrollable / (SERVICES.length - 1);
    const index = Math.round(el.scrollLeft / step);
    setActiveIndex(Math.min(Math.max(0, index), SERVICES.length - 1));
  }, []);

  return (
    <section className="bg-surface py-9 md:py-16 md:pt-[90px] md:pb-[135px]">
      <div className="container-main text-center">
        <p className="text-small font-semibold text-muted md:text-eyebrow md:leading-[28px] md:tracking-[-0.04em] md:text-heading">
          What&apos;s Next?
        </p>
        <h2 className="mt-2 text-[20px] font-bold tracking-[-0.04em] text-heading md:mt-5 md:text-section-title">
          차를 위한 가장 완벽한 선택
        </h2>
        <p className="px-7 mx-auto mt-4 text-small leading-relaxed text-muted md:mt-6 md:text-body md:leading-[2] !text-left">
          찾아가는 편리함부터 확실한 사후 관리까지,<br />
          번거로운 세차 과정은 줄이고, 전문가의 세심한 손길로 최상의 컨디션을 유지합니다.
        </p>

        {/* 모바일: 가로 스크롤 캐러셀 */}
        <div className="mt-[30px] md:mt-[75px] md:hidden">
          <div
            ref={scrollRef}
            onScroll={onScroll}
            className="px-7 flex gap-4 overflow-x-auto overflow-y-hidden pb-2 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-webkit-overflow-scrolling:touch]"
          >
            {SERVICES.map((service, index) => (
              <div
                key={service.icon}
                className="flex min-w-[min(280px,78vw)] max-w-[78vw] flex-shrink-0 snap-center rounded-xl bg-white p-5 shadow-[0px_4px_8px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center"
              >
                <div className="relative mx-auto overflow-hidden rounded-lg">
                  <Image
                    src={SERVICE_ICONS[index]}
                    alt=""
                    width={94}
                    height={78}
                    className="object-contain"
                  />
                </div>
                <h3 className="mt-4 text-base font-bold tracking-[-0.04em] text-heading md:text-subsection-title">
                  {service.title}
                </h3>
                <p className="mt-2 text-small leading-relaxed tracking-[-0.04em] text-muted">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
          {/* 캐러셀 도트 */}
          <div className="mt-4 flex justify-center gap-2" aria-hidden>
            {SERVICES.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  const el = scrollRef.current;
                  if (el) {
                    const step = (el.scrollWidth - el.clientWidth) / Math.max(1, SERVICES.length - 1);
                    el.scrollTo({ left: index * step, behavior: "smooth" });
                  }
                }}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === activeIndex ? "bg-primary" : "bg-zinc-300"
                }`}
                aria-label={`${index + 1}번 슬라이드`}
              />
            ))}
          </div>
        </div>

        {/* 데스크톱: 그리드 */}
        <div className="mt-12 hidden grid-cols-2 gap-4 md:mt-[75px] md:grid md:gap-5 lg:grid-cols-4">
          {SERVICES.map((service, index) => (
            <div
              key={service.icon}
              className="md:min-h-[342px] rounded-xl bg-white p-5 text-center hover:shadow-md md:p-6 flex flex-col items-center justify-center"
            >
              <div className="relative mx-auto overflow-hidden rounded-lg">
                <Image
                  src={SERVICE_ICONS[index]}
                  alt=""
                  width={94}
                  height={78}
                  className="object-contain"
                />
              </div>
              <h3 className="mt-4 text-subsection-title font-bold tracking-[-0.04em] text-heading">
                {service.title}
              </h3>
              <p className="mt-2 text-small leading-relaxed text-muted tracking-[-0.04em]">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

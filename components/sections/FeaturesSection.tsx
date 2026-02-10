const FEATURES = [
  {
    id: "TIME",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.39688 7.39684C5.4065 9.38722 4.16783 12.0062 3.89193 14.8074C3.61603 17.6087 4.31996 20.419 5.88379 22.7594C7.44763 25.0999 9.77459 26.8257 12.4682 27.6428C15.1618 28.4599 18.0554 28.3177 20.656 27.2405C23.2565 26.1633 25.4032 24.2178 26.7301 21.7353C28.057 19.2529 28.482 16.3871 27.9329 13.6264C27.3838 10.8656 25.8944 8.38072 23.7185 6.59502C21.5426 4.80931 18.8148 3.83331 16 3.83331" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
        <path d="M16 16L8 8" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
        <path d="M16 4V6.66667" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
        <path d="M28 16L25.3333 16" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
        <path d="M16 25.3334V28" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
        <path d="M6.66666 16L3.99999 16" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
      </svg>
    ),
    title: "시간의 여유 (TIME)",
    description:
      "세차장까지 이동하고 대기하는 번거로움은 이제 끝. 업무를 보거나 휴식을 취하는 사이, 당신의 공간으로 직접 찾아갑니다.",
  },
  {
    id: "QUALITY",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.66667 4V9.33333M4 6.66667H9.33333M8 22.6667V28M5.33333 25.3333H10.6667M17.3333 4L20.381 13.1429L28 16L20.381 18.8571L17.3333 28L14.2857 18.8571L6.66667 16L14.2857 13.1429L17.3333 4Z" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    ),
    title: "압도적 디테일 (QUALITY)",
    description:
      "보이지 않는 휠 안쪽부터 도장면의 광택까지. 숙련된 전문가가 프리미엄 약재를 사용하여 차원이 다른 깨끗함을 선사합니다.",
  },
  {
    id: "TRUST",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.6667 13.3333H25.0186C27.0009 13.3333 28.2903 15.4195 27.4037 17.1926L22.737 26.5259C22.2853 27.4293 21.362 28 20.3519 28H14.9949C14.7769 28 14.5597 27.9733 14.3482 27.9204L9.33333 26.6667M18.6667 13.3333V6.66667C18.6667 5.19391 17.4728 4 16 4H15.8727C15.2066 4 14.6667 4.53996 14.6667 5.20603C14.6667 6.15844 14.3848 7.08954 13.8565 7.88199L9.33333 14.6667V26.6667M18.6667 13.3333H16M9.33333 26.6667H6.66667C5.19391 26.6667 4 25.4728 4 24V16C4 14.5272 5.19391 13.3333 6.66667 13.3333H10" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    ),
    title: "안심 프로세스 (TRUST)",
    description:
      "업무 중에도 안심하세요. 세차 전/후 사진 전송과 실시간 진행 상황 안내를 통해 대면 없이도 완벽한 결과물을 약속드립니다.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-12 md:pt-[132px] md:pb-[166px]">
      <div className="container-main">
        <h2 className="text-center text-[18px] font-semibold md:text-section-title-sm">
          당신의 일상을 바꾸는 스마트한 차량 관리
        </h2>

        <div className="mt-3 md:mt-[88px] grid grid-cols-1 gap-6 md:gap-[42px] md:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="md:min-h-[302px] rounded-[20px] bg-surface-card px-8 py-6 text-left transition-shadow hover:shadow-md md:p-[32px]"
            >
              {/* icon placeholder */}
              <div className="flex h-[58px] w-[58px] items-center justify-center rounded-[10px] bg-background text-primary text-sm font-bold shadow-[0px_0px_16px_0px_#0000001A]">
                {feature.icon}
              </div>
              <h3 className="mt-5 md:mt-8 text-[18px] font-bold md:text-card-title">
                {feature.title}
              </h3>
              <p className="mt-5 md:mt-8 text-caption leading-relaxed text-zinc-500 md:text-body">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

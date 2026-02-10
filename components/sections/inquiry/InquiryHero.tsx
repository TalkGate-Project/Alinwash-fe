import Header from "@/components/Header";

export default function InquiryHero() {
  return (
    <div className="md:px-6">
      <section className="relative mx-auto flex w-full max-w-[1860px] flex-col overflow-hidden text-white min-h-[524px] aspect-auto md:mb-[30px] md:mt-[30px] md:h-[560px] md:min-h-0 md:rounded-[32px]">
      {/* 모바일 전용 배경 */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat md:hidden overflow-hidden [background-position:60%_50%]"
        style={{ backgroundImage: "url('/mobile-inquiry-hero.png')" }}
        aria-hidden
      />
      {/* 웹/PC 배경 (기존 유지) */}
      <div
        className="absolute inset-0 hidden bg-cover overflow-hidden md:block [background-position:center]"
        style={{ backgroundImage: "url('/alinwash-hero-3.png')" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent overflow-hidden" aria-hidden />
      <div className="absolute top-0 left-0 right-0 z-20">
        <Header variant="overlay" />
      </div>
      <div className="container-main relative z-10 flex flex-1 items-center !px-7 md:!px-0 pb-6 pt-40 md:pb-8 md:pt-20 pointer-events-none">
        <div className="pointer-events-auto flex flex-col gap-3 md:gap-4 hero-text-fade">
          <h1 className="text-[20px] font-bold leading-[-0.04em] text-on-dark-muted md:text-hero-title">
            온라인 문의
          </h1>
          <p className="text-small text-on-dark md:text-body">
            궁금한 점이 있다면 언제든 문의 주세요.
          </p>
        </div>
      </div>
    </section>
    </div>
  );
}

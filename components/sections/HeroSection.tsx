import Header from "@/components/Header";

export default function HeroSection() {
  return (
    <div className="md:px-6">
      <section className="relative mx-auto md:mt-[30px] flex w-full max-w-[1860px] flex-col overflow-hidden md:rounded-[32px] text-white min-h-[484px] aspect-auto md:h-[560px] md:min-h-0">
      {/* 모바일 전용 배경 */}
      <div
        className="absolute inset-0 overflow-hidden md:hidden -top-32"
        style={{
          backgroundImage: "url('/mobile-service-hero.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "50% 100%",
        }}
        aria-hidden
      />
      {/* 웹/PC 배경 (기존 유지) */}
      <div
        className="absolute inset-0 hidden bg-cover overflow-hidden md:block [background-position:center]"
        style={{ backgroundImage: "url('/alinwash-hero-1.png')" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent overflow-hidden" aria-hidden />
      <div className="absolute top-0 left-0 right-0 z-20">
        <Header variant="overlay" />
      </div>
      <div className="container-main relative z-10 flex flex-1 items-center pb-6 pt-12 md:pb-8 md:pt-4 pointer-events-none">
        <div className="pointer-events-auto hero-text-fade">
        <h1 className="hidden md:block text-hero-title font-bold leading-[-0.04em] text-on-dark-muted">
          내 차가 가장 깨끗해지는 시간,
          <br />
          아린워시(Alinwash)
        </h1>
        <p className="hidden md:block mt-0 md:mt-4 text-small md:text-body text-on-dark tracking-[-0.04em] font-[var(--font-montserrat)]">
          3050 오너드라이버가 선택한 No.1 디테일링 출장 세차
        </p>
        </div>
      </div>
    </section>
    </div>
  );
}

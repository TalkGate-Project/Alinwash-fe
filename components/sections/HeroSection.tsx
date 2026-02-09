import Header from "@/components/Header";

export default function HeroSection() {
  return (
    <section className="relative mx-auto mt-[30px] flex min-h-[200px] w-full max-w-[1860px] flex-col overflow-hidden rounded-[32px] text-white aspect-[1860/560]">
      <div
        className="absolute inset-0 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/alinwash-hero-1.png')" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent overflow-hidden" aria-hidden />
      <div className="absolute top-0 left-0 right-0 z-20">
        <Header variant="overlay" />
      </div>
      <div className="container-main relative z-10 flex flex-1 items-center pb-8 pt-20 pointer-events-none">
        <div className="pointer-events-auto">
        <h1 className="text-[42px] font-bold leading-[-0.04em] text-on-dark-muted">
          내 차가 가장 깨끗해지는 시간,
          <br />
          아린워시(Alinwash)
        </h1>
        <p className="mt-4 text-[18px] text-on-dark">
          3050 오너드라이버가 선택한 No.1 디테일링 출장 세차
        </p>
        </div>
      </div>
    </section>
  );
}

import Header from "@/components/Header";

export default function InquiryHero() {
  return (
    <section className="relative mx-auto mt-[30px] md:mb-[30px] flex min-h-[200px] w-full max-w-[1860px] flex-col overflow-hidden rounded-[32px] text-white aspect-[1860/560]"> 
      <div
        className="absolute inset-0 overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/alinwash-hero-3.png')" }}
        aria-hidden
      />
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-r from-black/70 to-transparent" aria-hidden />
      <div className="absolute top-0 left-0 right-0 z-20">
        <Header variant="overlay" />
      </div>
      <div className="container-main relative z-10 flex flex-1 items-center pb-8 pt-20 pointer-events-none">
        <div className="pointer-events-auto">
        <h1 className="text-hero-title font-bold leading-[-0.04em] text-on-dark-muted">온라인 문의</h1>
        <p className="mt-3 text-body text-on-dark">
          궁금한 점이 있다면 언제든 문의 주세요.
        </p>
        </div>
      </div>
    </section>
  );
}

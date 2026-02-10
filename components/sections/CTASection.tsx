import Image from "next/image";

export default function CTASection() {
  return (
    <section className="relative w-full overflow-hidden bg-dark text-center text-white aspect-[1924/406]">
      <div
        className="absolute inset-0"
        aria-hidden
      >
        <Image
          src="/cta-1.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div className="container-main relative z-10 flex h-full items-center justify-center">
        <h2 className="text-section-title-sm leading-[48px] tracking-[-0.04em] font-semibold">
          가장 편안한 장소에서 만나는 깨끗함. 지금 바로 경험해 보세요.
        </h2>
      </div>
    </section>
  );
}

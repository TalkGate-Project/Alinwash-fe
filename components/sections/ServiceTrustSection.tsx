import Image from "next/image";

export default function ServiceTrustSection() {
  return (
    <section className="overflow-hidden bg-dark-section">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.25fr]">
        {/* 좌측 이미지 영역 - fill 사용 시 부모에 relative 필요 */}
        <div className="relative min-h-[280px] md:min-h-[529px]">
          <Image src="/service-trust.png" alt="세차 서비스" fill className="object-cover" />
        </div>

        {/* 우측 텍스트 영역 */}
        <div className="flex items-center justify-center px-6 py-12 md:px-12 md:py-16 text-right">
          <div className="md:max-w-[528px] flex flex-col">
          <h2 className="text-2xl font-semibold md:text-[36px] md:leading-[48px] text-on-dark tracking-[-0.04em]">
            만나지 않아도 믿을 수 있는 서비스
          </h2>
          <div className="mt-6 md:mt-[48px] text-sm md:text-[20px] leading-relaxed md:leading-[28px] text-on-dark tracking-[-0.04em]">
            <p>업무 중이신가요?</p>
            <p>세차 전/후 사진 전송부터 완료 안내까지,</p>
            <p>대면하지 않아도 내 차의 상태를</p>
            <p>실시간으로 확인하실 수 있습니다.</p>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}

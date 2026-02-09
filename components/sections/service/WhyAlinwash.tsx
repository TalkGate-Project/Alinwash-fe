import Image from "next/image";
import Link from "next/link";

export default function WhyAlinwash() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-main grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
        {/* 좌측 이미지 영역 */}
        <div className="flex items-center justify-center min-h-[260px] overflow-hidden rounded-xl md:min-h-[380px]">
          {/*
            TODO: 실제 세차 이미지로 교체
            예) <Image src="/images/why-alinwash.jpg" alt="Alinwash 세차" fill className="object-cover" />
          */}
          <div className="flex h-full items-center justify-center text-sm text-zinc-400">
            <Image
              src="/about-alinwash.png"
              alt="Alinwash 세차"
              width={424}
              height={360}
              className="object-cover"
            />
          </div>
        </div>

        {/* 우측 텍스트 영역 */}
        <div>
          <p className="text-[20px] font-semibold leading-[28px] text-heading">Why Alinwash?</p>
          <h2 className="mt-2 md:mt-4 text-2xl font-bold md:text-[48px] md:leading-[52px] tracking-[-0.04em] text-heading">
            Alinwash만의 차별점
          </h2>

          {/* 항목 1 */}
          <div className="mt-2 md:mt-6">
            <h3 className="text-base font-bold text-primary md:text-lg">
              1. 당신의 시간을 아껴드리는 편리함
            </h3>
            <p className="mt-2 text-[16px] leading-[14px] tracking-[-0.04em] text-muted-alt">
              세차장까지 이동하고 대기하는 번거로움이 없습니다.<br /><br />
              집, 직장 어디든 주차 공간만 있다면 고객님이 계신 곳으로 직접 찾아갑니다.
            </p>
          </div>

          {/* 항목 2 */}
          <div className="mt-4 md:mt-8">
            <h3 className="text-base font-bold text-primary md:text-lg">
              2. 꼼꼼한 디테일링 케어
            </h3>
            <p className="mt-2 text-[16px] leading-[14px] tracking-[-0.04em] text-muted-alt">
              단순히 겉만 닦는 세차가 아니라, 전문가의 손길로 차량 내부의 작은 틈새까지 정밀하게 관리합니다.<br /><br />
              차량의 도장면을 보호하기 위해 검증된 약재와 전문 장비를 사용하여 안전하게 작업합니다.
            </p>
          </div>

          {/* CTA 버튼 */}
          <Link
            href="/online_inquiry"
            className="w-[288px] h-[50px] rounded-[50px] flex items-center justify-center mt-4 md:mt-10 bg-primary text-[16px] font-semibold text-white transition-colors hover:bg-primary-hover"
          >
            견적 및 예약상담
          </Link>
        </div>
      </div>
    </section>
  );
}

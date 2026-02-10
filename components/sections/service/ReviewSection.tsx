"use client";

import Image from "next/image";
import { useInViewOnce } from "@/hooks/useInViewOnce";

const REVIEWS = [
  {
    rating: 4,
    title: "주말의 가치를 바꿔준 서비스",
    content:
      "매번 주말마다 세차장 대기 줄에서 시간을 허비하는 게 일이었는데, 아린 워시를 알고 나서 삶의 질이 달라졌습니다. 집 주차장에서 편하게 쉬는 동안 새 차처럼 변해있는 모습을 보니 정말 감동적이더군요. 단순히 겉만 닦는 게 아니라 휠 안쪽과 문틈 먼지까지 완벽하게 제거해주셔서 믿고 맡길 수 있었습니다.",
    name: "김남준",
    info: "35세, 서울 강서구",
    avatar: "/test-profile-01.png",
  },
  {
    rating: 3,
    title: "품격이 느껴지는 관리, 아린워시",
    content:
      "젊을 때부터 차를 워낙 아껴서 웬만하면 제 손으로 직접 세차를 해왔습니다. 하지만 이제 기운도 부치고 시간 내기도 쉽지 않던 차에 지인 추천으로 아린 워시를 만났습니다. 솔직히 반신반의했는데, 작업하시는 분의 태도와 꼼꼼한 장비 세팅을 보고 마음이 놓였습니다.",
    name: "이백호",
    info: "58세, 수원 영통구",
    avatar: "/test-profile-02.png",
  },
  {
    rating: 5,
    title: "바쁜 직장인의 필수적인 서비스",
    content:
      "이번에 사무실 주차장으로 아린 워시를 호출해 봤는데, 정말 신세계네요. 휠 분진이나 그릴 틈새처럼 까다로운 부분까지 놓치지 않고 완벽하게 작업해 주셨고, 실내 소독까지 깔끔해서 가족들이 탈 때도 마음이 편합니다. 비용이 전혀 아깝지 않은 '시간 효율 끝판왕' 서비스입니다. 앞으로 정기적으로 맡길 예정입니다.",
    name: "함현민",
    info: "42세, 성남 분당구",
    avatar: "/test-profile-03.png",
  },
];

const STAR_OPACITIES = [1, 0.8, 0.6, 0.3, 0.1] as const;

function StarRating({ rating }: { rating: number }) {
  const fullCount = Math.min(5, Math.max(0, Math.floor(rating)));

  return (
    <div
      className="flex flex-row items-start gap-1"
      role="img"
      aria-label={`${rating}점`}
    >
      {STAR_OPACITIES.map((opacity, i) => (
        <span
          key={i}
          className="h-5 w-5 shrink-0 text-primary"
          style={{ opacity: i < fullCount ? 1 : opacity }}
        >
          <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.07088 0.612343C9.41462 -0.204115 10.5854 -0.204114 10.9291 0.612346L12.9579 5.43123C13.1029 5.77543 13.4306 6.01061 13.8067 6.0404L19.0727 6.45748C19.9649 6.52814 20.3267 7.62813 19.6469 8.2034L15.6348 11.5987C15.3482 11.8412 15.223 12.2218 15.3106 12.5843L16.5363 17.661C16.744 18.5211 15.7969 19.201 15.033 18.7401L10.5245 16.0196C10.2025 15.8252 9.7975 15.8252 9.47548 16.0196L4.96699 18.7401C4.20311 19.201 3.25596 18.5211 3.46363 17.661L4.68942 12.5843C4.77698 12.2218 4.65182 11.8412 4.36526 11.5987L0.353062 8.2034C-0.326718 7.62813 0.0350679 6.52814 0.927291 6.45748L6.19336 6.0404C6.5695 6.01061 6.89716 5.77543 7.04207 5.43123L9.07088 0.612343Z" fill="currentColor" />
          </svg>

        </span>
      ))}
    </div>
  );
}

export default function ReviewSection() {
  const { ref: sectionRef, inView } = useInViewOnce<HTMLElement>();

  return (
    <section ref={sectionRef} className="bg-white py-9 md:py-24">
      <div className="container-main">
        <p className={`text-center text-small font-semibold text-muted md:text-left md:text-eyebrow md:leading-[130%] md:text-heading reveal-fade ${inView ? "reveal-visible" : ""}`}>
          Review
        </p>
        <h2 className={`mt-2 md:mt-6 text-center text-[20px] font-bold tracking-[-0.04em] text-black md:text-left md:text-section-title md:leading-[138%] reveal-fade reveal-delay-1 ${inView ? "reveal-visible" : ""}`}>
          고객님들의 생생한 리뷰
        </h2>
        <p className={`mt-4 md:mt-6 max-w-[560px] text-center text-small leading-snug tracking-[-0.04em] text-muted md:text-left md:text-body reveal-fade reveal-delay-2 ${inView ? "reveal-visible" : ""}`}>
          이미 많은 분이 아린워시의 차별화된 디테일링으로<br className="md:hidden" /> 일상의 여유를 찾고 계십니다.
        </p>

        <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-stretch md:gap-4 lg:gap-4">
          {REVIEWS.map((review, index) => (
            <article
              key={review.name}
              className={`flex flex-1 flex-col gap-6 rounded-xl bg-white p-8 shadow-[0px_4px_8px_rgba(0,0,0,0.1)] max-w-[320px] mx-auto md:max-w-[396px] md:mx-0 reveal-up reveal-delay-${index + 1} ${inView ? "reveal-visible" : ""}`}
            >
              <StarRating rating={review.rating} />
              <div className="flex flex-1 flex-col gap-6">
                <h3 className="text-base font-semibold leading-[150%] text-muted">
                  {review.title}
                </h3>
                <p className="flex-1 text-sm leading-[155%] tracking-[-0.04em] text-muted">
                  {review.content}
                </p>
                <div className="flex items-center gap-5">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-surface-avatar">
                    <Image
                      src={review.avatar}
                      alt=""
                      width={56}
                      height={56}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-base font-semibold leading-[150%] text-heading">
                      {review.name}
                    </p>
                    <p className="text-base leading-[150%] text-muted">
                      {review.info}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

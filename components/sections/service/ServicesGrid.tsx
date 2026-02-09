import Image from "next/image";

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
  return (
    <section className="bg-surface py-16 md:pt-[90px] md:pb-[135px]">
      <div className="container-main text-center">
        <p className="text-sm md:text-[20px] font-semibold leading-[28px] tracking-[-0.04em] text-heading">Services</p>
        <h2 className="mt-2 md:mt-5 text-2xl font-bold md:text-[48px] tracking-[-0.04em] text-heading">
          차를 위한 가장 완벽한 선택
        </h2>
          <p className="mx-auto mt-4 md:mt-6 text-sm md:text-[18px] leading-[2] text-muted">
          찾아가는 편리함부터 확실한 사후 관리까지,<br/>
          번거로운 세차 과정은 줄이고, 전문가의 세심한 손길로 최상의 컨디션을 유지합니다.
        </p>

        <div className="mt-12 md:mt-[75px] grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
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
              <h3 className="mt-4 text-[28px] font-bold tracking-[-0.04em] text-heading">
                {service.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted md:text-[14px] tracking-[-0.04em]">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

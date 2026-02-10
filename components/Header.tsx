"use client";

import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/service", label: "서비스 소개" },
  { href: "/online_inquiry", label: "온라인 문의" },
];

type HeaderProps = {
  variant?: "default" | "overlay";
};

export default function Header({ variant = "default" }: HeaderProps) {
  const isOverlay = variant === "overlay";

  return (
    <header
      className={
        isOverlay ? "w-full bg-transparent" : "w-full bg-zinc-900"
      }
    >
      <div className="container-main flex min-h-0 items-center justify-between py-4">
        {/* Logo – 모바일: 전용 SVG 120×36 고정 / 웹: 기존 logo.svg */}
        <Link
          href="/"
          className="font-montserrat flex shrink-0 items-center text-xl font-bold tracking-wide text-white"
        >
          <Image
            src="/logo-mobile.svg"
            alt="Alinwash"
            width={120}
            height={36}
            className="h-3.5 w-[120px] object-contain object-left md:hidden"
          />
          <Image
            src="/logo.svg"
            alt="Alinwash"
            width={149}
            height={19}
            className="hidden w-full max-w-[149px] md:block"
          />
        </Link>

        {/* Nav – 모바일에서도 2개 메뉴 직접 노출 (햄버거 제거) */}
        <nav className="flex gap-4 md:gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-300 transition-colors hover:text-white md:text-body"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

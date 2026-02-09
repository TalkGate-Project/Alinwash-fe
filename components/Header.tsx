"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/service", label: "서비스 소개" },
  { href: "/online_inquiry", label: "온라인 문의" },
];

type HeaderProps = {
  variant?: "default" | "overlay";
};

export default function Header({ variant = "default" }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isOverlay = variant === "overlay";

  return (
    <header
      className={
        isOverlay ? "w-full bg-transparent" : "w-full bg-zinc-900"
      }
    >
      <div className="container-main flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="font-montserrat text-xl font-bold tracking-wide text-white">
          <Image src="/logo.svg" alt="Alinwash" width={149} height={19} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[16px] font-medium text-zinc-300 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="메뉴 열기"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-opacity ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="flex flex-col gap-4 border-t border-zinc-700 px-5 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

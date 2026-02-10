"use client";

import { useEffect, useRef, useState } from "react";

export type AnimateInViewAnimation = "fade" | "slideLeft" | "slideRight" | "slideUp";

const AIV_CLASS: Record<AnimateInViewAnimation, string> = {
  fade: "aiv-fade",
  slideLeft: "aiv-slide-left",
  slideRight: "aiv-slide-right",
  slideUp: "aiv-slide-up",
};

const MOBILE_ANIMATION: AnimateInViewAnimation = "fade";

export interface AnimateInViewProps {
  children: React.ReactNode;
  className?: string;
  animation?: AnimateInViewAnimation;
  rootMargin?: string;
}

export default function AnimateInView({
  children,
  className = "",
  animation = "fade",
  rootMargin = "0px 0px -40px 0px",
}: AnimateInViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [effectiveAnimation, setEffectiveAnimation] = useState<AnimateInViewAnimation>(() =>
    animation === "slideLeft" || animation === "slideRight" ? "fade" : animation
  );

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => {
      if (media.matches) {
        setEffectiveAnimation(animation);
      } else {
        setEffectiveAnimation(
          animation === "slideLeft" || animation === "slideRight" ? MOBILE_ANIMATION : animation
        );
      }
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [animation]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { rootMargin, threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  const aivClass = AIV_CLASS[effectiveAnimation];
  const classes = ["animate-in-view", aivClass, inView ? "in-view" : "", className].filter(Boolean).join(" ");

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
}

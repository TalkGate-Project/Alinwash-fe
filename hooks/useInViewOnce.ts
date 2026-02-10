"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOnceOptions {
  rootMargin?: string;
  threshold?: number;
}

export function useInViewOnce<T extends HTMLElement>(
  options: UseInViewOnceOptions = {}
) {
  const { rootMargin = "0px 0px -10% 0px", threshold = 0.15 } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin, threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, rootMargin, threshold]);

  return { ref, inView };
}

"use client";

import {
  useEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";

type ScrollRevealProps = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  id?: string;
};

export function ScrollReveal({
  children,
  as,
  delay = 0,
  className,
  id,
}: ScrollRevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("reveal-in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // No ratio threshold: a section taller than ~6 viewports can never reach 16% visible.
          if (entry.isIntersecting) {
            node.classList.add("reveal-in");
            // Reveal only once. Re-hiding a section at the viewport boundary makes
            // mobile scrolling flash and forces unnecessary compositing work.
            observer.disconnect();
          }
        }
      },
      { threshold: 0, rootMargin: "-6% 0px -12% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal${className ? ` ${className}` : ""}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

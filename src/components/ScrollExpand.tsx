"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type ScrollExpandProps = {
  src: string;
  alt?: string;
  title?: string;
  scrollHint?: string;
  useWindowScroll?: boolean;
  mediaZoom?: number;
  children?: React.ReactNode;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function ScrollExpand({
  src,
  alt = "",
  title,
  scrollHint,
  useWindowScroll = false,
  mediaZoom = 1.28,
  children,
}: ScrollExpandProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [maxInset, setMaxInset] = useState(170);

  useEffect(() => {
    document.body.classList.add("hero-intro-active");

    const update = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const range = Math.max(1, rect.height - viewport);
      const nextProgress = clamp(-rect.top / range, 0, 1);
      setMaxInset(Math.min(170, Math.max(42, window.innerWidth * 0.13)));
      setProgress(nextProgress);
      document.body.classList.toggle("hero-intro-active", nextProgress < 0.95);
    };

    const frame = window.requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.classList.remove("hero-intro-active");
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [useWindowScroll]);

  const inset = maxInset - progress * maxInset;
  const radius = 30 - progress * 30;
  const scale = mediaZoom - (mediaZoom - 1) * progress;

  return (
    <section
      ref={ref}
      className="scroll-expand"
      style={
        {
          "--media-inset": `${inset}px`,
          "--media-radius": `${radius}px`,
          "--media-scale": scale,
          "--content-opacity": clamp(1 - progress * 1.35, 0, 1),
        } as React.CSSProperties
      }
      aria-label={title || alt || "MAWD"}
    >
      <div className="scroll-expand-frame">
        <Image
          className="scroll-expand-media"
          src={src}
          alt={alt}
          width={1600}
          height={900}
          priority
        />
        <div className="scroll-expand-shade" aria-hidden="true" />
        <div className="scroll-expand-content">
          {title ? <p className="sr-only">{title}</p> : null}
          {children}
          {scrollHint ? <span className="scroll-expand-hint">{scrollHint}</span> : null}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";

type DepthTextProps = {
  text: string;
  layers?: number;
  depth?: number;
  faceColor?: string;
  depthColor?: string;
  tilt?: number;
  pointerTracking?: boolean;
  smoothing?: number;
  perspective?: number;
  autoOrbit?: boolean;
  orbitSpeed?: number;
  fontSize?: string;
  fontWeight?: number;
  shadow?: boolean;
};

export default function DepthText({
  text,
  layers = 24,
  depth = 2,
  faceColor = "#f8fafc",
  depthColor = "#7c3aed",
  tilt = 0,
  pointerTracking = false,
  smoothing = 0.14,
  perspective = 900,
  autoOrbit = false,
  orbitSpeed = 0.35,
  fontSize = "clamp(3rem, 12vw, 7rem)",
  fontWeight = 900,
  shadow = false,
}: DepthTextProps) {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [orbit, setOrbit] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobileViewport = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsMobile(mobileViewport.matches);
    updateViewport();
    mobileViewport.addEventListener("change", updateViewport);
    return () => mobileViewport.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    if (!autoOrbit || isMobile || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frame = 0;
    let animationFrame = 0;
    const animate = () => {
      frame += orbitSpeed;
      setOrbit(Math.sin(frame / 60) * 9);
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [autoOrbit, orbitSpeed, isMobile]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerTracking || isMobile || event.pointerType !== "mouse") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -14;

    setPointer((current) => ({
      x: current.x + (x - current.x) * smoothing,
      y: current.y + (y - current.y) * smoothing,
    }));
  };

  const handlePointerLeave = () => setPointer({ x: 0, y: 0 });

  return (
    <span
      className={`depth-text${shadow ? " depth-text-shadow" : ""}`}
      role="img"
      aria-label={text}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        perspective,
        fontSize,
        fontWeight,
        color: faceColor,
      }}
    >
      <span
        className="depth-text-stack"
        style={{
          transform: `rotateX(${tilt + pointer.y}deg) rotateY(${orbit + pointer.x}deg)`,
        }}
      >
        {Array.from({ length: isMobile ? Math.min(layers, 16) : layers }).map((_, index) => (
          <span
            key={index}
            className="depth-text-layer"
            aria-hidden="true"
            style={{
              color: index === 0 ? faceColor : depthColor,
              transform: `translateZ(${-index * depth}px)`,
            }}
          >
            {text}
          </span>
        ))}
      </span>
    </span>
  );
}

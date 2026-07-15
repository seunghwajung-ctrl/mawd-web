"use client";

import { useEffect, useRef } from "react";

type PixelStar = {
  x: number;
  y: number;
  size: number;
  alpha: number;
  twinkle: number;
  phase: number;
  color: string;
};

type ShootingStar = {
  x: number;
  y: number;
  length: number;
  speed: number;
  alpha: number;
  color: string;
};

const starColors = ["#f8f8f2", "#66ff00", "#b026ff", "#8ff7ff"];

const random = (min: number, max: number) => Math.random() * (max - min) + min;

export function BackgroundPixelStars() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stars: PixelStar[] = [];
    let shootingStars: ShootingStar[] = [];
    let animationFrame = 0;
    let spawnTimer = 0;
    let lastTime = performance.now();
    let lastFrameTime = 0;
    let isPageVisible = document.visibilityState === "visible";
    const frameInterval = 1000 / 24;

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = width < 760 ? 0.00007 : 0.0001;
      const count = Math.floor(width * height * density);

      stars = Array.from({ length: count }, () => ({
        x: random(0, width),
        y: random(0, height),
        size: Math.random() > 0.82 ? 2 : 1,
        alpha: random(0.18, 0.74),
        twinkle: random(0.00045, 0.0016),
        phase: random(0, Math.PI * 2),
        color: starColors[Math.floor(random(0, starColors.length))],
      }));
    };

    const spawnShootingStar = () => {
      shootingStars.push({
        x: random(window.innerWidth * 0.1, window.innerWidth * 0.92),
        y: random(72, window.innerHeight * 0.52),
        length: random(54, 118),
        speed: random(0.65, 1.25),
        alpha: random(0.55, 0.9),
        color: Math.random() > 0.45 ? "#66ff00" : "#f8f8f2",
      });
    };

    const draw = (now: number) => {
      if (!isPageVisible) {
        lastTime = now;
        animationFrame = requestAnimationFrame(draw);
        return;
      }

      if (now - lastFrameTime < frameInterval) {
        animationFrame = requestAnimationFrame(draw);
        return;
      }

      const delta = now - lastTime;
      lastTime = now;
      lastFrameTime = now;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const star of stars) {
        const pulse = Math.sin(now * star.twinkle + star.phase) * 0.28;
        context.globalAlpha = Math.max(0.08, Math.min(1, star.alpha + pulse));
        context.fillStyle = star.color;
        context.fillRect(Math.round(star.x), Math.round(star.y), star.size, star.size);
      }

      spawnTimer += delta;
      if (!prefersReducedMotion.matches && spawnTimer > random(2400, 5200)) {
        spawnShootingStar();
        spawnTimer = 0;
      }

      shootingStars = shootingStars.filter((star) => {
        star.x += star.speed * delta * 0.34;
        star.y += star.speed * delta * 0.15;
        star.alpha -= delta * 0.0009;

        const segments = 9;
        for (let index = 0; index < segments; index += 1) {
          context.globalAlpha = Math.max(0, star.alpha * (1 - index / segments));
          context.fillStyle = star.color;
          context.fillRect(
            Math.round(star.x - index * (star.length / segments)),
            Math.round(star.y - index * 3),
            index < 2 ? 4 : 3,
            index < 2 ? 4 : 3,
          );
        }

        return star.alpha > 0 && star.x < window.innerWidth + star.length;
      });

      context.globalAlpha = 1;
      animationFrame = requestAnimationFrame(draw);
    };

    const handleVisibilityChange = () => {
      isPageVisible = document.visibilityState === "visible";
      lastTime = performance.now();
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (prefersReducedMotion.matches) {
      draw(performance.now());
      cancelAnimationFrame(animationFrame);
    } else {
      animationFrame = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="background-pixel-stars" aria-hidden="true" />;
}

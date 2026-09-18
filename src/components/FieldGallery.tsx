"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const photos = [
  { src: "/gallery/mawd-field-01.jpg", alt: "MAWD Challenge 현장 발표" },
  { src: "/gallery/mawd-field-02.jpg", alt: "MAWD Challenge 참가자 협업 현장" },
  { src: "/gallery/mawd-field-03.jpg", alt: "MAWD Challenge 행사 현장" },
];

export function FieldGallery() {
  const track = useRef<HTMLDivElement>(null);
  const dragStart = useRef<{ x: number; scrollLeft: number } | null>(null);
  const [active, setActive] = useState(0);

  const move = (direction: -1 | 1) => {
    const next = (active + direction + photos.length) % photos.length;
    setActive(next);
    const card = track.current?.querySelector<HTMLElement>(`[data-index="${next}"]`);
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <main className="field-gallery-page">
      <header className="field-gallery-nav">
        <Link href="/" className="field-gallery-brand" aria-label="MAWD Challenge 홈으로">
          <Image src="/mawd-logo.png" alt="MAWD Challenge" width={1050} height={789} priority />
        </Link>
        <span>FIELD NOTES</span>
        <Link href="/">MAWD CHALLENGE ↗</Link>
      </header>

      <section className="field-gallery-hero" aria-labelledby="field-gallery-title">
        <div className="field-gallery-copy">
          <p>MAWD CHALLENGE / FIELD NOTES</p>
          <h1 id="field-gallery-title">아이디어가<br />움직이기 시작한<br /><em>현장의 순간.</em></h1>
          <div className="field-gallery-description">
            <span className="field-gallery-line" />
            <p>서로의 질문에 답하고, 함께 만들고, 결과를 나누는 시간. MAWD의 경험은 화면 밖 현장에서 완성됩니다.</p>
          </div>
        </div>

        <div className="field-gallery-stage">
          <div className="field-gallery-mask field-gallery-mask--left" aria-hidden="true" />
          <div className="field-gallery-mask field-gallery-mask--right" aria-hidden="true" />
          <div
            className="field-gallery-track"
            ref={track}
            onPointerDown={(event) => {
              dragStart.current = { x: event.clientX, scrollLeft: event.currentTarget.scrollLeft };
              event.currentTarget.setPointerCapture(event.pointerId);
              event.currentTarget.classList.add("is-dragging");
            }}
            onPointerMove={(event) => {
              if (!dragStart.current) return;
              event.currentTarget.scrollLeft = dragStart.current.scrollLeft - (event.clientX - dragStart.current.x);
            }}
            onPointerUp={(event) => {
              dragStart.current = null;
              event.currentTarget.classList.remove("is-dragging");
              event.currentTarget.releasePointerCapture(event.pointerId);
            }}
            onPointerCancel={(event) => {
              dragStart.current = null;
              event.currentTarget.classList.remove("is-dragging");
            }}
            onScroll={(event) => {
              const container = event.currentTarget;
              const cards = [...container.querySelectorAll<HTMLElement>("[data-index]")];
              const nearest = cards.reduce((closest, card) =>
                Math.abs(card.offsetLeft - container.scrollLeft - container.clientWidth / 2 + card.clientWidth / 2) <
                Math.abs(closest.offsetLeft - container.scrollLeft - container.clientWidth / 2 + closest.clientWidth / 2) ? card : closest,
              );
              setActive(Number(nearest.dataset.index));
            }}
          >
            {photos.map((photo, index) => (
              <figure className="field-gallery-card" data-index={index} key={photo.src}>
                <Image src={photo.src} alt={photo.alt} width={1280} height={900} sizes="(max-width: 760px) 76vw, 54vw" priority={index === 0} />
                <figcaption><span>0{index + 1}</span><span>MAWD FIELD</span></figcaption>
              </figure>
            ))}
          </div>
          <div className="field-gallery-controls">
            <button type="button" onClick={() => move(-1)} aria-label="이전 사진">←</button>
            <p><strong>0{active + 1}</strong> / 0{photos.length}</p>
            <button type="button" onClick={() => move(1)} aria-label="다음 사진">→</button>
          </div>
        </div>
      </section>

      <section className="field-gallery-statement">
        <p>WHAT HAPPENS<br />WHEN WE <em>BUILD</em><br />TOGETHER?</p>
        <span>SCROLL · DRAG · EXPLORE</span>
      </section>
    </main>
  );
}

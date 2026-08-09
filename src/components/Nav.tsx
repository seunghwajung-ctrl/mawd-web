"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { LumaCheckoutButton } from "@/components/LumaCheckoutButton";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [introRevealed, setIntroRevealed] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    const update = () => {
      const mainHero = document.querySelector(".hero-page-second");
      const viewport = window.innerHeight || 1;
      if (!mainHero || mainHero.getBoundingClientRect().top <= viewport * 0.3) {
        setIntroRevealed(true);
      }
    };

    const frame = window.requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`nav${introRevealed ? "" : " is-intro-hidden"}`} aria-label="주요 메뉴">
      <div className="wrap nav-inner">
        <a className="brand" href="#top" aria-label="MAWD Challenge home" onClick={closeMenu}>
          <Image
            src="/mawd-nav-logo.png"
            alt="MAWD Challenge"
            className="brand-logo-img"
            width={159}
            height={208}
          />
        </a>
        <div className={`nav-links${menuOpen ? " is-open" : ""}`}>
          <a href="#program" onClick={closeMenu}>프로그램</a>
          <a href="#benefits" onClick={closeMenu}>혜택</a>
          <a href="#faq" onClick={closeMenu}>FAQ</a>
          <a className="nav-link-btn" href="mailto:team.mawd@cyz.today" onClick={closeMenu}>
            문의하기
          </a>
        </div>
        <div className="nav-auth">
          <button type="button" className="btn ghost" onClick={closeMenu}>
            로그인
          </button>
          <LumaCheckoutButton className="btn primary" onClick={closeMenu}>
            참가하기 <span className="arrow">›</span>
          </LumaCheckoutButton>
          <button
            type="button"
            className="nav-toggle"
            aria-label="메뉴 열기/닫기"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
          </button>
        </div>
      </div>
    </nav>
  );
}

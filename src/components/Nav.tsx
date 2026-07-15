"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { GOOGLE_FORM_URL } from "@/lib/form-config";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="nav" aria-label="주요 메뉴">
      <div className="wrap nav-inner">
        <a className="brand" href="#top" aria-label="MAWD Challenge home" onClick={closeMenu}>
          <Image
            src="/mawd-logo.png"
            alt="MAWD Challenge"
            className="brand-logo-img"
            width={1050}
            height={789}
          />
        </a>
        <div className={`nav-links${menuOpen ? " is-open" : ""}`}>
          <a href="#program" onClick={closeMenu}>프로그램</a>
          <a href="#benefits" onClick={closeMenu}>혜택</a>
          <a href="#faq" onClick={closeMenu}>FAQ</a>
          <a className="nav-link-btn" href="mailto:team.mawd@gmail.com" onClick={closeMenu}>
            문의하기
          </a>
        </div>
        <div className="nav-auth">
          <button type="button" className="btn ghost" onClick={closeMenu}>
            로그인
          </button>
          <a className="btn primary" href={GOOGLE_FORM_URL} onClick={closeMenu}>
            참가하기 <span className="arrow">›</span>
          </a>
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

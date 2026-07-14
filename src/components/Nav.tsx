"use client";

import { useEffect, useState } from "react";
import { useModal } from "@/components/ModalProvider";

export function Nav() {
  const { open } = useModal();
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
          <img
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
          <button type="button" className="nav-link-btn" onClick={() => { closeMenu(); open("contact"); }}>
            문의하기
          </button>
        </div>
        <div className="nav-auth">
          <button type="button" className="btn ghost" onClick={() => { closeMenu(); open("login"); }}>
            로그인
          </button>
          <button type="button" className="btn primary" onClick={() => { closeMenu(); open("signup"); }}>
            참가하기 <span className="arrow">›</span>
          </button>
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

"use client";

import { useModal } from "@/components/ModalProvider";

export function Nav() {
  const { open } = useModal();

  return (
    <nav className="nav" aria-label="주요 메뉴">
      <div className="wrap nav-inner">
        <a className="brand" href="#top" aria-label="MAWD Challenge home">
          <span className="brand-mark">MAWD</span>
          <span>
            <small>CHALLENGE</small>
          </span>
        </a>
        <div className="nav-links">
          <a href="#program">프로그램</a>
          <button type="button" className="nav-link-btn" onClick={() => open("team")}>
            팀 소개
          </button>
          <button type="button" className="nav-link-btn" onClick={() => open("faq")}>
            FAQ
          </button>
          <button type="button" className="nav-link-btn" onClick={() => open("contact")}>
            문의하기
          </button>
        </div>
        <div className="nav-auth">
          <button type="button" className="btn ghost" onClick={() => open("login")}>
            로그인
          </button>
          <button type="button" className="btn primary" onClick={() => open("signup")}>
            회원가입 <span className="arrow">›</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

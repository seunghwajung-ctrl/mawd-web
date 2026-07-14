"use client";

import { useModal } from "@/components/ModalProvider";

export function Footer() {
  const { open } = useModal();
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <strong className="pixel">MAWD CHALLENGE</strong>
        </div>
        <nav className="footer-links" aria-label="푸터 메뉴">
          <button type="button" onClick={() => open("contact")}>
            문의하기
          </button>
          <a href="#faq">FAQ</a>
          <button type="button" onClick={() => open("sponsor")}>
            스폰서 문의
          </button>
          <a href="#program">프로그램</a>
          <a href="#benefits">혜택</a>
          <a href="#gallery">갤러리</a>
        </nav>
        <div className="footer-social" aria-label="소셜 미디어">
          <a href="#" aria-label="Instagram" onClick={(e) => e.preventDefault()}>IG</a>
          <a href="#" aria-label="X (Twitter)" onClick={(e) => e.preventDefault()}>X</a>
          <a href="#" aria-label="LinkedIn" onClick={(e) => e.preventDefault()}>in</a>
          <a href="#" aria-label="GitHub" onClick={(e) => e.preventDefault()}>GH</a>
        </div>
        <p className="footer-copy">© {year} MAWD. All rights reserved.</p>
      </div>
    </footer>
  );
}

"use client";

import { useSponsorModal } from "@/components/SponsorModalProvider";
import ButtonSocialIconDemo from "@/components/ui/social-icon";

export function Footer() {
  const { openSponsorModal } = useSponsorModal();
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <strong className="pixel">MAWD CHALLENGE</strong>
        </div>
        <nav className="footer-links" aria-label="푸터 메뉴">
          <a href="mailto:team.mawd@gmail.com">
            문의하기
          </a>
          <a href="#faq">FAQ</a>
          <button type="button" onClick={openSponsorModal}>
            스폰서 문의
          </button>
          <a href="#program">프로그램</a>
          <a href="#benefits">혜택</a>
          <a href="#gallery">갤러리</a>
        </nav>
        <div className="footer-social" aria-label="소셜 미디어">
          <ButtonSocialIconDemo />
        </div>
        <p className="footer-copy">© {year} MAWD. All rights reserved.</p>
      </div>
    </footer>
  );
}

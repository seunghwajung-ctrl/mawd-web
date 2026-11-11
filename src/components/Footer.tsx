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
          <a href="mailto:team.mawd@cyz.today">
            문의하기
          </a>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- full load so the browser lands on the section after the homepage finishes layout; <Link> stops short */}
          <a href="/#faq">FAQ</a>
          <button type="button" onClick={openSponsorModal}>
            스폰서 문의
          </button>
          <a href="/programs">프로그램</a>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- full load so the browser lands on the section after the homepage finishes layout; <Link> stops short */}
          <a href="/#partners">스폰서·제휴</a>
          <a href="/inquiry">도입하기</a>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- full load so the browser lands on the section after the homepage finishes layout; <Link> stops short */}
          <a href="/#gallery">TEAM Gallery</a>
        </nav>
        <div className="footer-social" aria-label="소셜 미디어">
          <ButtonSocialIconDemo />
        </div>
        <p className="footer-copy">© {year} MAWD. All rights reserved.</p>
      </div>
    </footer>
  );
}

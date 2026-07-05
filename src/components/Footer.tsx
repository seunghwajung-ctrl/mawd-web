"use client";

import { useModal } from "@/components/ModalProvider";

export function Footer() {
  const { open } = useModal();

  return (
    <footer>
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <strong className="pixel">MAWD CHALLENGE</strong>
          <span>Build. Prove. Earn.</span>
        </div>
        <nav className="footer-links" aria-label="푸터 메뉴">
          <button type="button" onClick={() => open("contact")}>
            문의하기
          </button>
          <button type="button" onClick={() => open("faq")}>
            FAQ
          </button>
          <button type="button" onClick={() => open("sponsor")}>
            스폰서 문의
          </button>
        </nav>
        <p className="footer-copy">© 2023 MAWD. All rights reserved.</p>
      </div>
    </footer>
  );
}

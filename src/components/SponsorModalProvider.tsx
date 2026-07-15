"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface SponsorModalContextValue {
  openSponsorModal: () => void;
  closeSponsorModal: () => void;
}

const SponsorModalContext = createContext<SponsorModalContextValue | null>(null);

export function SponsorModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const openSponsorModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeSponsorModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSponsorModal();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, closeSponsorModal]);

  const value = useMemo(
    () => ({ openSponsorModal, closeSponsorModal }),
    [openSponsorModal, closeSponsorModal],
  );

  return (
    <SponsorModalContext.Provider value={value}>
      {children}
      {isOpen && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sponsor-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeSponsorModal();
          }}
        >
          <div className="modal-panel">
            <div className="modal-head">
              <p className="section-kicker">MAWD CHALLENGE</p>
              <h2 id="sponsor-modal-title">스폰서 문의</h2>
              <button
                ref={closeRef}
                type="button"
                className="modal-close"
                aria-label="닫기"
                onClick={closeSponsorModal}
              >
                x
              </button>
            </div>
            <div className="modal-body">
              <SponsorModal onClose={closeSponsorModal} />
            </div>
          </div>
        </div>
      )}
    </SponsorModalContext.Provider>
  );
}

export function useSponsorModal(): SponsorModalContextValue {
  const ctx = useContext(SponsorModalContext);
  if (!ctx) {
    throw new Error("useSponsorModal must be used within SponsorModalProvider");
  }
  return ctx;
}

function SponsorModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="sponsor-contact">
      <p className="modal-intro">
        스폰서 문의는 아래 연락처로 부탁드립니다. 담당자가 확인 후 회신드립니다.
      </p>
      <div className="sponsor-contact-list">
        <div className="sponsor-contact-item">
          <span className="sponsor-contact-label">EMAIL</span>
          <a href="mailto:team.mawd@gmail.com" className="sponsor-contact-value">
            team.mawd@gmail.com
          </a>
        </div>
        <div className="sponsor-contact-item">
          <span className="sponsor-contact-label">INSTAGRAM</span>
          <a
            href="https://www.instagram.com/team_mawd?igsh=MW0zdHVhd3Vxbmx6aw%3D%3D&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="sponsor-contact-value"
          >
            @team_mawd
          </a>
        </div>
      </div>
      <button type="button" className="btn primary modal-submit" onClick={onClose}>
        확인 <span className="arrow">{"\u203A"}</span>
      </button>
    </div>
  );
}

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
import {
  ApplyModal,
  SponsorModal,
  ContactModal,
  FaqModal,
  TeamModal,
} from "@/components/modals";

export type ModalType =
  | "apply"
  | "sponsor"
  | "contact"
  | "faq"
  | "team"
  | null;

interface ModalContextValue {
  open: (type: Exclude<ModalType, null>) => void;
  close: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

const TITLES: Record<Exclude<ModalType, null>, string> = {
  apply: "신청 준비 중",
  sponsor: "스폰서 문의",
  contact: "문의하기",
  faq: "자주 묻는 질문",
  team: "팀 소개",
};

export function ModalProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<ModalType>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const open = useCallback((type: Exclude<ModalType, null>) => {
    setActive(type);
  }, []);

  const close = useCallback(() => {
    setActive(null);
  }, []);

  // ESC to close + body scroll lock while a modal is open.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // focus the close button for keyboard users.
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, close]);

  const value = useMemo<ModalContextValue>(() => ({ open, close }), [open, close]);

  return (
    <ModalContext.Provider value={value}>
      {children}
      {active && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="modal-panel" ref={panelRef}>
            <div className="modal-head">
              <p className="section-kicker">MAWD CHALLENGE</p>
              <h2 id="modal-title">{TITLES[active]}</h2>
              <button
                ref={closeRef}
                type="button"
                className="modal-close"
                aria-label="닫기"
                onClick={close}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              {active === "apply" && <ApplyModal onClose={close} />}
              {active === "sponsor" && <SponsorModal onClose={close} />}
              {active === "contact" && <ContactModal onClose={close} />}
              {active === "faq" && <FaqModal />}
              {active === "team" && <TeamModal />}
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}

export function useModal(): ModalContextValue {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return ctx;
}

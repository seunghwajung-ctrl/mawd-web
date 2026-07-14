"use client";

import { useState, type FormEvent } from "react";

interface ModalProps {
  onClose: () => void;
}

/* ── shared bits ─────────────────────────────────────────────────────────── */

function Success({ onClose, message }: { onClose: () => void; message: string }) {
  return (
    <div className="modal-success" role="status">
      <div className="modal-check" aria-hidden="true">
        ✓
      </div>
      <p className="modal-success-title">접수되었습니다</p>
      <p className="modal-success-desc">{message}</p>
      <button type="button" className="btn primary" onClick={onClose}>
        확인 <span className="arrow">›</span>
      </button>
    </div>
  );
}

function DemoNote() {
  return (
    <p className="modal-note">
      <span className="modal-note-tag">DEMO</span>
      데모 환경이라 실제로 저장되지 않습니다. 실제 신청은 오픈 후 안내된 링크로
      진행됩니다.
    </p>
  );
}

/* ── 참가 신청 ────────────────────────────────────────────────────────────── */

export function ApplyModal({ onClose }: ModalProps) {
  const [done, setDone] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDone(true);
  }

  if (done) {
    return (
      <Success
        onClose={onClose}
        message="참가 신청이 완료되었습니다. 안내 메일은 영업일 기준 2일 내 발송됩니다."
      />
    );
  }

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <p className="modal-intro">
        AI로 만들고, 투자로 검증받고, 상금과 기회를 가져가라. MAWD Challenge에
        참가신청서를 남겨주세요.
      </p>
      <div className="field">
        <label htmlFor="apply-name">이름</label>
        <input id="apply-name" name="name" required autoComplete="name" className="input" />
      </div>
      <div className="field">
        <label htmlFor="apply-email">이메일</label>
        <input
          id="apply-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="input"
        />
      </div>
      <div className="field">
        <label htmlFor="apply-team">
          팀명 <span className="optional">(선택)</span>
        </label>
        <input id="apply-team" name="team" className="input" />
      </div>
      <div className="field">
        <label htmlFor="apply-idea">아이디어 한 줄</label>
        <input
          id="apply-idea"
          name="idea"
          required
          maxLength={120}
          className="input"
          placeholder="어떤 AI 서비스를 만들고 싶나요?"
        />
      </div>
      <DemoNote />
      <button type="submit" className="btn primary modal-submit">
        참가 신청하기 <span className="arrow">›</span>
      </button>
    </form>
  );
}

/* ── 스폰서 문의 ──────────────────────────────────────────────────────────── */

export function SponsorModal({ onClose }: ModalProps) {
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

/* ── 문의하기 ─────────────────────────────────────────────────────────────── */

export function ContactModal({ onClose }: ModalProps) {
  const [done, setDone] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDone(true);
  }

  if (done) {
    return (
      <Success onClose={onClose} message="문의가 접수되었습니다. 곧 답변드리겠습니다." />
    );
  }

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <p className="modal-intro">
        참가, 스폰서, 운영 정책 등 무엇이든 문의해 주세요.
      </p>
      <div className="field">
        <label htmlFor="ct-name">이름</label>
        <input id="ct-name" name="name" required autoComplete="name" className="input" />
      </div>
      <div className="field">
        <label htmlFor="ct-email">이메일</label>
        <input
          id="ct-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="input"
        />
      </div>
      <div className="field">
        <label htmlFor="ct-msg">문의 내용</label>
        <textarea
          id="ct-msg"
          name="message"
          required
          rows={5}
          className="input textarea"
        />
      </div>
      <DemoNote />
      <button type="submit" className="btn primary modal-submit">
        문의 보내기 <span className="arrow">›</span>
      </button>
    </form>
  );
}

/* ── 로그인 / 회원가입 ─────────────────────────────────────────────────────── */

export function AuthModal({ mode, onClose }: { mode: "login" | "signup" } & ModalProps) {
  const [done, setDone] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDone(true);
  }

  if (done) {
    const msg =
      mode === "login"
        ? "데모 환경에서는 로그인 처리가 생략됩니다."
        : "데모 환경에서는 회원가입 처리가 생략됩니다.";
    return <Success onClose={onClose} message={msg} />;
  }

  const isLogin = mode === "login";

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <p className="modal-intro">
        {isLogin
          ? "MAWD Challenge 계정에 로그인합니다."
          : "MAWD Challenge 계정을 만듭니다."}
      </p>
      {!isLogin && (
        <div className="field">
          <label htmlFor="au-name">이름</label>
          <input id="au-name" name="name" required autoComplete="name" className="input" />
        </div>
      )}
      <div className="field">
        <label htmlFor="au-email">이메일</label>
        <input
          id="au-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="input"
        />
      </div>
      <div className="field">
        <label htmlFor="au-pw">비밀번호</label>
        <input
          id="au-pw"
          name="password"
          type="password"
          required
          autoComplete={isLogin ? "current-password" : "new-password"}
          className="input"
        />
      </div>
      {!isLogin && (
        <div className="field">
          <label htmlFor="au-pw2">비밀번호 확인</label>
          <input
            id="au-pw2"
            name="password2"
            type="password"
            required
            autoComplete="new-password"
            className="input"
          />
        </div>
      )}
      <DemoNote />
      <button type="submit" className="btn primary modal-submit">
        {isLogin ? "로그인" : "회원가입"} <span className="arrow">›</span>
      </button>
    </form>
  );
}

/* ── FAQ ─────────────────────────────────────────────────────────────────── */

const FAQS: { q: string; a: string }[] = [
  {
    q: "참가 자격이 어떻게 되나요?",
    a: "AI로 만들고 싶은 아이디어가 있는 팀이라면 누구나 참가할 수 있습니다. 팀 단위(1~5명) 신청을 권장합니다.",
  },
  {
    q: "AI 도구는 어떤 걸 쓰나요?",
    a: "참가자가 선택한 AI 도구를 자유롭게 사용합니다. 자기 에이전트와 업종별 서비스 결과물을 PRD와 MVP로 제출합니다.",
  },
  {
    q: "가상화폐는 실제 현금인가요?",
    a: "아닙니다. 심사위원과 기업이 결과물에 가치를 매겨 투자하는 게임용 가상머니입니다. 최종 상금과 후속 기회로 연결됩니다.",
  },
  {
    q: "팀 인원은 몇 명까지 가능한가요?",
    a: "1인부터 5인까지 참가 가능합니다. 1라운드는 비대면, 2라운드 대면 MVP 빌딩은 선발된 팀이 1박 2일간 진행합니다.",
  },
  {
    q: "스폰서는 어떻게 참여하나요?",
    a: "스폰서 문의를 통해 접수해 주세요. 우수 팀과 비즈니스 기회 발굴, 브랜드 노출, 전용 네트워킹이 제공됩니다.",
  },
];

export function FaqModal() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="modal-faq">
      <p className="modal-intro">자주 묻는 질문을 모았습니다. 추가 문의는 문의하기로 남겨주세요.</p>
      <ul className="faq-list">
        {FAQS.map((item, i) => {
          const isOpen = openIdx === i;
          return (
            <li key={i} className={`faq-item${isOpen ? " open" : ""}`}>
              <button
                type="button"
                className="faq-q"
                aria-expanded={isOpen}
                onClick={() => setOpenIdx(isOpen ? null : i)}
              >
                <span>Q.{String(i + 1).padStart(2, "0")}</span>
                <span>{item.q}</span>
                <span className="faq-toggle" aria-hidden="true">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              <div className="faq-a">
                <p>{item.a}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ── 팀 소개 ─────────────────────────────────────────────────────────────── */

export function TeamModal() {
  return (
    <div className="modal-team">
      <p className="modal-intro">
        MAWD Challenge는 만들고, 검증하고, 투자받는 실행형 AI 빌드 챌린지를
        기획·운영하는 팀입니다.
      </p>
      <div className="team-grid">
        <div className="team-card">
          <span className="team-num">01</span>
          <h3>만든다</h3>
          <p>AI 도구로 아이디어를 PRD로 정립하고 배포 가능한 MVP로 만듭니다.</p>
        </div>
        <div className="team-card">
          <span className="team-num">02</span>
          <h3>검증한다</h3>
          <p>심사위원과 기업이 결과물에 가치를 매겨 가상 투자로 검증합니다.</p>
        </div>
        <div className="team-card">
          <span className="team-num">03</span>
          <h3>연결한다</h3>
          <p>우수팀에 상금과 후속 투자, 네트워킹과 후속 프로그램을 연결합니다.</p>
        </div>
      </div>
      <p className="team-foot">Build. Prove. Earn.</p>
    </div>
  );
}

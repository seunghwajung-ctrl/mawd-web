"use client";

import { useState } from "react";

interface ModalProps {
  onClose: () => void;
}

/* ── 참가 신청 ────────────────────────────────────────────────────────────── */

export function ApplyModal({ onClose }: ModalProps) {
  return (
    <div className="sponsor-contact">
      <p className="modal-intro">
        참가 신청 폼을 준비 중입니다. 신청이 열리면 참가하기 버튼이 바로
        Google Form으로 연결됩니다.
      </p>
      <p className="modal-note">
        <span className="modal-note-tag">READY SOON</span>
        현재 화면에서는 신청 정보가 저장되지 않습니다. 운영 배포 전
        `NEXT_PUBLIC_GOOGLE_FORM_URL`을 설정하면 모든 참가 CTA가 같은 신청
        폼을 엽니다.
      </p>
      <button type="button" className="btn primary modal-submit" onClick={onClose}>
        확인 <span className="arrow">{"\u203A"}</span>
      </button>
    </div>
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
  return (
    <div className="sponsor-contact">
      <p className="modal-intro">
        참가, 스폰서, 운영 정책 문의는 아래 연락처로 부탁드립니다.
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
      <p className="modal-intro">자주 묻는 질문을 모았습니다. 추가 문의는 문의하기에서 연락처를 확인해 주세요.</p>
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

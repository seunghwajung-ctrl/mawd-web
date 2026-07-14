"use client";

import { useState } from "react";

type FaqItem = {
  q: string;
  a: string;
};

const FAQS: FaqItem[] = [
  {
    q: "참가 자격이 어떻게 되나요?",
    a: "창업 아이디어가 있지만 실행이 막혀 있던 분, 개발을 몰라도 AI 도구와 바이브 코딩으로 제품을 만들어보고 싶은 분, 자기 에이전트·업무 자동화 도구·업종별 서비스를 만들고 싶은 분, PRD·사업계획서·MVP·배포 링크·포트폴리오를 실제로 남기고 싶은 분이라면 누구나 참가할 수 있습니다. 팀 단위(1~5명) 신청을 권장합니다.",
  },
  {
    q: "개발을 못 해도 참가할 수 있나요?",
    a: "네. MAWD는 개발 실력이 아니라 아이디어를 결과물로 바꾸는 실행력을 평가합니다. AI 도구와 바이브 코딩을 활용해 비개발자도 MVP, 에이전트, 자동화 서비스를 제작할 수 있습니다. 오리엔테이션에서 함께 개발할 동료를 찾을 수도 있습니다.",
  },
  {
    q: "AI 도구는 어떤 걸 쓰나요?",
    a: "참가자가 선택한 AI 도구를 자유롭게 사용합니다. 생성형 AI, 바이브 코딩 도구, 자동화 플랫폼 등 제한이 없으며, 자기 에이전트와 업종별 서비스 결과물을 PRD와 MVP로 제출합니다.",
  },
  {
    q: "진행 방식은 어떻게 되나요?",
    a: "사전 오리엔테이션에서 아이디어를 공유하고 팀원을 찾습니다. 1라운드는 온라인으로 PRD, 사업계획서, 발표자료, 초기 산출물을 웹사이트에 업로드합니다. 심사위원과 참가자가 라이크와 가상머니로 평가한 뒤, 2라운드 진출팀이 오프라인 1박 2일 동안 MVP를 만듭니다.",
  },
  {
    q: "가상머니는 실제 현금인가요?",
    a: "아닙니다. 심사위원과 기업이 결과물에 가치를 매겨 투자하는 게임용 가상머니입니다. 가상머니는 라운드 통과 기준과 최종 상금 기준으로 사용되며, 실제 상금과 후속 기회로 연결됩니다.",
  },
  {
    q: "팀 인원은 몇 명까지 가능한가요?",
    a: "1인부터 5인까지 참가 가능합니다. 1라운드는 비대면으로 진행되며, 2라운드 대면 MVP 빌딩은 선발된 팀이 1박 2일간 진행합니다.",
  },
  {
    q: "참가하면 어떤 결과물을 얻게 되나요?",
    a: "실제 아이디어 기반 PRD, 사업계획서와 발표자료, AI 도구를 활용한 MVP 또는 자기 에이전트 제작 경험, 팀별 산출물과 배포 링크, 심사위원 및 기업의 투자형 피드백, 피어리뷰를 통한 개선 관점, 창업·취업·사이드프로젝트에 활용 가능한 포트폴리오, 링크드인에 올릴 수 있는 프로젝트 스토리를 얻게 됩니다.",
  },
];

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq">
      <div className="wrap">
        <p className="section-kicker">FAQ</p>
        <h2>자주 묻는 질문</h2>
        <p className="section-lead">
          참가 자격, 진행 방식, 평가 구조까지. 궁금한 점을 미리
          정리했습니다. 추가 문의는 문의하기로 남겨주세요.
        </p>

        <ul className="faq-list faq-list--page">
          {FAQS.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <li
                key={i}
                className={`faq-item faq-item--page${isOpen ? " open" : ""}`}
              >
                <button
                  type="button"
                  className="faq-q faq-q--page"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                >
                  <span className="faq-num">Q.{String(i + 1).padStart(2, "0")}</span>
                  <span>{item.q}</span>
                  <span className="faq-toggle" aria-hidden="true">
                    {isOpen ? "\u2212" : "+"}
                  </span>
                </button>
                <div className="faq-a faq-a--page">
                  <p>{item.a}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

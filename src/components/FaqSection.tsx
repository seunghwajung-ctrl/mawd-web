"use client";

import { useState } from "react";

type FaqItem = {
  q: string;
  a: string;
};

// TODO(copy): 다봉 초안(b2b-zone-copy.md §5). 대표 승인 전. 3·4·5번 답은 대표 확인 필요.
const FAQS: FaqItem[] = [
  {
    q: "어떤 곳이 문의할 수 있나요?",
    a: "기업, 기관, 학교 모두 문의할 수 있습니다.",
  },
  {
    q: "어떤 행사를 맡아 주나요?",
    a: "해커톤을 비롯한 AI 프로그램을 기획하고 운영합니다. 구체적인 형태와 범위는 상담에서 함께 정합니다.",
  },
  {
    q: "문의하면 어떻게 진행되나요?",
    a: "도입하기 양식에 행사 유형과 예상 시기 등을 남겨 주시면 팀 마우드가 내용을 확인하고 연락드립니다. 자세한 일정과 범위는 이후 상담에서 정합니다.",
  },
  {
    q: "비용은 어떻게 되나요?",
    a: "정해진 금액을 이 페이지에 적지 않았습니다. 행사 목적과 범위를 확인한 뒤 상담에서 안내드립니다.",
  },
  {
    q: "준비 기간은 얼마나 필요한가요?",
    a: "행사 성격에 따라 달라집니다. 양식에 예상 시기를 적어 주시면 그 일정을 보고 상담합니다.",
  },
  {
    q: "공동 주최도 가능한가요?",
    a: "가능합니다. 마우드는 외부 협력과 공동 주최를 적극적으로 하고 있습니다.",
  },
  {
    q: "스폰서나 제휴는 어떻게 하나요?",
    a: "아래 '스폰서·제휴 문의' 버튼으로 문의해 주세요. 스폰서는 자사 서비스를 참가자에게 알리고 제공할 수 있습니다.",
  },
  {
    q: "보낸 문의 내용은 어디에 쓰이나요?",
    a: "도입 상담에만 쓰고, 문의를 처리하는 동안만 보관합니다. 자세한 내용은 개인정보처리방침에서 확인하실 수 있습니다.",
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
          도입과 제휴에 대해 자주 받는 질문입니다. 여기에 없는 내용은 문의로 남겨 주세요.
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

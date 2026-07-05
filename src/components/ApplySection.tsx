"use client";

import { useModal } from "@/components/ModalProvider";

export function ApplySection() {
  const { open } = useModal();

  return (
    <section id="apply" className="apply">
      <div className="wrap apply-box">
        <div>
          <p className="section-kicker">FINAL STAGE</p>
          <h2>아이디어가 있다면, 이번엔 말보다 결과물로 증명해보세요</h2>
          <p className="section-lead">
            MAWD Challenge는 만들고, 등록하고, 검증받고, 투자받는 실행형 AI 빌드
            챌린지입니다. 참가자와 스폰서 모두 실제 결과물을 기준으로 만납니다.
          </p>
        </div>
        <div className="btn-row">
          <button
            type="button"
            className="btn primary"
            onClick={() => open("apply")}
          >
            참가 신청 <span className="arrow">›</span>
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => open("sponsor")}
          >
            스폰서 문의 <span className="arrow">›</span>
          </button>
        </div>
      </div>
    </section>
  );
}

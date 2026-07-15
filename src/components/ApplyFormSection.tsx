"use client";

import { useSponsorModal } from "@/components/SponsorModalProvider";
import { GOOGLE_FORM_URL } from "@/lib/form-config";

export function ApplyFormSection() {
  const { openSponsorModal } = useSponsorModal();

  return (
    <section id="apply" className="apply-form-section">
      <div className="wrap">
        <div className="apply-form-head">
          <p className="section-kicker">APPLY NOW</p>
          <h2>아이디어가 있다면, 이번엔 말보다 결과물로 증명해보세요</h2>
          <p className="section-lead">
            MAWD Challenge는 만들고, 등록하고, 검증받고, 투자받는 실행형 AI 빌드
            챌린지입니다.
          </p>
        </div>

        <div className="btn-row" role="group" aria-label="참가 및 문의">
          <a
            className="btn primary"
            href={GOOGLE_FORM_URL}
          >
            참가 신청 <span className="arrow">{"\u203A"}</span>
          </a>
          <button
            type="button"
            className="btn"
            onClick={openSponsorModal}
          >
            스폰서 문의 <span className="arrow">{"\u203A"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}

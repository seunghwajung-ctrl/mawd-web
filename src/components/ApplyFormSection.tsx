"use client";

import { useSponsorModal } from "@/components/SponsorModalProvider";

export function ApplyFormSection() {
  const { openSponsorModal } = useSponsorModal();

  return (
    <section id="apply" className="apply-form-section">
      <div className="wrap">
        <div className="apply-form-head">
          {/* TODO(copy): 다봉 초안(b2b-zone-copy.md §6). 대표 승인 전. CONTACT는 제안 */}
          <p className="section-kicker">CONTACT</p>
          <h2>우리 행사에 AI를 더하고 싶으신가요</h2>
          <p className="section-lead">
            대략적인 구상만 있어도 괜찮습니다. 양식을 남겨 주시면 팀 마우드가 확인합니다.
          </p>
        </div>

        <div className="btn-row" role="group" aria-label="도입 및 스폰서·제휴 문의">
          <a className="btn" href="/inquiry">
            도입하기 <span className="arrow">{"\u203A"}</span>
          </a>
          <button
            type="button"
            className="btn"
            onClick={openSponsorModal}
          >
            스폰서·제휴 문의 <span className="arrow">{"\u203A"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}

"use client";

import { GOOGLE_FORM_URL } from "@/lib/form-config";
import { useModal } from "@/components/ModalProvider";

function openGoogleForm() {
  if (!GOOGLE_FORM_URL) {
    alert("신청 폼이 아직 열리지 않았습니다. 곧 오픈 예정입니다.");
    return;
  }
  const popup = window.open(
    GOOGLE_FORM_URL,
    "mawd-apply",
    "width=640,height=800,scrollbars=yes,resizable=yes"
  );
  if (!popup) {
    window.open(GOOGLE_FORM_URL, "_blank", "noopener,noreferrer");
  }
}

export function ApplyFormSection() {
  const { open } = useModal();

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
          <button
            type="button"
            className="btn primary"
            onClick={openGoogleForm}
          >
            참가 하기 <span className="arrow">{"\u203A"}</span>
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => open("sponsor")}
          >
            스폰서 문의 <span className="arrow">{"\u203A"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}

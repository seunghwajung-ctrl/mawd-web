type FlowStep = {
  num: string;
  label: string;
  icon: string;
  final?: boolean;
};

const flowSteps: FlowStep[] = [
  { num: "01", label: "모집", icon: "▤" },
  { num: "02", label: "오리엔테이션", icon: "⚑" },
  { num: "03", label: "1라운드", icon: "♜" },
  { num: "04", label: "라이크 심사", icon: "♥" },
  { num: "05", label: "2라운드", icon: "⬡" },
  { num: "06", label: "시상", icon: "★", final: true },
];

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="burst" aria-hidden="true" />
      <div className="wrap hero-layout">
        <aside className="hud" aria-label="챌린지 상태판">
          <div className="hud-panel">
            <span className="hud-label">1P MAWD_BUILDER</span>
            <span className="score">003750</span>
          </div>
          <div className="hud-panel">
            <span className="hud-label">PLAYER</span>
            <div className="hearts" role="img" aria-label="라이프 3개">
              ♥ ♥ ♥
            </div>
          </div>
          <div className="hud-panel">
            <span className="hud-label">ENERGY</span>
            <div className="energy" aria-hidden="true" />
          </div>
        </aside>

        <div className="hero-main">
          <div className="stage-row" role="group" aria-label="현재 스테이지">
            <div className="stage-chip">
              STAGE<b>04</b>
            </div>
            <div className="stage-chip">
              LEVEL<b>UP</b>
            </div>
          </div>
          <h1 id="hero-title">MAWD</h1>
          <p className="challenge">CHALLENGE</p>
          <p className="headline">
            <em>AI</em>로 만들고, <em>투자</em>로 검증받고, <em>상금과 기회</em>를
            가져가라
          </p>
          <p className="lead">
            자기 에이전트와 업종별 서비스를 만들어 성과를 증명하는 AI 빌드
            챌린지. 아이디어를 말로 끝내지 않고, 결과물과 MVP로 인정받습니다.
          </p>
          <div className="btn-row" role="group" aria-label="주요 행동">
            <a className="btn primary" href="#apply">
              참가 신청 <span className="arrow">›</span>
            </a>
            <a className="btn" href="#benefits">
              스폰서 문의 <span className="arrow">›</span>
            </a>
          </div>
          <p className="sr-only">프로그램 흐름</p>
          <ul className="flow-band">
            {flowSteps.map((step) => (
              <li
                key={step.num}
                className={`flow-card${step.final ? " final" : ""}`}
              >
                <b>{step.num}</b>
                <span>{step.label}</span>
                <span className="flow-icon">{step.icon}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="sticker-wall" aria-label="챌린지 포스터">
          <div className="sticker one">
            <strong>
              일단
              <br />
              만들어봐
              <br />
              결과로
              <br />
              증명해봐
            </strong>
            <small>MAWD CHALLENGE</small>
          </div>
          <div className="sticker two">
            <strong>
              MAKE
              <br />
              AI WORK
              <br />
              FOR YOU
            </strong>
            <small>BUILD. PROVE. EARN.</small>
          </div>
          <div className="badge">
            KEEP
            <br />
            BUILDING
          </div>
        </aside>
      </div>
    </section>
  );
}

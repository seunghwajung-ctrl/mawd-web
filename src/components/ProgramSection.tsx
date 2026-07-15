const rounds = [
  {
    tag: "ROUND 1",
    title: "PRD+ 검증용 프로토타입 업로드",
    desc: "완성된 서비스가 아니라 아이디어의 문제, 해결 방식, 화면 흐름, 핵심 기능 구조를 보여주는 서비스 골격을 제출합니다.",
  },
  {
    tag: "LIKE JUDGE",
    title: "심사위원·참가자들의 가상 투자",
    desc: "참가자들도 심사위원이 되어 가능성과 실행력을 기준으로 가상머니가 투자되고 일부 팀은 탈락합니다.",
  },
  {
    tag: "ROUND 02",
    title: "대면 MVP 빌딩",
    desc: "선발된 팀이 1박 2일 동안 검증용 프로토타입을 작동 가능한 MVP에 가깝게 발전시키고 피어리뷰와 최종 심사를 받습니다.",
  },
  {
    tag: "AWARD",
    title: "시상",
    desc: "라운드에서 가상머니로 투자받은 만큼 상금으로 환산하여 지급합니다.",
  },
] as const;

export function ProgramSection() {
  return (
    <section id="program">
      <div className="wrap split">
        <div>
          <p className="section-kicker">PROGRAM QUEST</p>
          <h2>두 번의 라운드로 검증하세요.</h2>
          <p className="section-lead">
            초반에는 방향을 빠르게 잡고, 후반에는 살아남은 팀이 더 깊게
            만들어냅니다. 매 라운드의 산출물은 참가자 전용 프로그램에 등록되어
            평가됩니다.
          </p>
        </div>
        <div className="program-panel">
          {rounds.map((r, i) => (
            <div key={i} className="round">
              <span className="tag">{r.tag}</span>
              <div>
                <b>{r.title}</b>
                <p>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

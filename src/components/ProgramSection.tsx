const rounds = [
  {
    tag: "ROUND\n01",
    title: "툴 세팅 + PRD 제작",
    desc: "검증용 프로토타입, 문제정의, 실행계획을 완성합니다.",
  },
  {
    tag: "UPLOAD",
    title: "전용 프로그램 등록",
    desc: "팀별 산출물을 링크로 제출하고, 진행 상황을 공개 가능한 형태로 정리합니다.",
  },
  {
    tag: "LIKE\nJUDGE",
    title: "심사위원·기업 가상 투자",
    desc: "가능성과 실행력을 기준으로 가상머니가 투자되고 일부 팀은 탈락합니다.",
  },
  {
    tag: "ROUND\n02",
    title: "대면 MVP 빌딩",
    desc: "선발된 팀이 1박 2일 동안 MVP를 만들고 피어리뷰와 최종 심사를 받습니다.",
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
          <h2>두 번의 라운드로 아이디어를 서비스에 가깝게 밀어붙입니다</h2>
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

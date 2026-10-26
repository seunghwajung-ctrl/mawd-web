const rounds = [
  {
    tag: "STEP 01",
    title: "오리엔테이션",
    desc: "아이디어를 공유하고 팀과 방향을 정합니다.",
  },
  {
    tag: "STEP 02",
    title: "1라운드",
    desc: "PRD와 검증용 프로토타입을 제출합니다.",
  },
  {
    tag: "STEP 03",
    title: "2라운드",
    desc: "선발팀이 MVP를 만들고 피드백을 받습니다.",
  },
  {
    tag: "STEP 04",
    title: "최종 공유",
    desc: "결과물을 발표하고 포트폴리오로 정리합니다.",
  },
] as const;

export function ProgramSection() {
  return (
    <section id="program">
      <div className="wrap split">
        <div>
          <p className="section-kicker">PROGRAM QUEST</p>
          <h2>진행일정은 4단계로 짧게 갑니다.</h2>
          <p className="section-lead">
            처음엔 방향을 잡고, 마지막엔 실제 결과물을 보여줍니다.
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

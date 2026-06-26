const missions = [
  {
    num: "01",
    title: "아이디어를 PRD로",
    desc: "문제, 고객, 솔루션, 실행 계획을 문서화해 팀의 방향을 선명하게 만듭니다.",
  },
  {
    num: "02",
    title: "AI로 실제 MVP 제작",
    desc: "자기 에이전트와 서비스 결과물을 만들고 배포 가능한 링크로 등록합니다.",
  },
  {
    num: "03",
    title: "투자 게임으로 검증",
    desc: "심사위원과 기업이 가능성을 보고 투자합니다. 발표보다 결과가 중요합니다.",
  },
] as const;

export function ChallengeSection() {
  return (
    <section id="challenge">
      <div className="wrap">
        <p className="section-kicker">BUILD · PROVE · EARN</p>
        <h2>
          창업 교육처럼 듣고 끝나는 행사가 아니라, 결과물이 남는 빌드
          게임입니다
        </h2>
        <p className="section-lead">
          MAWD는 참가자가 AI 도구로 PRD와 MVP를 만들고, 심사위원과 기업이 그
          결과물에 가상머니로 투자하는 방식입니다. 받은 가상머니는 최종 상금과
          후속 기회로 연결됩니다.
        </p>
        <div className="mission-grid">
          {missions.map((m) => (
            <article key={m.num} className="mission-card">
              <span className="num">{m.num}</span>
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

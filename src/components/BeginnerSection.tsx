type OkItem = {
  title: string;
  desc: string;
};

const okItems: OkItem[] = [
  {
    title: "개발 경험이 없어도",
    desc: "MAWD는 이미 잘하는 사람만 모이는 자리가 아니라, 처음 시도하는 사람들이 함께 실험하고 배우는 프로젝트입니다.",
  },
  {
    title: "지금 당장 창업을 생각하지 않아도",
    desc: "창업을 안 해도 괜찮습니다. 중요한 건 앞으로의 시대에 필요한 감각을 먼저 경험해보는 것입니다.",
  },
  {
    title: "AI를 처음 써봐도",
    desc: "AI 역량은 책이나 강의만으로 쌓이기 어렵습니다. 직접 아이디어를 꺼내고, 도구를 써보고, 작게라도 결과물을 만들어보는 과정에서 가장 빠르게 늘어납니다.",
  },
];

const gains: string[] = [
  "내가 가진 문제를 AI로 풀어보는 경험",
  "다양한 분야의 사람들과 교류하는 시간",
  "협업을 통해 아이디어를 발전시키는 과정",
  "전공·업무·커리어에 연결할 수 있는 AI 활용 경험",
];

export function BeginnerSection() {
  return (
    <section id="beginner">
      <div className="wrap">
        <p className="section-kicker">WHO CAN JOIN</p>
        <h2>개발을 해본 적 없어도 참가할 수 있습니다</h2>
        <p className="section-lead">
          MAWD에서 가져갈 수 있는 것은 단순한 완성작 하나가 아닙니다. 부담보다
          경험을 가져가세요.
        </p>

        <div className="beginner-ok-grid">
          {okItems.map((item, i) => (
            <article key={i} className="beginner-ok-card">
              <span className="beginner-ok-icon">{"\u2713"}</span>
              <h3>{item.title} <span className="beginner-ok-suffix">괜찮습니다</span></h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>

        <div className="beginner-gains">
          <div className="beginner-gains-head">
            <h3>MAWD에서 가져가는 것</h3>
            <span className="beginner-free">
              <b>참가비 무료</b>
            </span>
          </div>
          <ul className="beginner-gains-list">
            {gains.map((g, i) => (
              <li key={i}>{g}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

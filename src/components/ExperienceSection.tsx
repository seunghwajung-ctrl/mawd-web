type Gain = {
  num: string;
  icon: string;
  title: string;
  desc: string;
};

const gains: Gain[] = [
  {
    num: "01",
    icon: "🔍",
    title: "문제를 AI로 풀어보는 경험",
    desc: "내가 가진 문제를 발견하고, AI와 함께 구체적인 결과물로 바꿔보는 경험. 이것이 책이나 강의만으로는 쌓을 수 없는 역량입니다.",
  },
  {
    num: "02",
    icon: "🤝",
    title: "다양한 분야의 사람들과 교류하는 시간",
    desc: "전공, 경험, 관심사가 다른 사람들이 모여 아이디어를 나눕니다. 다른 사람과 이야기하고, 도구를 써보는 과정에서 AI 역량이 가장 빠르게 늡니다.",
  },
  {
    num: "03",
    icon: "⚙️",
    title: "협업을 통해 아이디어를 발전시키는 과정",
    desc: "혼자서는 만들기 어려운 아이디어를 팀원과 함께 다듬어갑니다. 아이디어를 꺼내고, 공유하고, 발전시키는 협업의 경험을 쌓습니다.",
  },
  {
    num: "04",
    icon: "🚀",
    title: "전공·업무·커리어에 연결되는 AI 활용 경험",
    desc: "앞으로의 전공, 업무, 커리어에 직접 연결할 수 있는 AI 활용 경험. 완성작 하나가 아니라, 앞으로의 시대에 필요한 감각을 먼저 경험합니다.",
  },
];

export function ExperienceSection() {
  return (
    <section id="experience">
      <div className="wrap">
        <p className="section-kicker">BEYOND THE PRODUCT</p>
        <h2>MAWD에서 가져갈 수 있는 것은 단순한 완성작 하나가 아닙니다</h2>
        <p className="section-lead">
          AI 역량은 책이나 강의만으로 쌓이기 어렵습니다. 직접 아이디어를
          꺼내고, 다른 사람과 이야기하고, 도구를 써보고, 작게라도 결과물을
          만들어보는 과정에서 가장 빠르게 늘어납니다.
        </p>

        <div className="exp-layout">
          <div className="exp-grid">
            {gains.map((g, i) => (
              <article key={i} className="exp-card">
                <span className="exp-num">{g.num}</span>
                <span className="exp-icon" aria-hidden="true">{g.icon}</span>
                <h3>{g.title}</h3>
                <p>{g.desc}</p>
              </article>
            ))}
          </div>

          <aside className="quest-map" aria-label="참가자가 MAWD에서 얻는 흐름">
            <div className="quest-node active">
              <span>START</span>
              <b>내 문제 찾기</b>
            </div>
            <div className="quest-line" />
            <div className="quest-node">
              <span>CO-OP</span>
              <b>팀 아이디어 확장</b>
            </div>
            <div className="quest-line" />
            <div className="quest-node boss">
              <span>RESULT</span>
              <b>포트폴리오 결과물</b>
            </div>
          </aside>
        </div>

        <div className="exp-cta">
          <p>
            중요한 건 앞으로의 시대에 필요한 감각을{" "}
            <span className="exp-highlight">먼저 경험해보는 것</span>입니다.
          </p>
        </div>
      </div>
    </section>
  );
}

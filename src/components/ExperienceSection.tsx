type Gain = {
  num: string;
  title: string;
  desc: string;
};

const gains: Gain[] = [
  {
    num: "01",
    title: "PRD",
    desc: "문제, 대상, 핵심 기능을 한 장으로 정리합니다.",
  },
  {
    num: "02",
    title: "프로토타입",
    desc: "화면 흐름과 사용 장면을 빠르게 보여줍니다.",
  },
  {
    num: "03",
    title: "MVP",
    desc: "핵심 기능이 작동하는 첫 제품으로 발전시킵니다.",
  },
  {
    num: "04",
    title: "포트폴리오",
    desc: "배포 링크와 제작 과정을 남겨 다음 기회에 씁니다.",
  },
];

export function ExperienceSection() {
  return (
    <section id="experience">
      <div className="wrap">
        <p className="section-kicker">OUTPUT FIRST</p>
        <h2>먼저 남길 결과물을 분명하게 보여줍니다</h2>

        <div className="exp-grid">
          {gains.map((g, i) => (
            <article key={i} className="exp-card">
              <span className="exp-num">{g.num}</span>
              <h3>{g.title}</h3>
              <p>{g.desc}</p>
            </article>
          ))}
        </div>

        <div className="exp-cta">
          <p>
            아이디어를 말로만 끝내지 않고{" "}
            <span className="exp-highlight">보이는 결과물</span>로 남깁니다.
          </p>
        </div>
      </div>
    </section>
  );
}

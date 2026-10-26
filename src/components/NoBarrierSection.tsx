type Barrier = {
  icon: string;
  title: string;
  ok: string;
  desc: string;
};

const barriers: Barrier[] = [
  {
    icon: "\u2715",
    title: "자본의 부담",
    ok: "참가비는 무료입니다",
    desc: "비용보다 실행 경험에 집중합니다.",
  },
  {
    icon: "\u2715",
    title: "개발 경험의 부담",
    ok: "개발을 해본 적 없어도 괜찮습니다",
    desc: "AI 도구와 팀으로 첫 결과물을 만듭니다.",
  },
  {
    icon: "\u2715",
    title: "시간의 부담",
    ok: "단기간 안에 실현하세요",
    desc: "짧은 일정 안에 핵심만 완성합니다.",
  },
];

export function NoBarrierSection() {
  return (
    <section id="no-barrier">
      <div className="wrap">
        <p className="section-kicker">NO BARRIER</p>
        <h2>시작 장벽을 낮췄습니다.</h2>
        <p className="section-lead">
          돈, 개발 경험, 긴 준비 기간이 없어도 시작할 수 있습니다.
        </p>

        <div className="barrier-grid">
          {barriers.map((b, i) => (
            <article key={i} className="barrier-card">
              <div className="barrier-head">
                <span className="barrier-icon" aria-hidden="true">{b.icon}</span>
                <span className="barrier-title-strike">{b.title}</span>
              </div>
              <h3 className="barrier-ok">{b.ok}</h3>
              <p>{b.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

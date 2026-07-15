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
    desc: "청년이 창업을 도전하기 위해 가장 먼저 마주하는 자본의 벽. 자본이 없어도 아이디어를 결과물로 만드는 경험 자체를 가져가게 합니다.",
  },
  {
    icon: "\u2715",
    title: "개발 경험의 부담",
    ok: "개발을 해본 적 없어도 괜찮습니다",
    desc: "MAWD는 이미 잘하는 사람만 모이는 자리가 아니라, 처음 시도하는 사람들이 함께 실험하고 배우는 프로젝트입니다.",
  },
  {
    icon: "\u2715",
    title: "시간의 부담",
    ok: "지금 당장 창업을 생각하지 않아도 괜찮습니다",
    desc: "중요한 건 앞으로의 시대에 필요한 감각을 먼저 경험해보는 것입니다. 부담보다 경험을 가져가세요.",
  },
];

export function NoBarrierSection() {
  return (
    <section id="no-barrier">
      <div className="wrap">
        <p className="section-kicker">NO BARRIER</p>
        <h2>창업의 문턱, 자본과 시간의 부담을 없앴습니다</h2>
        <p className="section-lead">
          청년이 창업을 도전하기에 느끼는 가장 큰 장벽은 자본과 시간, 그리고
          경험의 부족입니다. MAWD는 이 세 가지 부담을 먼저 거둬냅니다.
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

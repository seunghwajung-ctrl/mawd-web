type Stat = {
  value: string;
  label: string;
  source: string;
};

const stats: Stat[] = [
  {
    value: "25%",
    label: "2026년 3월, 미국 전체 해고의 25%가 AI가 직접 원인",
    source: "SHRM Automation/AI Survey 2026",
  },
  {
    value: "93%",
    label: "전 직종의 93%가 AI 영향권. 기존 예상보다 6년 앞당겨짐",
    source: "Cognizant New Work New World 2026",
  },
  {
    value: "55%",
    label: "향후 2~3년 내 미국 일자리의 55%가 AI로 재구성",
    source: "BCG AI Labor Report 2026",
  },
  {
    value: "20%",
    label: "2024년 이후 22~25세 소프트웨어 개발자 고용 20% 감소",
    source: "Stanford HAI AI Index 2026",
  },
  {
    value: "99%",
    label: "경영진 99%가 2년 내 AI로 인한 감원을 예상",
    source: "Mercer Global Talent Trends 2026",
  },
];

export function ProblemSection() {
  return (
    <section id="problem">
      <div className="wrap">
        <p className="section-kicker">THE PROBLEM</p>
        <h2>AI를 배웠다는 말보다, 만든 결과물이 더 강한 증거</h2>
        <p className="section-lead">
          AI는 일자리를 단순히 없애는 기술이 아닙니다. 직무 구조와 필요한
          역량을 빠르게 바꾸는 기술입니다. 기업은 이제 &ldquo;무엇을 만들 수
          있는가&rdquo;, &ldquo;AI로 어떤 문제를 해결했는가&rdquo;,
          &ldquo;실제 결과물이 있는가&rdquo;를 묻습니다.
        </p>

        <div className="stat-grid">
          {stats.map((s, i) => (
            <article key={i} className="stat-card">
              <b className="stat-value">{s.value}</b>
              <p className="stat-label">{s.label}</p>
              <span className="stat-source">{s.source}</span>
            </article>
          ))}
        </div>

        <div className="problem-cta">
          <p className="problem-quote">
            중요한 질문은 <span className="strike">&ldquo;AI가 일자리를 없앨까?&rdquo;</span>가
            아니라,
          </p>
          <p className="problem-quote highlight">
            &ldquo;AI가 바꾸는 직무 환경에서 나는 무엇을 직접 만들 수 있는가?&rdquo;
          </p>
          <p className="problem-foot">
            자기 에이전트, 자동화 서비스, MVP, 산업별 도구를 직접 만들어본
            사람은 AI를 단순 사용자가 아니라 문제 해결 도구로 이해하게 됩니다.
          </p>
        </div>
      </div>
    </section>
  );
}

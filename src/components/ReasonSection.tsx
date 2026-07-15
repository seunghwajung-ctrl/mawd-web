type Company = {
  name: string;
  year: string;
  desc: string;
};

const companies: Company[] = [
  {
    name: "SK하이닉스",
    year: "2026",
    desc: "신입 수시채용부터 '4년제 학사 이상' 학력 요건 전면 삭제. 직무 역량과 성장 가능성 중심 선발.",
  },
  {
    name: "삼성",
    year: "1995",
    desc: "국내 대기업 최초로 공채에서 학력·국적·성별·나이·연고 제한 폐지. 30년간 '열린 채용' 유지.",
  },
  {
    name: "카카오",
    year: "2017",
    desc: "학력·전공·나이·성별을 받지 않는 블라인드 코딩테스트 도입. 오직 개발 역량으로만 평가.",
  },
  {
    name: "Google",
    year: "2018",
    desc: "세르게이 브린 \"학위 없는 사람 수도 없이 채용한다\". 학력 필수 공석이 93%에서 77%로 감소.",
  },
];

const messages = [
  {
    tag: "RECRUITMENT",
    title: "학력보다 결과물이 더 직접적인 스펙",
    desc: "주요 기업의 채용 흐름은 점점 더 학력보다 실전 역량, 문제 해결 경험, 프로젝트 결과물을 중시하는 방향으로 이동하고 있습니다. 이 흐름 속에서 AI 프로젝트 결과물은 명문대 졸업장보다 더 직접적인 역량 증거로 작용할 수 있습니다.",
  },
  {
    tag: "POST-APP ERA",
    title: "앱을 쓰는 사람에서 에이전트를 만드는 사람으로",
    desc: "일론 머스크는 Joe Rogan Experience에서 미래에는 사용자가 개별 앱을 직접 열기보다 AI를 통해 원하는 것을 얻는 방향으로 인터페이스가 바뀔 수 있다고 말했습니다. 중요한 역량은 앱을 사용하는 능력이 아니라, 내 문제를 해결하는 에이전트와 서비스를 직접 설계하고 만드는 능력입니다.",
  },
];

export function ReasonSection() {
  return (
    <section id="reason">
      <div className="wrap">
        <p className="section-kicker">WHY MAWD NOW</p>
        <h2>학력보다 강한 스펙, AI 프로젝트 결과물</h2>
        <p className="section-lead">
          기업은 &ldquo;어느 학교를 나왔는가&rdquo;보다 &ldquo;AI로 무엇을
          만들었는가&rdquo;를 더 직접적인 역량 증거로 봅니다. MAWD는 참가자가
          자신의 AI 프로젝트 결과물을 포트폴리오, 발표자료, 링크드인 콘텐츠,
          채용·창업·협업 기회로 전환할 수 있게 돕습니다.
        </p>

        <div className="company-grid">
          {companies.map((c, i) => (
            <article key={i} className="company-card">
              <div className="company-head">
                <b className="company-name">{c.name}</b>
                <span className="company-year">{c.year}</span>
              </div>
              <p className="company-desc">{c.desc}</p>
            </article>
          ))}
        </div>

        <div className="message-grid">
          {messages.map((m, i) => (
            <article key={i} className="message-card">
              <span className="message-tag">{m.tag}</span>
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
            </article>
          ))}
        </div>

        <div className="reason-cta">
          <p className="reason-pull">
            <span className="reason-arrow">▶</span>
            아이디어를 말하지 말고, 만들고 보여주세요.
          </p>
        </div>
      </div>
    </section>
  );
}

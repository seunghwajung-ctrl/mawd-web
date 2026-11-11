// TODO(copy): 다봉 초안(b2b-zone-copy.md §1·2·4). 대표 승인 전. 남은 확인:
// 영문 작은 제목 제안(EVENT OPERATION, PARTNERSHIP), 서비스 카드 범위, 참여사 9곳 공개·로고 동의.

const TEAM_PARAGRAPHS = [
  "마우드는 MICE 전문 운영그룹이자 AI 팀프로젝트 커뮤니티입니다.",
  "자체 해커톤 MAWD CHALLENGE와 MAWD START-UP CHALLENGE를 직접 주최하고, 기관·기업·학교의 AI 프로그램을 기획하고 운영합니다. 외부 협력에 적극적이며 공동 주최도 함께합니다.",
  "AI 스터디, 워크샵, 세미나, 해커하우스 등 다음으로 향하는 프로그램을 함께 만들어갑니다.",
];

const SERVICES = [
  { title: "기획", text: "대상과 목적에 맞는 프로그램 구조를 함께 짭니다." },
  { title: "운영", text: "행사 진행과 현장 운영을 맡습니다." },
  { title: "협력", text: "단독 운영뿐 아니라 공동 주최로도 함께합니다." },
];

const PARTNER_BENEFITS = [
  { title: "서비스 소개와 제공", text: "참가자가 스폰서의 서비스를 직접 써 보도록 알리고 제공합니다." },
  { title: "브랜딩", text: "행사와 함께 브랜드가 노출됩니다." },
  { title: "고객 유치", text: "서비스를 써 본 참가자가 고객이 될 수 있습니다." },
  { title: "청년 지원", text: "대학생·청년의 AI 역량과 창업을 돕는 데 함께합니다." },
];

export function TeamMawdSection() {
  return (
    <section id="team">
      <div className="wrap">
        <p className="section-kicker">TEAM MAWD</p>
        <h2>AI 행사를 설계하고 운영하는 팀, 마우드</h2>
        {TEAM_PARAGRAPHS.map((text) => (
          <p key={text} className="section-lead">{text}</p>
        ))}
      </div>
    </section>
  );
}

export function EventServiceSection() {
  return (
    <section id="services">
      <div className="wrap">
        <p className="section-kicker">EVENT OPERATION</p>
        <h2>기획부터 운영까지, 행사를 함께 만듭니다</h2>
        <p className="section-lead">
          해커톤을 비롯한 AI 프로그램을 기획하고 운영합니다. 어떤 범위까지 맡을지는 상담에서 행사 목적에 맞춰 함께 정합니다.
        </p>
        <div className="mission-grid">
          {SERVICES.map((s, i) => (
            <article key={s.title} className="mission-card">
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PartnerBenefitsSection() {
  return (
    <section id="partners">
      <div className="wrap">
        <p className="section-kicker">PARTNERSHIP</p>
        <h2>청년의 AI 도전에 함께하고, 우리 서비스를 알리세요</h2>
        <p className="section-lead">
          마우드의 스폰서는 자사 서비스를 참가자에게 직접 알리고 제공합니다. 동시에 대학생과 청년의 AI 역량, 청년창업을
          지원하는 일에 함께합니다.
        </p>
        <div className="benefits">
          {PARTNER_BENEFITS.map((b) => (
            <article key={b.title} className="benefit sponsor">
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </article>
          ))}
        </div>
        <p className="section-lead partners-list">
          채널톡, 스티비, 아정당, Vapi AI, Zetic AI, Articul8, Liner, Alt, Readray와 함께합니다.
        </p>
      </div>
    </section>
  );
}

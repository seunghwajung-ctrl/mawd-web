// TODO(copy): 이 파일의 문구는 모두 임시 문구다. 다봉 최종 문구(b2b-zone-copy.md)로 교체한다 (#9).

const TEAM_CARDS = [
  { title: "비전", text: "해커톤에서 시작한 아이디어가 해커하우스를 거쳐 스타트업으로 이어지는 길을 만듭니다." },
  { title: "목적", text: "대학생과 청년이 AI로 직접 만들고 검증하며 실전 역량을 쌓도록 돕습니다." },
  { title: "소개", text: "MAWD는 MICE 전문 운영그룹이자 AI 팀프로젝트 커뮤니티입니다." },
];

const SERVICES = [
  { title: "해커톤 운영", items: ["기획부터 현장 운영까지 전 과정 대행", "MAWD CHALLENGE 운영 경험 기반 진행", "공동주최·협업 형태도 가능"] },
  { title: "AI 행사·교육 운영", items: ["기관·기업·학교 맞춤 AI 프로그램 기획", "AI 스터디·소그룹 운영", "목적에 맞춘 행사 형식 설계"] },
];

const PARTNER_BENEFITS = [
  { title: "브랜딩", items: ["참가자에게 자사 서비스 소개", "행사 안팎 홍보 채널 노출"] },
  { title: "고객 유치", items: ["참가자에게 서비스 직접 제공", "청년 AI 역량·청년창업 지원에 함께 참여"] },
];

export function TeamMawdSection() {
  return (
    <section id="team">
      <div className="wrap">
        <p className="section-kicker">TEAM MAWD</p>
        <h2>함께 만들고, 끝까지 이어가는 팀</h2>
        <div className="mission-grid">
          {TEAM_CARDS.map((card, i) => (
            <article key={card.title} className="mission-card">
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EventServiceSection() {
  return (
    <section id="services">
      <div className="wrap">
        <p className="section-kicker">EVENT SERVICE</p>
        <h2>해커톤·AI 행사 운영</h2>
        <div className="benefits">
          {SERVICES.map((s) => (
            <article key={s.title} className="benefit">
              <h3>{s.title}</h3>
              <ul>{s.items.map((item) => <li key={item}>{item}</li>)}</ul>
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
        <p className="section-kicker">SPONSOR &amp; PARTNERSHIP</p>
        <h2>스폰서·제휴 혜택</h2>
        <div className="benefits">
          {PARTNER_BENEFITS.map((b) => (
            <article key={b.title} className="benefit sponsor">
              <h3>{b.title}</h3>
              <ul>{b.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

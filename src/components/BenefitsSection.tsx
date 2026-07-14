export function BenefitsSection() {
  return (
    <section id="benefits">
      <div className="wrap">
        <p className="section-kicker">REWARD TABLE</p>
        <h2>
          참가자는 상금과 투자 기회를, 스폰서는 우수 팀과 기술 트렌드를 얻습니다
        </h2>
        <div className="benefits">
          <article className="benefit">
            <h3><span aria-hidden="true">🎮</span> 참가자 혜택</h3>
            <ul>
              <li>총 상금 및 후속 투자 기회</li>
              <li>멘토링 및 전문가 코칭</li>
              <li>클라우드 크레딧 지원</li>
              <li>우수팀 후속 프로그램 연계</li>
              <li>네트워킹과 커뮤니티 연결</li>
            </ul>
          </article>
          <article className="benefit sponsor">
            <h3><span aria-hidden="true">🤝</span> 스폰서 혜택</h3>
            <ul>
              <li>브랜드 노출과 인지도 강화</li>
              <li>우수팀과 비즈니스 기회 발굴</li>
              <li>AI 기술 트렌드 선제적 점검</li>
              <li>채용 연계 및 인재 발굴</li>
              <li>스폰서 전용 네트워킹</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

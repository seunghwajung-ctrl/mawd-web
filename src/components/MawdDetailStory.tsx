const pillars = [
  {
    title: "왜 필요한가",
    body: "개발 경험이 부족해도 생성형 AI와 바이브 코딩 도구로 아이디어를 실제 결과물까지 만들 수 있는 시대가 열렸습니다.",
  },
  {
    title: "누구에게 남는가",
    body: "참가자는 AI 활용 결과물과 포트폴리오를 얻고, 스폰서는 AI 활용 인재와 초기 아이디어를 발견할 수 있습니다.",
  },
] as const;

const flow = [
  "집에서 편하게 아이디어 설명서를 제출",
  "심사위원, 스폰서, 참가자가 가상머니 투자 평가",
  "PRD, 발표자료, MVP 또는 프로토타입으로 발전",
  "포트폴리오로 남는 결과물과 네트워크 확보",
] as const;

export function MawdDetailStory() {
  return (
    <section id="mawd-detail" className="mawd-detail-story" aria-labelledby="mawd-detail-title">
      <div className="wrap">
        <div className="detail-story-head">
          <h2 id="mawd-detail-title">AI로 아이디어를 실제 결과물까지 만드는 챌린지</h2>
        </div>

        <div className="detail-story-grid">
          {pillars.map((item) => (
            <article className="detail-story-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>

        <div className="detail-story-flow" aria-label="MAWD Challenge 진행 방식">
          {flow.map((item, index) => (
            <div className="detail-story-step" key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

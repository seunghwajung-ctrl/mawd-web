import Image from "next/image";

type Point = {
  tag: string;
  icon: string;
  title: string;
  desc: string;
};

const points: Point[] = [
  {
    tag: "01",
    icon: "💡",
    title: "비전공자도 만들 수 있다",
    desc: "AI 도구와 바이브코딩을 활용하면, 비전공자도 자신의 문제의식과 아이디어를 실제 서비스나 도구의 형태로 구현해볼 수 있습니다.",
  },
  {
    tag: "02",
    icon: "🧭",
    title: "가장 좋은 아이디어는 현장에서",
    desc: "오히려 다양한 아이디어는 전공 밖의 현장에 있는 사람들, 각자의 관심분야와 업무 속에서 불편함을 직접 느껴본 사람들에게서 더 많이 나옵니다.",
  },
  {
    tag: "03",
    icon: "🛠️",
    title: "완벽한 개발보다 문제 발견",
    desc: "중요한 것은 처음부터 완벽하게 개발하는 능력이 아니라, 내가 가진 문제를 발견하고 그것을 AI와 함께 구체적인 결과물로 바꿔보는 경험입니다.",
  },
];

export function VibeCodingSection() {
  return (
    <section id="vibe-coding">
      <div className="wrap">
        <p className="section-kicker">VIBE CODING ERA</p>
        <h2>바이브코딩의 시대, 아이디어는 더 이상 개발자만의 것이 아닙니다</h2>
        <p className="section-lead">
          이제는 코드를 직접 오래 배운 사람만 서비스를 만들 수 있는 시대가
          아닙니다. AI 도구와 바이브코딩을 활용하면, 비전공자도 자신의
          문제의식과 아이디어를 실제 서비스나 도구의 형태로 구현해볼 수
          있습니다.
        </p>

        <div className="vibe-layout">
          <div className="vibe-grid">
            {points.map((p, i) => (
              <article key={i} className="vibe-card">
                <div className="vibe-card-head">
                  <span className="vibe-num">{p.tag}</span>
                  <span className="vibe-emoji" aria-hidden="true">{p.icon}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </article>
            ))}
          </div>

          <aside className="visual-console" aria-label="바이브코딩 진행 예시">
            <div className="console-top">
              <span>PLAYER FLOW</span>
              <b>IDEA → MVP</b>
            </div>
            <Image
              src="/cards/mawd-card-02.png"
              alt="MAWD 프로그램을 카드뉴스로 설명한 시각 자료"
              className="console-card"
              width={1080}
              height={1080}
            />
            <div className="console-flow" aria-hidden="true">
              <span>문제 발견</span>
              <span>AI 실험</span>
              <span>서비스 링크</span>
            </div>
          </aside>
        </div>

        <div className="vibe-message">
          <p>
            MAWD는 개발자만을 위한 프로그램이 아닙니다. 전공, 경험, 관심사가
            다른 사람들이 모여 아이디어를 나누고, AI를 활용해 직접 만들어보며,
            앞으로의 시대에 필요한 창작 역량을 함께 키우는 프로젝트입니다.
          </p>
        </div>
      </div>
    </section>
  );
}

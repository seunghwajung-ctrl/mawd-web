import type { Metadata } from "next";
import Image from "next/image";
import { LumaCheckoutButton } from "@/components/LumaCheckoutButton";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "마우드 카드뉴스 | MAWD Challenge",
  description:
    "MAWD Challenge 웹사이트 디자인과 동일한 자산으로 제작한 1080×1080 카드뉴스.",
};

type Card = {
  id: string;
  kicker: string;
  title: React.ReactNode;
  lead: string;
  variant?: "hero" | "prize";
  items?: {
    tag: string;
    title: string;
    desc?: string;
  }[];
  quote?: React.ReactNode;
};

const cards: Card[] = [
  {
    id: "card-1",
    kicker: "MAWD CHALLENGE",
    variant: "hero",
    title: (
      <>
        <em>AI</em>로 만들고, <em>투자</em>로 검증받고,
        <br />
        <em>기회</em>를 잡아라
      </>
    ),
    lead:
      "비전공자들의 아이디어가 바이브 코딩을 만나 세상밖으로 나올 차례입니다. 자신의 아이디어를 현실로 만들고 결과로 증명하세요.",
    items: [
      { tag: "01", title: "모집" },
      { tag: "02", title: "오리엔테이션" },
      { tag: "03", title: "1라운드" },
      { tag: "04", title: "라이크 심사" },
      { tag: "05", title: "2라운드" },
      { tag: "06", title: "시상" },
    ],
  },
  {
    id: "card-2",
    kicker: "VIBE CODING ERA",
    title: <>바이브코딩의 시대, 아이디어는 더 이상 개발자만의 것이 아닙니다</>,
    lead:
      "AI 도구와 바이브코딩을 활용하면, 비전공자도 자신의 문제의식과 아이디어를 실제 서비스나 도구의 형태로 구현해볼 수 있습니다.",
    items: [
      {
        tag: "01",
        title: "비전공자도 만들 수 있다",
        desc: "AI 도구와 바이브코딩으로 아이디어를 서비스나 도구의 형태로 구현합니다.",
      },
      {
        tag: "02",
        title: "가장 좋은 아이디어는 현장에서",
        desc: "각자의 관심분야와 업무 속에서 느낀 불편함이 좋은 출발점이 됩니다.",
      },
      {
        tag: "03",
        title: "완벽한 개발보다 문제 발견",
        desc: "중요한 것은 문제를 발견하고 AI와 함께 결과물로 바꾸는 경험입니다.",
      },
    ],
  },
  {
    id: "card-3",
    kicker: "NO BARRIER",
    title: <>행사의 주된 목표는 방향성입니다.</>,
    lead:
      "방향성을 못잡는 청년, 방향성을 잃고싶지 않은 청년들을 위한 해커톤입니다.",
    items: [
      {
        tag: "×",
        title: "자본의 부담",
        desc: "참가비는 무료입니다.",
      },
      {
        tag: "×",
        title: "개발 경험의 부담",
        desc: "개발을 해본 적 없어도 괜찮습니다.",
      },
      {
        tag: "×",
        title: "시간의 부담",
        desc: "지금 당장 창업을 생각하지 않아도 괜찮습니다.",
      },
    ],
  },
  {
    id: "card-4",
    kicker: "BEYOND THE PRODUCT",
    title: <>MAWD에서 가져갈 수 있는 것은 단순한 완성작 하나가 아닙니다</>,
    lead:
      "AI 역량은 책이나 강의만으로 쌓이기 어렵습니다. 직접 아이디어를 꺼내고, 도구를 써보고, 작게라도 결과물을 만들어보는 과정에서 가장 빠르게 늘어납니다.",
    items: [
      { tag: "01", title: "문제를 AI로 풀어보는 경험" },
      { tag: "02", title: "다양한 분야의 사람들과 교류하는 시간" },
      { tag: "03", title: "협업을 통해 아이디어를 발전시키는 과정" },
      { tag: "04", title: "전공·업무·커리어에 연결되는 AI 활용 경험" },
    ],
    quote: <>중요한 건 앞으로의 시대에 필요한 감각을 먼저 경험해보는 것</>,
  },
  {
    id: "card-5",
    kicker: "THE PROBLEM",
    title: <>AI를 배웠다는 말보다, 만든 결과물이 더 강한 증거</>,
    lead:
      "기업은 이제 “무엇을 만들 수 있는가”, “AI로 어떤 문제를 해결했는가”, “실제 결과물이 있는가”를 묻습니다.",
    items: [
      { tag: "25%", title: "미국 전체 해고의 25%가 AI가 직접 원인" },
      { tag: "93%", title: "전 직종의 93%가 AI 영향권" },
      { tag: "55%", title: "향후 2~3년 내 미국 일자리의 55%가 AI로 재구성" },
      { tag: "20%", title: "2024년 이후 22~25세 SW 개발자 고용 20% 감소" },
    ],
    quote: <>“AI가 바꾸는 직무 환경에서 나는 무엇을 직접 만들 수 있는가?”</>,
  },
  {
    id: "card-6",
    kicker: "WHY MAWD NOW",
    title: <>학력보다 강한 스펙, AI 프로젝트 결과물</>,
    lead:
      "MAWD는 참가자가 자신의 AI 프로젝트 결과물을 포트폴리오, 발표자료, 링크드인 콘텐츠, 채용·창업·협업 기회로 전환할 수 있게 돕습니다.",
    items: [
      { tag: "SK하이닉스", title: "직무 역량과 성장 가능성 중심 선발" },
      { tag: "삼성", title: "학력·국적·성별·나이·연고 제한 폐지" },
      { tag: "카카오", title: "학력·전공·나이·성별 없는 블라인드 평가" },
      { tag: "Google", title: "학위 없는 인재도 채용" },
    ],
    quote: <>아이디어를 말하지 말고, 만들고 보여주세요.</>,
  },
  {
    id: "card-7",
    kicker: "PRIZE POOL",
    variant: "prize",
    title: (
      <>
        총 상금
        <br />
        ??????
      </>
    ),
    lead:
      "상금은 미리 정해진 숫자가 아닙니다. 참가자가 받은 가상머니가 그대로 현금으로 환전되는 구조입니다. 더 많은 투자를 받을수록 상금도 커집니다.",
    items: [
      {
        tag: "ROUND 1",
        title: "PRD+ 검증용 프로토타입 업로드",
      },
      {
        tag: "LIKE JUDGE",
        title: "심사위원·참가자들의 가상 투자",
      },
      {
        tag: "ROUND 02",
        title: "대면 MVP 빌딩",
      },
      {
        tag: "AWARD",
        title: "시상",
      },
    ],
  },
  {
    id: "card-8",
    kicker: "REWARD TABLE",
    title: <>참가자는 상금과 투자 기회를, 스폰서는 우수 팀과 기술 트렌드를 얻습니다</>,
    lead:
      "MAWD Challenge는 만들고, 등록하고, 검증받고, 투자받는 실행형 AI 빌드 챌린지입니다.",
    items: [
      { tag: "참가자", title: "총 상금 및 후속 투자 기회" },
      { tag: "참가자", title: "멘토링 및 전문가 코칭" },
      { tag: "참가자", title: "AI 크레딧 지원" },
      { tag: "스폰서", title: "브랜드 노출과 인지도 강화" },
      { tag: "스폰서", title: "우수팀과 비즈니스 기회 발굴" },
      { tag: "스폰서", title: "채용 연계 및 인재 발굴" },
    ],
    quote: <>마우드 참가 신청하기</>,
  },
];

export default function CardnewsPage() {
  return (
    <main className={styles.page}>
      {cards.map((card, i) => (
        <section
          className={`${styles.card} ${card.variant ? styles[card.variant] : ""}`}
          id={card.id}
          key={card.id}
        >
          <div className={styles.bg} aria-hidden="true" />
          <div className={styles.scanline} aria-hidden="true" />
          <div className={styles.top}>
            <Image
              src="/mawd-logo.png"
              alt="MAWD"
              width={248}
              height={186}
              className={styles.logo}
              priority={i === 0}
            />
            <span className={styles.count}>{String(i + 1).padStart(2, "0")} / 08</span>
          </div>

          <div className={styles.copy}>
            <p className={styles.kicker}>{card.kicker}</p>
            {i === 0 ? <p className={styles.challenge}>CHALLENGE</p> : null}
            <h1>{card.title}</h1>
            <p className={styles.lead}>{card.lead}</p>
          </div>

          {card.variant === "prize" ? (
            <Image
              src="/trophy-prize.png"
              alt=""
              width={390}
              height={408}
              className={styles.trophy}
              priority
            />
          ) : null}

          <div className={i === 0 ? styles.flow : styles.items}>
            {card.items?.map((item, itemIndex) => (
              <article className={styles.item} key={`${item.tag}-${itemIndex}`}>
                <span>{item.tag}</span>
                <b>{item.title}</b>
                {item.desc ? <p>{item.desc}</p> : null}
              </article>
            ))}
          </div>

          {card.quote ? (
            i === 7 ? (
              <LumaCheckoutButton className={styles.cta}>
                {card.quote}
                <span>›</span>
              </LumaCheckoutButton>
            ) : (
              <p className={styles.quote}>{card.quote}</p>
            )
          ) : null}
        </section>
      ))}
    </main>
  );
}

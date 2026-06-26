import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "마우드 카드뉴스 | MAWD Challenge",
  description: "MAWD Challenge 8카드 카드뉴스 — 인쇄용 1080×1080 카드 모음.",
};

type Card = {
  id: string;
  light?: boolean;
  title: React.ReactNode;
  desc: string;
  chip: string;
  barWidth: string;
  small: string;
  money?: string;
};

const cards: Card[] = [
  {
    id: "card-1",
    title: (
      <>
        아이디어를
        <br />
        실제 프로젝트로
      </>
    ),
    desc: "AI 창업 서바이벌, 마우드",
    chip: "START THE ROUND",
    barWidth: "72%",
    small: "PRD · MVP · INVESTMENT",
  },
  {
    id: "card-2",
    light: true,
    title: (
      <>
        창업 아이디어가
        <br />
        있다면
      </>
    ),
    desc: "이제 말이 아니라 결과물로 보여주세요.",
    chip: "IDEA TO OUTPUT",
    barWidth: "38%",
    small: "문제 정의부터 시작",
  },
  {
    id: "card-3",
    title: (
      <>
        오리엔테이션에서
        <br />
        룰을 공개합니다
      </>
    ),
    desc: "일정, 미션, 평가 방식을 대면으로 안내합니다.",
    chip: "ORIENTATION",
    barWidth: "45%",
    small: "룰 · 일정 · 평가 기준",
  },
  {
    id: "card-4",
    title: (
      <>
        1차 빌딩은
        <br />
        비대면
      </>
    ),
    desc: "툴 세팅과 PRD 제작부터 시작합니다.",
    chip: "REMOTE BUILD",
    barWidth: "56%",
    small: "툴 세팅 + PRD",
  },
  {
    id: "card-5",
    light: true,
    title: (
      <>
        산출물과
        <br />
        배포 링크 등록
      </>
    ),
    desc: "팀별 결과물을 마우드 전용 프로그램에 올립니다.",
    chip: "SUBMIT LINK",
    barWidth: "62%",
    small: "PRD · 링크 · 결과물",
  },
  {
    id: "card-6",
    title: (
      <>
        심사위원과 기업이
        <br />
        가상머니로 투자
      </>
    ),
    desc: "가능성이 보이는 팀에 가상머니를 부여합니다.",
    chip: "",
    barWidth: "80%",
    small: "투자형 평가",
    money: "₩ VIRTUAL",
  },
  {
    id: "card-7",
    title: (
      <>
        가상머니가 적은 팀은
        <br />
        라운드 탈락
      </>
    ),
    desc: "살아남은 팀은 대면으로 실제 MVP를 만듭니다.",
    chip: "NEXT ROUND",
    barWidth: "68%",
    small: "탈락 · 생존 · MVP",
  },
  {
    id: "card-8",
    light: true,
    title: (
      <>
        최종 상금은
        <br />
        받은 가상머니만큼
      </>
    ),
    desc: "더 많이 투자받은 팀이 더 큰 상금을 가져갑니다.",
    chip: "APPLY NOW",
    barWidth: "92%",
    small: "마우드 참가 신청",
  },
];

export default function CardnewsPage() {
  return (
    <div className={styles.page}>
      <main className={styles.grid}>
        {cards.map((card, i) => (
          <section
            key={card.id}
            id={card.id}
            className={`${styles.card}${card.light ? ` ${styles.light}` : ""}`}
          >
            <div className={styles.top}>
              <span className={styles.mark}>mawd</span>
              <span>
                {String(i + 1).padStart(2, "0")} / 08
              </span>
            </div>
            <div className={styles.main}>
              <h1>{card.title}</h1>
              <p>{card.desc}</p>
            </div>
            <div className={styles.bottom}>
              {card.money ? (
                <span className={styles.money}>{card.money}</span>
              ) : (
                <span className={styles.chip}>{card.chip}</span>
              )}
              <div className={styles.ui}>
                <div className={styles.bar}>
                  <span style={{ width: card.barWidth }} />
                </div>
                <div className={styles.small}>{card.small}</div>
              </div>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

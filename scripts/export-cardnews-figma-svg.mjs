import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "artifacts/cardnews-figma-editable");

const dataUrl = (file, mime) => {
  const bytes = fs.readFileSync(path.join(root, file));
  return `data:${mime};base64,${bytes.toString("base64")}`;
};

const logo = dataUrl("public/mawd-logo.png", "image/png");
const trophy = dataUrl("public/trophy-prize.png", "image/png");
const circuit = dataUrl("public/hero-bg-circuit.svg", "image/svg+xml");

const cards = [
  {
    kicker: "MAWD CHALLENGE",
    variant: "hero",
    title: ["AI로 만들고, 투자로 검증받고,", "기회를 잡아라"],
    emph: ["AI", "투자", "기회"],
    lead:
      "비전공자들의 아이디어가 바이브 코딩을 만나 세상밖으로 나올 차례입니다. 자신의 아이디어를 현실로 만들고 결과로 증명하세요.",
    items: [
      ["01", "모집"],
      ["02", "오리엔테이션"],
      ["03", "1라운드"],
      ["04", "라이크 심사"],
      ["05", "2라운드"],
      ["06", "시상"],
    ],
  },
  {
    kicker: "VIBE CODING ERA",
    title: ["바이브코딩의 시대,", "아이디어는 더 이상", "개발자만의 것이 아닙니다"],
    lead:
      "AI 도구와 바이브코딩을 활용하면, 비전공자도 자신의 문제의식과 아이디어를 실제 서비스나 도구의 형태로 구현해볼 수 있습니다.",
    items: [
      ["01", "비전공자도 만들 수 있다", "AI 도구와 바이브코딩으로 아이디어를 서비스나 도구의 형태로 구현합니다."],
      ["02", "가장 좋은 아이디어는 현장에서", "각자의 관심분야와 업무 속에서 느낀 불편함이 좋은 출발점이 됩니다."],
      ["03", "완벽한 개발보다 문제 발견", "중요한 것은 문제를 발견하고 AI와 함께 결과물로 바꾸는 경험입니다."],
    ],
  },
  {
    kicker: "NO BARRIER",
    title: ["창업의 문턱,", "자본과 시간의 부담을", "없앴습니다"],
    lead:
      "청년이 창업을 도전하기에 느끼는 가장 큰 장벽은 자본과 시간, 그리고 경험의 부족입니다. MAWD는 이 세 가지 부담을 먼저 거둬냅니다.",
    items: [
      ["×", "자본의 부담", "참가비는 무료입니다."],
      ["×", "개발 경험의 부담", "개발을 해본 적 없어도 괜찮습니다."],
      ["×", "시간의 부담", "지금 당장 창업을 생각하지 않아도 괜찮습니다."],
    ],
  },
  {
    kicker: "BEYOND THE PRODUCT",
    title: ["MAWD에서 가져갈 수 있는 것은", "단순한 완성작 하나가 아닙니다"],
    lead:
      "AI 역량은 책이나 강의만으로 쌓이기 어렵습니다. 직접 아이디어를 꺼내고, 도구를 써보고, 작게라도 결과물을 만들어보는 과정에서 가장 빠르게 늘어납니다.",
    items: [
      ["01", "문제를 AI로 풀어보는 경험"],
      ["02", "다양한 분야의 사람들과 교류하는 시간"],
      ["03", "협업을 통해 아이디어를 발전시키는 과정"],
      ["04", "전공·업무·커리어에 연결되는 AI 활용 경험"],
    ],
    quote: "중요한 건 앞으로의 시대에 필요한 감각을 먼저 경험해보는 것",
  },
  {
    kicker: "THE PROBLEM",
    title: ["AI를 배웠다는 말보다,", "만든 결과물이 더 강한 증거"],
    lead:
      "기업은 이제 “무엇을 만들 수 있는가”, “AI로 어떤 문제를 해결했는가”, “실제 결과물이 있는가”를 묻습니다.",
    items: [
      ["25%", "미국 전체 해고의 25%가 AI가 직접 원인"],
      ["93%", "전 직종의 93%가 AI 영향권"],
      ["55%", "향후 2~3년 내 미국 일자리의 55%가 AI로 재구성"],
      ["20%", "2024년 이후 22~25세 SW 개발자 고용 20% 감소"],
    ],
    quote: "“AI가 바꾸는 직무 환경에서 나는 무엇을 직접 만들 수 있는가?”",
  },
  {
    kicker: "WHY MAWD NOW",
    title: ["학력보다 강한 스펙,", "AI 프로젝트 결과물"],
    lead:
      "MAWD는 참가자가 자신의 AI 프로젝트 결과물을 포트폴리오, 발표자료, 링크드인 콘텐츠, 채용·창업·협업 기회로 전환할 수 있게 돕습니다.",
    items: [
      ["SK하이닉스", "직무 역량과 성장 가능성 중심 선발"],
      ["삼성", "학력·국적·성별·나이·연고 제한 폐지"],
      ["카카오", "학력·전공·나이·성별 없는 블라인드 평가"],
      ["Google", "학위 없는 인재도 채용"],
    ],
    quote: "아이디어를 말하지 말고, 만들고 보여주세요.",
  },
  {
    kicker: "PRIZE POOL",
    variant: "prize",
    title: ["총 상금", "??????"],
    lead:
      "상금은 미리 정해진 숫자가 아닙니다. 참가자가 받은 가상머니가 그대로 현금으로 환전되는 구조입니다. 더 많은 투자를 받을수록 상금도 커집니다.",
    items: [
      ["ROUND 1", "PRD+ 검증용 프로토타입 업로드"],
      ["LIKE JUDGE", "심사위원·참가자들의 가상 투자"],
      ["ROUND 02", "대면 MVP 빌딩"],
      ["AWARD", "시상"],
    ],
  },
  {
    kicker: "REWARD TABLE",
    title: ["참가자는 상금과 투자 기회를,", "스폰서는 우수 팀과 기술 트렌드를", "얻습니다"],
    lead:
      "MAWD Challenge는 만들고, 등록하고, 검증받고, 투자받는 실행형 AI 빌드 챌린지입니다.",
    items: [
      ["참가자", "총 상금 및 후속 투자 기회"],
      ["참가자", "멘토링 및 전문가 코칭"],
      ["참가자", "AI 크레딧 지원"],
      ["스폰서", "브랜드 노출과 인지도 강화"],
      ["스폰서", "우수팀과 비즈니스 기회 발굴"],
      ["스폰서", "채용 연계 및 인재 발굴"],
    ],
    quote: "마우드 참가 신청하기",
  },
];

const esc = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

function wrapText(text, maxChars) {
  const words = String(text).split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if ([...next].length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function textBlock(lines, x, y, size, options = {}) {
  const {
    fill = "#f8f8f2",
    width = 900,
    lineHeight = 1.12,
    anchor = "start",
    weight = 400,
    glow = "url(#textGlow)",
    className = "pixel-text",
  } = options;
  const tspans = lines
    .map((line, i) => {
      const dy = i === 0 ? 0 : size * lineHeight;
      return `<tspan x="${x}" dy="${i === 0 ? 0 : dy}">${esc(line)}</tspan>`;
    })
    .join("");
  return `<text class="${className}" x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" font-weight="${weight}" fill="${fill}" filter="${glow}" data-width="${width}">${tspans}</text>`;
}

function itemBox(item, x, y, w, h, compact = false) {
  const [tag, title, desc] = item;
  const titleLines = wrapText(title, compact ? 14 : 18).slice(0, 3);
  const descLines = desc ? wrapText(desc, compact ? 18 : 24).slice(0, 2) : [];
  return `
    <g class="editable-item">
      <rect x="${x + 5}" y="${y + 5}" width="${w}" height="${h}" fill="#9d00ff" opacity="0.30"/>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#030303" opacity="0.78" stroke="#f8f8f2" stroke-opacity="0.42"/>
      <text class="pixel-text" x="${x + 18}" y="${y + 31}" font-size="${compact ? 16 : 18}" fill="#d88cff" filter="url(#violetGlow)">${esc(tag)}</text>
      ${textBlock(titleLines, x + 18, y + (compact ? 58 : 65), compact ? 22 : 24, {
        fill: "#f8f8f2",
        width: w - 36,
        lineHeight: 1.18,
        glow: "url(#textShadow)",
      })}
      ${
        descLines.length
          ? textBlock(descLines, x + 18, y + h - 34 - (descLines.length - 1) * 22, compact ? 17 : 18, {
              fill: "#c8c8c3",
              width: w - 36,
              lineHeight: 1.25,
              glow: "none",
            })
          : ""
      }
    </g>`;
}

function renderCard(card, index) {
  const n = String(index + 1).padStart(2, "0");
  const reference = dataUrl(`public/cards/mawd-card-${n}.png`, "image/png");
  const isHero = card.variant === "hero";
  const isPrize = card.variant === "prize";
  const titleX = isHero ? 540 : 74;
  const titleY = isHero ? 400 : 300;
  const titleSize = isHero ? 42 : isPrize ? 78 : 56;
  const titleAnchor = isHero ? "middle" : "start";
  const titleColor = isPrize ? "#66ff00" : "#f8f8f2";
  const titleLines = card.title;
  const leadLines = wrapText(card.lead, isPrize ? 25 : 35).slice(0, 4);
  const leadY = titleY + titleLines.length * titleSize * 1.08 + 35;

  const itemMarkup = (() => {
    if (isHero) {
      return card.items
        .map((item, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          return itemBox(item, 74 + col * 314, 760 + row * 140, 296, 126, true);
        })
        .join("");
    }
    if (isPrize) {
      return card.items
        .map((item, i) => itemBox(item, 74, 658 + i * 90, 585, 76, true))
        .join("");
    }
    const cols = 2;
    const startY = card.items.length > 4 ? 685 : 718;
    const boxH = card.items.length > 4 ? 102 : 132;
    return card.items
      .map((item, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        return itemBox(item, 74 + col * 474, startY + row * (boxH + 16), 458, boxH, card.items.length > 4);
      })
      .join("");
  })();

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080">
  <defs>
    <style>
      .pixel-text {
        font-family: "NeoDunggeunmoPro", "Neo둥근모 Pro", "DungGeunMo", monospace;
        letter-spacing: 0;
      }
    </style>
    <filter id="textGlow" x="-20%" y="-40%" width="140%" height="180%">
      <feDropShadow dx="4" dy="4" stdDeviation="0" flood-color="#000000" flood-opacity="0.72"/>
      <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="#66ff00" flood-opacity="0.30"/>
    </filter>
    <filter id="textShadow" x="-20%" y="-40%" width="140%" height="180%">
      <feDropShadow dx="3" dy="3" stdDeviation="0" flood-color="#000000" flood-opacity="0.75"/>
    </filter>
    <filter id="limeGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="#66ff00" flood-opacity="0.55"/>
    </filter>
    <filter id="violetGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#9d00ff" flood-opacity="0.50"/>
    </filter>
    <pattern id="grid" width="34" height="34" patternUnits="userSpaceOnUse">
      <path d="M 34 0 L 0 0 0 34" fill="none" stroke="#ffffff" stroke-opacity="0.055" stroke-width="1"/>
    </pattern>
    <pattern id="scan" width="1" height="5" patternUnits="userSpaceOnUse">
      <rect width="1" height="1" fill="#ffffff" opacity="0.32"/>
    </pattern>
    <radialGradient id="vignette" cx="50%" cy="54%" r="65%">
      <stop offset="0%" stop-color="#050505" stop-opacity="0"/>
      <stop offset="52%" stop-color="#050505" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="#050505" stop-opacity="0.62"/>
    </radialGradient>
    <linearGradient id="darkFade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#050505" stop-opacity="0.42"/>
      <stop offset="42%" stop-color="#050505" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#050505" stop-opacity="0.86"/>
    </linearGradient>
  </defs>
  <g id="01 exact website reference">
    <image href="${reference}" x="0" y="0" width="1080" height="1080" opacity="0.24" preserveAspectRatio="xMidYMid slice"/>
  </g>
  <g id="02 editable background">
    <rect width="1080" height="1080" fill="#050505"/>
    <image href="${circuit}" x="-54" y="-54" width="1188" height="1188" opacity="0.92" preserveAspectRatio="xMidYMid slice"/>
    <rect width="1080" height="1080" fill="url(#darkFade)"/>
    <rect width="1080" height="1080" fill="url(#vignette)"/>
    <rect width="1080" height="1080" fill="url(#grid)" opacity="0.95"/>
    <rect width="1080" height="1080" fill="url(#scan)" opacity="0.13"/>
    <rect x="0.5" y="0.5" width="1079" height="1079" fill="none" stroke="#f8f8f2" stroke-opacity="0.22"/>
    <rect x="1.5" y="1.5" width="1077" height="1077" fill="none" stroke="#66ff00" stroke-opacity="0.12"/>
  </g>
  <g id="03 editable logo and counter">
    <image href="${logo}" x="${isHero ? 345 : 74}" y="${isHero ? 14 : 20}" width="${isHero ? 390 : 176}" height="${isHero ? 293 : 133}" filter="url(#limeGlow)" preserveAspectRatio="xMidYMid meet"/>
    <text class="pixel-text" x="1006" y="91" text-anchor="end" font-size="24" fill="#d8d8d2" opacity="0.78" filter="url(#violetGlow)">${n} / 08</text>
  </g>
  <g id="04 editable copy">
    <rect x="${isHero ? 420 : 74}" y="${isHero ? 304 : 214}" width="${isHero ? 240 : 260}" height="42" fill="#050505" opacity="0.74" stroke="#66ff00" stroke-opacity="0.82"/>
    <text class="pixel-text" x="${isHero ? 540 : 88}" y="${isHero ? 331 : 241}" text-anchor="${isHero ? "middle" : "start"}" font-size="18" fill="#66ff00" filter="url(#limeGlow)">${esc(card.kicker)}</text>
    ${isHero ? `<text class="pixel-text" x="540" y="382" text-anchor="middle" font-size="58" fill="#f8f8f2" filter="url(#textGlow)" letter-spacing="8">CHALLENGE</text>` : ""}
    ${textBlock(titleLines, titleX, titleY, titleSize, {
      fill: titleColor,
      width: isPrize ? 570 : 930,
      anchor: titleAnchor,
      lineHeight: 1.08,
      glow: isPrize ? "url(#limeGlow)" : "url(#textGlow)",
    })}
    ${textBlock(leadLines, isHero ? 540 : 74, leadY, 25, {
      fill: "#d0d0cc",
      width: isPrize ? 570 : 850,
      anchor: isHero ? "middle" : "start",
      lineHeight: 1.38,
      glow: "none",
    })}
  </g>
  ${isPrize ? `<g id="05 editable trophy"><rect x="718" y="322" width="340" height="340" fill="#f4f1e8" opacity="0.94" stroke="#66ff00" stroke-width="2"/><image href="${trophy}" x="736" y="340" width="304" height="304" preserveAspectRatio="xMidYMid meet"/></g>` : ""}
  <g id="06 editable items">${itemMarkup}</g>
  ${
    card.quote
      ? index === 7
        ? `<g id="07 editable CTA"><rect x="74" y="980" width="360" height="64" fill="#66ff00" stroke="#66ff00" stroke-width="2"/><rect x="79" y="985" width="360" height="64" fill="#9d00ff" opacity="0.88"/><text class="pixel-text" x="100" y="1021" font-size="27" fill="#050505">${esc(card.quote)}</text><text class="pixel-text" x="397" y="1023" font-size="42" fill="#050505">›</text></g>`
        : `<g id="07 editable quote"><rect x="74" y="974" width="900" height="76" fill="#050505" opacity="0.78" stroke="#66ff00" stroke-opacity="0.78"/><text class="pixel-text" x="96" y="1021" font-size="27" fill="#66ff00" filter="url(#limeGlow)">${esc(card.quote)}</text></g>`
      : ""
  }
</svg>`;
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

cards.forEach((card, index) => {
  const file = path.join(outDir, `mawd-card-${String(index + 1).padStart(2, "0")}-editable.svg`);
  fs.writeFileSync(file, renderCard(card, index));
});

fs.writeFileSync(
  path.join(outDir, "README.md"),
  [
    "# MAWD cardnews Figma editable pack",
    "",
    "- 8 SVG artboards, 1080x1080.",
    "- Each SVG includes a low-opacity exact website PNG reference layer plus editable background, logo, text, item boxes, and CTA/trophy layers.",
    "- Font stack is NeoDunggeunmoPro / Neo둥근모 Pro / DungGeunMo / monospace.",
    "- If Figma substitutes the font, install or enable NeoDunggeunmoPro in Figma Desktop and re-open the file.",
  ].join("\n"),
);

console.log(`Generated ${cards.length} editable SVG files in ${outDir}`);

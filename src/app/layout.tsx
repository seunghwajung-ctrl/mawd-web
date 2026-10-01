import type { Metadata } from "next";
import { Black_Han_Sans, Press_Start_2P } from "next/font/google";
import Script from "next/script";
import { BackgroundPixelStars } from "@/components/BackgroundPixelStars";
import { LUMA_CHECKOUT_SCRIPT_ID, LUMA_CHECKOUT_SCRIPT_SRC } from "@/lib/luma-config";
import "./globals.css";

const blackHanSans = Black_Han_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-black-han-sans",
  display: "swap",
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start-2p",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mawd.cyz.today"),
  title: "MAWD Challenge | AI 빌드 챌린지",
  description:
    "자기 에이전트와 업종별 서비스를 만들어 성과를 증명하는 AI 빌드 챌린지. 아이디어를 말로 끝내지 않고, 결과물과 MVP로 인정받습니다.",
  openGraph: {
    title: "MAWD Challenge | AI 빌드 챌린지",
    description:
      "비전공자와 예비창업가가 AI로 PRD, 프로토타입, MVP, 포트폴리오를 만드는 빌드 챌린지.",
    url: "https://mawd.cyz.today",
    siteName: "MAWD Challenge",
    images: [
      {
        url: "/mawd-og.png",
        width: 1200,
        height: 630,
        alt: "MAWD Challenge",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MAWD Challenge | AI 빌드 챌린지",
    description:
      "아이디어를 AI로 만들고 검증하고 보여주는 실행형 빌드 챌린지.",
    images: ["/mawd-og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${blackHanSans.variable} ${pressStart2P.variable}`}
    >
      <body>
        <BackgroundPixelStars />
        {children}
        <Script
          id={LUMA_CHECKOUT_SCRIPT_ID}
          src={LUMA_CHECKOUT_SCRIPT_SRC}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Black_Han_Sans, Press_Start_2P } from "next/font/google";
import { BackgroundPixelStars } from "@/components/BackgroundPixelStars";
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
  title: "MAWD Challenge | AI 빌드 챌린지",
  description:
    "자기 에이전트와 업종별 서비스를 만들어 성과를 증명하는 AI 빌드 챌린지. 아이디어를 말로 끝내지 않고, 결과물과 MVP로 인정받습니다.",
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
      </body>
    </html>
  );
}

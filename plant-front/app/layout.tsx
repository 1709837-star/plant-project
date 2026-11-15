/* << 모든 페이지의 틀 >> */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

// Next가 기본적으로 넣어주는 폰트
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Next가 기본적으로 넣어주는 폰트
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 브라우저 탭에 뜨는 제목, 설명
export const metadata: Metadata = {
  title: "작은 정원",
  description: "내 식물의 물주기 d-day를 챙겨주는 반려식물 관리 앱",
};

// 모든 페이지가 이 틀 안에 들어감. children이 각 페이지의 본문
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header /> {/* 모든 페이지에 헤더가 자동으로 붙는 이유 */}
          {children}
      </body>
    </html>
  );
}

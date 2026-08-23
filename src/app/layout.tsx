import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/lib/component/Header";
import { css } from "styled-system/css";
import "./globals.css";
import { ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "프론트엔드 개발자 이승훈",
  description: "프론트엔드 개발자 이승훈 사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* next/script beforeInteractive는 App Router에서 인라인 코드를 self.__next_s 큐에
            넣고 번들 로드 후에 실행하므로 첫 페인트를 못 잡는다. 깜빡임을 없애려면 raw script여야 한다. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var m=document.cookie.match(/(?:^|; )theme=(light|dark)/);var t=m?m[1]:(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}`,
          }}
        />
        <meta name="google-adsense-account" content="ca-pub-6430649463590330" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        <main
          className={css({
            w: "full",
            h: "full",
            paddingTop: "8",
            paddingBottom: "safe-bottom",
            px: "4",
          })}
        >
          {children}
        </main>
      </body>
    </html>
  );
}

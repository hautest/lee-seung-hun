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
  verification: {
    google: "Zea8OLlCQecuBqiK38rEVDUU13elQZPRvJANSeIr",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        <main
          className={css({
            w: "full",
            p: "4",
            h: "full",
            paddingTop: "14",
          })}
        >
          {children}
        </main>
      </body>
    </html>
  );
}

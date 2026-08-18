import { ReactNode } from "react";
import { css } from "styled-system/css";

// 한글 본문 가독 폭. 레이아웃 최대치(1000px)를 그대로 쓰면 한 줄이 너무 길어진다.
const CONTENT_WIDTH = "720px";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className={css({ w: "full", maxW: CONTENT_WIDTH, marginX: "auto" })}>
      {children}
    </div>
  );
}

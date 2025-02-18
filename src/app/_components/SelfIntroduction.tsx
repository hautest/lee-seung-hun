"use client";

import { TypeAnimation } from "react-type-animation";
import { css } from "styled-system/css";

export function SelfIntroduction() {
  return (
    <TypeAnimation
      sequence={["안녕하세요.\n프론트엔드 개발자\n이승훈입니다.", 1000]}
      wrapper="h1"
      speed={30}
      className={css({
        fontSize: "3xl",
        fontWeight: "bold",
        whiteSpace: "pre-line",
        textAlign: "center",
        h: "32",
      })}
      repeat={Infinity}
    />
  );
}

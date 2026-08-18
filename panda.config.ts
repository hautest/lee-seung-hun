import { defineConfig, defineGlobalStyles } from "@pandacss/dev";
import { createPreset } from "@park-ui/panda-preset";
import neutral from "@park-ui/panda-preset/colors/neutral";

export default defineConfig({
  preflight: true,
  presets: [
    createPreset({ accentColor: neutral, grayColor: neutral, radius: "sm" }),
  ],
  include: ["./src/**/*.{js,jsx,ts,tsx,vue}"],
  jsxFramework: "react",
  outdir: "styled-system",
  minify: true,
  jsxStyleProps: "minimal",
  jsxFactory: "styled",
  theme: {
    extend: {
      breakpoints: {
        mobile: "480px",
        tablet: "768px",
        desktop: "1024px",
      },
      tokens: {
        spacing: {
          "safe-top": {
            value: "env(safe-area-inset-top)",
          },
          "safe-bottom": {
            value: "env(safe-area-inset-bottom)",
          },
        },
      },
    },
  },
  globalCss: defineGlobalStyles({
    // html에 스크롤 컨테이너를 만들면(overflowY) 모달이 body에 거는 스크롤 잠금이
    // 먹지 않는다. 스크롤은 뷰포트에 맡기고 가운데 정렬은 body margin으로 한다.
    html: {
      width: "full",
      backgroundColor: "neutral.1",
    },
    body: {
      width: "full",
      maxW: "1000px",
      marginInline: "auto",
      backgroundColor: "neutral.1",
    },
    "*": {
      outlineColor: "neutral.12",
      boxSizing: "border-box",
    },
  }),
});

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
    html: {
      width: "full",
      backgroundColor: "neutral.1",
      colorScheme: "light",
    },
    // _dark는 `.dark &`로 확장돼 html 자체에는 매칭되지 않는다.
    "html.dark": {
      colorScheme: "dark",
    },
    ".shiki, .shiki span": {
      color: "var(--shiki-light)",
    },
    "html.dark .shiki, html.dark .shiki span": {
      color: "var(--shiki-dark)",
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

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
  globalCss: defineGlobalStyles({
    html: {
      width: "full",
      display: "flex",
      justifyContent: "center",
      backgroundColor: "neutral.1",
      overflowY: "auto",
    },
    body: {
      width: "full",
      maxW: "1200px",
      backgroundColor: "neutral.1",
    },
    "*": {
      outlineColor: "neutral.12",
    },
  }),
});

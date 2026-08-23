import rehypeShikiFromHighlighter from "@shikijs/rehype/core";
import { createHighlighter, type Highlighter } from "shiki";
import type { Options } from "react-markdown";

const SHIKI_THEMES = { light: "github-light", dark: "github-dark" };

// react-markdown이 unified를 동기로 돌리기 때문에 문법을 미리 다 올려둬야 한다.
// 여기 없는 언어는 fallbackLanguage로 떨어지므로, 새 언어를 쓰면 추가할 것.
const SHIKI_LANGUAGES = [
  "typescript",
  "tsx",
  "javascript",
  "jsx",
  "shellscript",
  "markdown",
  "json",
  "css",
  "html",
  "yaml",
  "diff",
];

const SHIKI_OPTIONS = {
  themes: SHIKI_THEMES,
  // 색을 인라인으로 박지 않고 --shiki-light / --shiki-dark 변수만 내보낸다.
  // 배경은 CodeViewer의 토큰이, 글자색은 panda globalCss가 담당.
  defaultColor: false as const,
  // 노션이 언어를 지정하지 않은 블록과, 위 목록에 없는 언어를 모두 평문으로 떨어뜨린다.
  defaultLanguage: "text",
  fallbackLanguage: "text",
  addLanguageClass: true,
};

let highlighter: Promise<Highlighter> | undefined;

// 페이지마다 문법을 다시 파싱하지 않도록 하이라이터를 모듈 단위로 재사용한다.
function getHighlighter() {
  highlighter ??= createHighlighter({
    themes: Object.values(SHIKI_THEMES),
    langs: SHIKI_LANGUAGES,
  });

  return highlighter;
}

export async function createRehypePlugins(): Promise<
  NonNullable<Options["rehypePlugins"]>
> {
  return [[rehypeShikiFromHighlighter, await getHighlighter(), SHIKI_OPTIONS]];
}

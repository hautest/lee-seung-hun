import rehypeShikiFromHighlighter from "@shikijs/rehype/core";
import {
  createHighlighter,
  type Highlighter,
  type ShikiTransformer,
} from "shiki";
import type { Options } from "react-markdown";

const SHIKI_THEME = "github-light";

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

// 테마 배경색이 인라인 스타일로 박혀서 CSS로는 덮을 수 없다.
const removeInlineBackground: ShikiTransformer = {
  name: "remove-inline-background",
  pre(node) {
    node.properties.style = String(node.properties.style ?? "").replace(
      /background-color:[^;]*;?/,
      "",
    );
  },
};

const SHIKI_OPTIONS = {
  theme: SHIKI_THEME,
  transformers: [removeInlineBackground],
  // 노션이 언어를 지정하지 않은 블록과, 위 목록에 없는 언어를 모두 평문으로 떨어뜨린다.
  defaultLanguage: "text",
  fallbackLanguage: "text",
  addLanguageClass: true,
};

let highlighter: Promise<Highlighter> | undefined;

// 페이지마다 문법을 다시 파싱하지 않도록 하이라이터를 모듈 단위로 재사용한다.
function getHighlighter() {
  highlighter ??= createHighlighter({
    themes: [SHIKI_THEME],
    langs: SHIKI_LANGUAGES,
  });

  return highlighter;
}

export async function createRehypePlugins(): Promise<
  NonNullable<Options["rehypePlugins"]>
> {
  return [[rehypeShikiFromHighlighter, await getHighlighter(), SHIKI_OPTIONS]];
}

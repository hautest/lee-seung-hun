import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkCjkFriendly from "remark-cjk-friendly";
import rehypeShikiFromHighlighter from "@shikijs/rehype/core";
import { createHighlighter, type Highlighter } from "shiki";
import { css } from "styled-system/css";
import { Text } from "@/lib/ui/Text";
import { CodeViewer } from "./CodeViewer";
import { ExpandableImage } from "./ExpandableImage";
import { Table } from "@/lib/ui/table";

const SPACE_SIGNAL = "::$SPACE";

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

const SHIKI_OPTIONS = {
  theme: SHIKI_THEME,
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

// 제목은 위쪽 여백을 크게 줘서 바로 아래 본문과 한 덩어리로 읽히게 한다.
const HEADING_GAP = {
  h1: { marginTop: "0", marginBottom: "3" },
  h2: { marginTop: "14", marginBottom: "4" },
  h3: { marginTop: "10", marginBottom: "3" },
  h4: { marginTop: "8", marginBottom: "2" },
} as const;

// 한글은 단어 단위로 줄바꿈해야 읽기 편하다. 긴 URL 같은 토큰은 예외로 잘라준다.
const KOREAN_TEXT = {
  lineHeight: "1.85",
  wordBreak: "keep-all",
  overflowWrap: "break-word",
} as const;

const LIST_STYLE = {
  marginY: "5",
  paddingLeft: "5",
  display: "flex",
  flexDirection: "column",
  gap: "2",
  "& ul, & ol": { marginY: "2" },
} as const;

// 인라인 코드. 코드 블록 안의 <code>는 shiki가 칠해 두므로 건드리면 안 된다.
const INLINE_CODE = {
  "& :not(pre) > code": {
    fontFamily: "mono",
    fontSize: "0.875em",
    backgroundColor: "neutral.4",
    color: "neutral.12",
    paddingX: "1.5",
    paddingY: "0.5",
    borderRadius: "sm",
    overflowWrap: "break-word",
  },
} as const;

type MarkdownNode = {
  type?: string;
  value?: string;
  tagName?: string;
  properties?: { class?: unknown; className?: unknown };
  children?: MarkdownNode[];
};

const LANGUAGE_CLASS_PREFIX = "language-";

// shiki의 addLanguageClass는 <pre>가 아니라 안쪽 <code>에 클래스를 붙인다.
// 이때 hast가 정규화한 className이 아니라 raw `class` 속성으로 들어온다.
function findLanguage(node?: MarkdownNode) {
  const { class: rawClass, className } = node?.children?.[0]?.properties ?? {};
  const names = [rawClass, className].flatMap((value) =>
    Array.isArray(value) ? value.map(String) : [],
  );

  return names
    .find((name) => name.startsWith(LANGUAGE_CLASS_PREFIX))
    ?.slice(LANGUAGE_CLASS_PREFIX.length);
}

function containsImage(node?: MarkdownNode) {
  return node?.children?.some(
    (child) => child.type === "element" && child.tagName === "img",
  );
}

function toPlainText(node?: MarkdownNode): string {
  if (!node) return "";
  if (node.type === "text") return node.value ?? "";

  return (node.children ?? []).map(toPlainText).join("");
}

interface BlogContentRenderProps {
  content: string;
}

export async function BlogContentRender({ content }: BlogContentRenderProps) {
  const shiki = await getHighlighter();

  return (
    <div
      className={css({
        // 글의 첫 제목은 위 여백이 필요 없다.
        "& > *:first-child": { marginTop: "0" },
        ...INLINE_CODE,
      })}
    >
      <Markdown
        components={{
          h1: ({ children }) => (
            <Text
              as="h1"
              css={{
                fontWeight: "bold",
                letterSpacing: "tight",
                lineHeight: "1.35",
                ...HEADING_GAP.h1,
              }}
              size="4xl"
            >
              {children}
            </Text>
          ),
          h2: ({ children }) => (
            <Text
              as="h2"
              css={{
                fontWeight: "bold",
                lineHeight: "1.4",
                paddingBottom: "2",
                borderBottomWidth: "1px",
                borderBottomColor: "neutral.6",
                ...HEADING_GAP.h2,
              }}
              size="2xl"
            >
              {children}
            </Text>
          ),
          h3: ({ children }) => (
            <Text
              as="h3"
              css={{ fontWeight: "bold", lineHeight: "1.4", ...HEADING_GAP.h3 }}
              size="xl"
            >
              {children}
            </Text>
          ),
          h4: ({ children }) => (
            <Text
              as="h4"
              css={{ fontWeight: "bold", ...HEADING_GAP.h4 }}
              size="lg"
            >
              {children}
            </Text>
          ),
          h5: ({ children }) => (
            <Text
              as="h5"
              css={{
                fontWeight: "bold",
                color: "neutral.11",
                ...HEADING_GAP.h4,
              }}
              size="md"
            >
              {children}
            </Text>
          ),
          hr: () => (
            <hr
              className={css({
                h: "1px",
                border: "none",
                backgroundColor: "neutral.6",
                marginY: "12",
              })}
            />
          ),
          ul: ({ children }) => (
            <Text
              as="ul"
              css={{ listStyleType: "disc", ...LIST_STYLE }}
              size="md"
            >
              {children}
            </Text>
          ),
          ol: ({ children }) => (
            <Text
              as="ol"
              css={{ listStyleType: "decimal", ...LIST_STYLE }}
              size="md"
            >
              {children}
            </Text>
          ),
          li: ({ children }) => (
            <Text
              as="li"
              size="md"
              css={{
                listStylePosition: "outside",
                paddingLeft: "1",
                ...KOREAN_TEXT,
                "& > p": { marginBottom: "0", display: "inline" },
              }}
            >
              {children}
            </Text>
          ),
          img: ({ src, alt: _alt }) => {
            const [blockId, alt] = _alt!.split(":");

            return (
              <ExpandableImage
                src={src as string}
                alt={alt}
                blockId={blockId}
              />
            );
          },
          p: ({ children, node }) => {
            // 노션에서 빈 줄을 만들기 위해 넣던 신호. 문단 여백이 생긴 뒤로는 필요 없다.
            if (children === SPACE_SIGNAL) {
              return null;
            }

            // 이미지는 Dialog(div)로 렌더되는데 <p> 안의 div는 유효하지 않은 중첩이라
            // 브라우저가 <p>를 강제로 닫으면서 hydration mismatch가 난다.
            if (containsImage(node)) {
              return <>{children}</>;
            }

            return (
              <Text size="md" css={{ marginBottom: "5", ...KOREAN_TEXT }}>
                {children}
              </Text>
            );
          },
          // shiki가 빌드 타임에 하이라이팅해 둔 <pre>를 그대로 두고 껍데기만 씌운다.
          pre: ({ children, node, ...props }) => {
            const language = findLanguage(node);
            const raw = toPlainText(node).replace(/\n+$/, "");

            return (
              <CodeViewer language={language} raw={raw}>
                <pre {...props}>{children}</pre>
              </CodeViewer>
            );
          },
          strong: ({ children }) => (
            <Text css={{ fontWeight: "bold" }} as="strong">
              {children}
            </Text>
          ),
          a: ({ children, href, target, rel }) => (
            <Text
              as="a"
              css={{
                color: "neutral.12",
                textDecoration: "underline",
                textDecorationColor: "neutral.8",
                textUnderlineOffset: "3px",
                _hover: { textDecorationColor: "neutral.12" },
              }}
              {...{ href, target, rel }}
              size="md"
            >
              {children}
            </Text>
          ),
          blockquote: ({ children }) => (
            <Text
              as="blockquote"
              css={{
                backgroundColor: "neutral.3",
                color: "neutral.12",
                paddingX: "5",
                paddingY: "4",
                borderLeftStyle: "solid",
                borderLeftColor: "neutral.9",
                borderLeftWidth: "3px",
                borderRightRadius: "md",
                marginY: "6",
                "& > p:last-child": { marginBottom: "0" },
              }}
              size="md"
            >
              {children}
            </Text>
          ),
          table: ({ children }) => (
            <div
              className={css({
                overflowX: "auto",
                width: "100%",
                marginY: "6",
                borderWidth: "1px",
                borderColor: "neutral.6",
                borderRadius: "md",
              })}
            >
              <Table.Root css={{ minWidth: "max-content" }}>
                {children}
              </Table.Root>
            </div>
          ),
          thead: ({ children }) => <Table.Head>{children}</Table.Head>,
          tbody: ({ children }) => <Table.Body>{children}</Table.Body>,
          tr: ({ children }) => <Table.Row>{children}</Table.Row>,
          td: ({ children }) => (
            <Table.Cell css={{ whiteSpace: "nowrap", padding: "2" }}>
              {children}
            </Table.Cell>
          ),
          th: ({ children }) => (
            <Table.Header css={{ whiteSpace: "nowrap", padding: "2" }}>
              {children}
            </Table.Header>
          ),
        }}
        remarkPlugins={[remarkGfm, remarkCjkFriendly]}
        rehypePlugins={[[rehypeShikiFromHighlighter, shiki, SHIKI_OPTIONS]]}
      >
        {content}
      </Markdown>
    </div>
  );
}

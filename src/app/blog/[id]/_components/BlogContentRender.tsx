import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkCjkFriendly from "remark-cjk-friendly";
import { css } from "styled-system/css";
import { Text } from "@/lib/ui/Text";
import { CodeViewer } from "./CodeViewer";
import { ExpandableImage } from "./ExpandableImage";
import { Table } from "@/lib/ui/table";
import { createRehypePlugins } from "./utils/shiki";
import { containsImage, readCodeBlock } from "./utils/markdownNode";

const SPACE_SIGNAL = "::$SPACE";

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

interface BlogContentRenderProps {
  content: string;
}

export async function BlogContentRender({ content }: BlogContentRenderProps) {
  const rehypePlugins = await createRehypePlugins();

  return (
    <div
      className={css({
        "& > *:first-child": { marginTop: "0" },
        // 코드 블록 안의 <code>는 shiki가 칠해 두므로 건드리면 안 된다.
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
                marginBottom: "3",
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
                marginTop: "14",
                marginBottom: "4",
              }}
              size="2xl"
            >
              {children}
            </Text>
          ),
          h3: ({ children }) => (
            <Text
              as="h3"
              css={{
                fontWeight: "bold",
                lineHeight: "1.4",
                marginTop: "10",
                marginBottom: "3",
              }}
              size="xl"
            >
              {children}
            </Text>
          ),
          h4: ({ children }) => (
            <Text
              as="h4"
              css={{ fontWeight: "bold", marginTop: "8", marginBottom: "2" }}
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
                marginTop: "8",
                marginBottom: "2",
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
          pre: ({ children, node, ...props }) => {
            const { code, language } = readCodeBlock(node);

            return (
              <CodeViewer language={language} raw={code}>
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
        rehypePlugins={rehypePlugins}
      >
        {content}
      </Markdown>
    </div>
  );
}

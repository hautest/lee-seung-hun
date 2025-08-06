import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { css } from "styled-system/css";
import { Text } from "@/lib/ui/Text";
import { CodeViewer } from "./CodeViewer";
import { ExpandableImage } from "./ExpandableImage";

const SPACE_SIGNAL = "::$SPACE";

const SPACE = {
  lg: "8",
  md: "6",
  sm: "4",
  xs: "2",
};

interface BlogContentRenderProps {
  content: string;
}

export async function BlogContentRender({ content }: BlogContentRenderProps) {
  return (
    <Markdown
      components={{
        h1: ({ children }) => (
          <Text
            as="h1"
            css={{
              fontWeight: "bold",
              marginY: SPACE.lg,
            }}
            size="3xl"
          >
            {children}
          </Text>
        ),
        h2: ({ children }) => (
          <Text
            as="h2"
            css={{ fontWeight: "bold", marginY: SPACE.md }}
            size="2xl"
          >
            {children}
          </Text>
        ),
        h3: ({ children }) => (
          <Text
            as="h3"
            css={{ fontWeight: "bold", marginY: SPACE.sm }}
            size="xl"
          >
            {children}
          </Text>
        ),
        h4: ({ children }) => (
          <Text
            as="h4"
            css={{ fontWeight: "bold", marginY: SPACE.xs }}
            size="lg"
          >
            {children}
          </Text>
        ),
        h5: ({ children }) => (
          <Text
            as="h5"
            css={{ fontWeight: "bold", marginY: SPACE.xs }}
            size="lg"
          >
            {children}
          </Text>
        ),
        hr: () => (
          <hr
            className={css({
              h: "0.5",
              backgroundColor: "neutral.6",
              marginY: SPACE.md,
            })}
          />
        ),
        ul: ({ children }) => (
          <Text
            as="ul"
            css={{ listStyleType: "disc", marginY: SPACE.sm }}
            size="md"
          >
            {children}
          </Text>
        ),
        ol: ({ children }) => (
          <Text
            as="ol"
            css={{ listStyleType: "decimal", marginY: SPACE.sm }}
            size="md"
          >
            {children}
          </Text>
        ),
        li: ({ children }) => {
          return (
            <Text
              as="li"
              size="md"
              css={{
                listStylePosition: "inside",
                textIndent: "1.5",
              }}
            >
              {children}
            </Text>
          );
        },
        img: ({ src, alt: _alt }) => {
          const [blockId, alt] = _alt!.split(":");

          return <ExpandableImage src={src} alt={alt} blockId={blockId} />;
        },
        p: ({ children }) => {
          //줄바꿈 처리
          if (children === SPACE_SIGNAL) {
            return <Text size="md" css={{ marginBottom: "1.5rem" }} />;
          }

          return <Text size="md">{children}</Text>;
        },
        code: ({ children }) => {
          return <CodeViewer>{children as string}</CodeViewer>;
        },
        strong: ({ children }) => (
          <Text css={{ fontWeight: "bold" }} as="strong">
            {children}
          </Text>
        ),
        a: ({ children, href, target, rel }) => (
          <Text
            as="a"
            css={{ color: "neutral.10", textDecoration: "underline" }}
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
              backgroundColor: "neutral.4",
              p: "4",
              h: "full",
              borderLeftStyle: "solid",
              borderLeftColor: "neutral.12",
              borderLeftWidth: "4",
              marginY: SPACE.md,
            }}
            size="md"
          >
            {children}
          </Text>
        ),
      }}
      remarkPlugins={[remarkGfm]}
    >
      {content}
    </Markdown>
  );
}

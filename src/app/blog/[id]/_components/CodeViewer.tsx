"use client";

import { javascript } from "@codemirror/lang-javascript";
import ReactCodeMirror from "@uiw/react-codemirror";
import { githubLight } from "@uiw/codemirror-theme-github";
import { css } from "styled-system/css";
import { Copy, Check } from "lucide-react";
import { Button } from "@/lib/ui/Button";
import { PropsWithChildren, useState } from "react";

// CodeMirror에 문법 확장이 있는 언어만. 나머지는 하이라이팅 없이 평문으로 보여준다.
const JS_LANGUAGES = new Set([
  "js",
  "jsx",
  "ts",
  "tsx",
  "javascript",
  "typescript",
]);

// 노션이 언어를 지정하지 않은 코드 블록에 붙이는 값. 라벨로 보여줄 게 없다.
const UNLABELED_LANGUAGES = new Set([
  "plain",
  "plain text",
  "text",
  "plaintext",
]);

const Skeleton = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={css({
        fontSize: "13px",
        lineHeight: "18.2px",
        paddingBottom: "22.2px",
        paddingTop: "4px",
      })}
    >
      {children}
    </div>
  );
};

interface CopyButtonProps {
  content: string;
}

function CopyButton({ content }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(content);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <Button
      css={{
        h: "7",
        minW: "7",
        px: "2",
        gap: "1.5",
        fontSize: "xs",
        color: "neutral.11",
        _hover: { color: "neutral.12", bg: "neutral.5" },
        "& svg": { w: "3.5", h: "3.5" },
      }}
      size="xs"
      variant="ghost"
      onClick={handleCopy}
      aria-label="코드 복사하기"
    >
      {isCopied ? <Check /> : <Copy />}
      {isCopied ? "복사됨" : "복사"}
    </Button>
  );
}

interface CodeViewerProps {
  children: string;
  language?: string;
}

export function CodeViewer({ children, language }: CodeViewerProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const isMultiline = children.includes("\n");
  const normalizedLanguage = language?.toLowerCase() ?? "";
  const extensions = JS_LANGUAGES.has(normalizedLanguage)
    ? [javascript({ jsx: true, typescript: true })]
    : [];
  const label = UNLABELED_LANGUAGES.has(normalizedLanguage)
    ? ""
    : normalizedLanguage;

  return (
    <figure
      className={css({
        marginY: "6",
        borderWidth: "1px",
        borderColor: "neutral.6",
        borderRadius: "md",
        overflow: "hidden",
        bg: "neutral.1",
      })}
    >
      <figcaption
        className={css({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          h: "9",
          pl: "3",
          pr: "1.5",
          bg: "neutral.3",
          borderBottomWidth: "1px",
          borderBottomColor: "neutral.6",
        })}
      >
        <span
          className={css({
            fontFamily: "mono",
            fontSize: "xs",
            color: "neutral.10",
          })}
        >
          {label}
        </span>
        <CopyButton content={children} />
      </figcaption>
      <div className={css({ px: "1", py: "2" })}>
        {!isLoaded && <Skeleton>{children}</Skeleton>}
        <ReactCodeMirror
          onCreateEditor={() => setIsLoaded(true)}
          basicSetup={{
            foldGutter: false,
            lineNumbers: isMultiline,
            highlightActiveLine: false,
            highlightActiveLineGutter: false,
          }}
          editable={false}
          extensions={extensions}
          theme={githubLight}
          value={children}
        />
      </div>
    </figure>
  );
}

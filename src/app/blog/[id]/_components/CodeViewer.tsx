"use client";

import { css, cva } from "styled-system/css";
import { Copy, Check } from "lucide-react";
import { Button } from "@/lib/ui/Button";
import { ReactNode, useState } from "react";

// 노션이 언어를 지정하지 않은 코드 블록에 붙이는 값. 라벨로 보여줄 게 없다.
const UNLABELED_LANGUAGES = new Set([
  "plain",
  "plain text",
  "plaintext",
  "text",
  "txt",
]);

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

const codeBlock = cva({
  base: {
    marginY: "6",
    borderWidth: "1px",
    borderColor: "neutral.6",
    borderRadius: "md",
    overflow: "hidden",
    bg: "neutral.2",
    "& pre": {
      overflowX: "auto",
      paddingX: "4",
      paddingY: "3",
      fontSize: "sm",
      lineHeight: "1.7",
    },
  },
  variants: {
    lineNumbers: {
      true: {
        "& code": { counterReset: "line" },
        "& .line::before": {
          counterIncrement: "line",
          content: "counter(line)",
          display: "inline-block",
          width: "2ch",
          marginRight: "4",
          textAlign: "right",
          color: "neutral.9",
        },
      },
    },
  },
});

interface CodeViewerProps {
  children: ReactNode;
  raw: string;
  language?: string;
}

export function CodeViewer({ children, raw, language }: CodeViewerProps) {
  const normalizedLanguage = language?.toLowerCase() ?? "";
  const label = UNLABELED_LANGUAGES.has(normalizedLanguage)
    ? ""
    : normalizedLanguage;

  return (
    <figure className={codeBlock({ lineNumbers: raw.includes("\n") })}>
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
        <CopyButton content={raw} />
      </figcaption>
      {children}
    </figure>
  );
}

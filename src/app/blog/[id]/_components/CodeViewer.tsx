"use client";

import { javascript } from "@codemirror/lang-javascript";
import ReactCodeMirror from "@uiw/react-codemirror";
import { githubLight } from "@uiw/codemirror-theme-github";
import { css } from "styled-system/css";
import { Copy, Check } from "lucide-react";
import { Button } from "@/lib/ui/Button";
import { PropsWithChildren, useState } from "react";

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
      css={{ position: "absolute", right: "4", top: "4", zIndex: 2 }}
      variant="outline"
      onClick={handleCopy}
      aria-label="코드 복사하기"
    >
      {isCopied ? <Check /> : <Copy />}
    </Button>
  );
}

interface CodeViewerProps {
  children: string;
}

export function CodeViewer({ children }: CodeViewerProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={css({ position: "relative", marginY: "4" })}>
      <CopyButton content={children} />
      {!isLoaded && <Skeleton>{children}</Skeleton>}
      <ReactCodeMirror
        onCreateEditor={() => setIsLoaded(true)}
        basicSetup={{
          foldGutter: false,
        }}
        editable={false}
        extensions={[
          javascript({
            jsx: true,
            typescript: true,
          }),
        ]}
        theme={githubLight}
        value={children}
      />
    </div>
  );
}

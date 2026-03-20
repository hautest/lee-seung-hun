"use client";

import { useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { css } from "styled-system/css";

interface ResumeContentProps {
  content: string;
}

export function ResumeContent({ content }: ResumeContentProps) {
  const resumeRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={resumeRef} id="resume-content" className={resumeStyle}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className={h1Style}>{children}</h1>,
          h2: ({ children }) => <h2 className={h2Style}>{children}</h2>,
          h3: ({ children }) => <h3 className={h3Style}>{children}</h3>,
          h4: ({ children }) => <h4 className={h4Style}>{children}</h4>,
          p: ({ children }) => <p className={pStyle}>{children}</p>,
          ul: ({ children }) => <ul className={ulStyle}>{children}</ul>,
          li: ({ children }) => <li className={liStyle}>{children}</li>,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={aStyle}
            >
              {children}
            </a>
          ),
          hr: () => <hr className={hrStyle} />,
          strong: ({ children }) => (
            <strong className={strongStyle}>{children}</strong>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

const resumeStyle = css({
  maxW: "800px",
  mx: "auto",
  py: "8",
  px: "6",
  bg: "white",
  color: "#1a1a2e",
  borderRadius: "xl",
  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
  lineHeight: "1.8",
  fontSize: "15px",
  _print: {
    boxShadow: "none",
    borderRadius: "0",
    px: "10",
    py: "6",
    maxW: "none",
  },
});

const h1Style = css({
  fontSize: "28px",
  fontWeight: "800",
  color: "#1a1a2e",
  mb: "1",
  "&:first-of-type": {
    fontSize: "16px",
    fontWeight: "600",
    color: "#6c63ff",
    mb: "0",
    letterSpacing: "0.5px",
  },
});

const h2Style = css({
  fontSize: "20px",
  fontWeight: "700",
  color: "#1a1a2e",
  mt: "10",
  mb: "4",
  pb: "2",
  borderBottom: "2px solid #6c63ff",
  _first: {
    mt: "6",
  },
});

const h3Style = css({
  fontSize: "17px",
  fontWeight: "700",
  color: "#2d2d44",
  mt: "6",
  mb: "2",
  pl: "3",
  borderLeft: "3px solid #6c63ff",
});

const h4Style = css({
  fontSize: "15px",
  fontWeight: "700",
  color: "#4a4a6a",
  mt: "5",
  mb: "2",
});

const pStyle = css({
  mb: "3",
  color: "#3a3a5c",
  wordBreak: "keep-all",
});

const ulStyle = css({
  pl: "5",
  mb: "3",
  listStyleType: "disc",
  "& ul": {
    listStyleType: "circle",
    mb: "1",
  },
});

const liStyle = css({
  mb: "1.5",
  color: "#3a3a5c",
  wordBreak: "keep-all",
  "& > ul": {
    mt: "1",
  },
});

const aStyle = css({
  color: "#6c63ff",
  textDecoration: "underline",
  textUnderlineOffset: "3px",
  fontWeight: "500",
  _hover: {
    color: "#5a52d5",
  },
});

const hrStyle = css({
  border: "none",
  borderTop: "1px dashed #d0d0e0",
  my: "8",
});

const strongStyle = css({
  fontWeight: "700",
  color: "#1a1a2e",
});

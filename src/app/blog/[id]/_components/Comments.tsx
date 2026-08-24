"use client";

import { useEffect, useRef } from "react";
import { css } from "styled-system/css";

const GISCUS_ORIGIN = "https://giscus.app";

const GISCUS_ATTRIBUTES = {
  "data-repo": "hautest/lee-seung-hun",
  "data-repo-id": "R_kgDON6YiVQ",
  "data-category": "Announcements",
  "data-category-id": "DIC_kwDON6YiVc4DEE4l",
  "data-mapping": "pathname",
  "data-strict": "1",
  "data-reactions-enabled": "1",
  "data-emit-metadata": "0",
  "data-input-position": "top",
  "data-lang": "ko",
  "data-loading": "lazy",
};

const getTheme = () =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

export function Comments() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // giscus는 script 태그 바로 뒤에 iframe을 꽂기 때문에 JSX로 렌더하면 안 된다.
    // React 19가 async script를 head로 hoist해버려서 댓글이 엉뚱한 위치에 붙는다.
    const script = document.createElement("script");
    script.src = `${GISCUS_ORIGIN}/client.js`;
    script.async = true;
    script.crossOrigin = "anonymous";
    Object.entries({
      ...GISCUS_ATTRIBUTES,
      "data-theme": getTheme(),
    }).forEach(([key, value]) => script.setAttribute(key, value));
    container.appendChild(script);

    // ThemeToggle이 html의 .dark를 직접 토글할 뿐 구독할 상태가 없어서,
    // 클래스 변화를 관찰해 iframe에 새 테마를 밀어넣는다.
    const observer = new MutationObserver(() => {
      const iframe =
        container.querySelector<HTMLIFrameElement>("iframe.giscus-frame");

      iframe?.contentWindow?.postMessage(
        { giscus: { setConfig: { theme: getTheme() } } },
        GISCUS_ORIGIN
      );
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // 관찰 대상이 document.documentElement라 컴포넌트가 사라져도 살아남는다.
    // 컨테이너 안에 giscus가 넣은 노드는 React가 컨테이너째 떼어내므로 따로 치울 필요 없다.
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={css({
        w: "full",
        marginTop: "16",
        paddingTop: "10",
        borderTopWidth: "1px",
        borderTopColor: "neutral.6",
      })}
    />
  );
}

"use client";

import { Skeleton } from "@/lib/ui/Skeleton";
import { useEffect, useRef, useState } from "react";
import { css } from "styled-system/css";

const RESUME_URL =
  "https://docs.google.com/gview?url=https://lee-seung-hun.com/이승훈_이력서.pdf&embedded=true";

export function Resume() {
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isLoading) {
      timerRef.current = setTimeout(() => {
        // iframe이 로딩되지 않았다면, iframeKey를 업데이트하여 다시 시도
        setIframeKey((prevKey) => prevKey + 1);
      }, 2000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isLoading, iframeKey]);

  const handleLoad = () => {
    setIsLoading(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return (
    <>
      {isLoading && (
        <Skeleton
          css={{
            h: "5800",
            mobileDown: {
              h: "2500",
            },
          }}
        />
      )}
      <iframe
        key={iframeKey}
        src={RESUME_URL}
        className={css({
          w: "full",
          h: isLoading ? "0" : "5800",
          mobileDown: {
            h: isLoading ? "0" : "2500",
          },
        })}
        onLoad={handleLoad}
      ></iframe>
    </>
  );
}

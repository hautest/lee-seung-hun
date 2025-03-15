"use client";

import { Skeleton } from "@/lib/ui/Skeleton";
import { useState } from "react";
import { css } from "styled-system/css";

export function Resume() {
  const [isLoading, setIsLoading] = useState(true);

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
        src="https://docs.google.com/gview?url=https://lee-seung-hun.com/이승훈_이력서.pdf&embedded=true"
        className={css({
          w: "full",
          h: isLoading ? "0" : "5800",
          mobileDown: {
            h: isLoading ? "0" : "2500",
          },
        })}
        onLoad={() => setIsLoading(false)}
      ></iframe>
    </>
  );
}

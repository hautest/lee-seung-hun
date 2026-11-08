"use client";

import "@videojs/react/video/skin.css";
import { Video, VideoPlayer, VideoSkin } from "@videojs/react/video";
import { css } from "styled-system/css";

interface BlogVideoProps {
  src: string;
}

export function BlogVideo({ src }: BlogVideoProps) {
  return (
    <div
      className={css({
        marginY: "6",
        // 세로 영상이 본문 폭에 맞춰 화면보다 길어지지 않게 막는다. 남는 폭은 스킨이 검은 여백(object-fit: contain)으로 채운다.
        "& video": { maxH: "70vh" },
      })}
    >
      <VideoPlayer>
        <VideoSkin>
          <Video src={src} playsInline preload="metadata" />
        </VideoSkin>
      </VideoPlayer>
    </div>
  );
}

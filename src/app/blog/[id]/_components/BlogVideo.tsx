"use client";

import "@videojs/react/video/skin.css";
import { useState } from "react";
import { Video, VideoPlayer, VideoSkin } from "@videojs/react/video";
import { css } from "styled-system/css";

// 본문 이미지(ExpandableImage)와 같은 기준.
const VIDEO_MAX_HEIGHT = "60vh";

interface BlogVideoProps {
  src: string;
}

export function BlogVideo({ src }: BlogVideoProps) {
  const [aspectRatio, setAspectRatio] = useState<number>();

  const readAspectRatio = (video: HTMLVideoElement | null) => {
    if (video && video.videoHeight > 0) {
      setAspectRatio(video.videoWidth / video.videoHeight);
    }
  };

  return (
    <div
      className={css({
        maxW: "full",
        marginY: "6",
        marginX: "auto",
        "& video": { maxH: VIDEO_MAX_HEIGHT },
      })}
      // 스킨이 inline-size 컨테이너라 내용 크기로 폭이 줄지 않는다. 영상 비율로 폭을 정해야 세로 영상 양옆에 검은 여백이 안 생긴다.
      style={{
        width: aspectRatio
          ? `calc(${VIDEO_MAX_HEIGHT} * ${aspectRatio})`
          : undefined,
      }}
    >
      <VideoPlayer>
        <VideoSkin>
          <Video
            // hydration 전에 메타데이터가 이미 로드됐으면 이벤트를 놓치므로 마운트 시점에도 읽는다.
            ref={readAspectRatio}
            onLoadedMetadata={(event) => readAspectRatio(event.currentTarget)}
            src={src}
            playsInline
            preload="metadata"
          />
        </VideoSkin>
      </VideoPlayer>
    </div>
  );
}

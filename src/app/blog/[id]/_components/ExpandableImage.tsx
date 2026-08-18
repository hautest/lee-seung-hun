import { createNotionImageUrl } from "@/lib/notion/createImageUrl";
import { Dialog } from "@/lib/ui/dialog";
import Image from "next/image";
import { css } from "styled-system/css";
import { X } from "lucide-react";

// 표시 폭보다 크게 받아서 고해상도 화면에서도 흐려지지 않게 한다.
const IMAGE_SIZE = {
  unExpanded: 1200,
  expanded: 1600,
};

const DIALOG_MAX_WIDTH = 900;
const DIALOG_MAX_HEIGHT = "90vh";

// 세로로 긴 이미지가 화면을 통째로 차지하지 않게 막는다.
const IMAGE_MAX_HEIGHT = "60vh";

interface ExpandableImageProps {
  src?: string;
  alt: string;
  blockId: string;
}

export function ExpandableImage({ src, alt, blockId }: ExpandableImageProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        css={{
          display: "block",
          width: "fit-content",
          maxW: "full",
          marginY: "6",
          marginX: "auto",
          borderRadius: "md",
          borderWidth: "1px",
          borderColor: "neutral.6",
          overflow: "hidden",
          cursor: "zoom-in",
        }}
      >
        {/* width 속성이 CSS width로도 먹어서 auto로 덮지 않으면 원본보다 크게 늘어나 깨진다. */}
        <Image
          className={css({
            width: "auto",
            maxH: IMAGE_MAX_HEIGHT,
          })}
          alt={alt || ""}
          src={createNotionImageUrl({
            fileUrl: src || "",
            width: IMAGE_SIZE.unExpanded,
            id: blockId,
          })}
          width={IMAGE_SIZE.unExpanded}
          height={IMAGE_SIZE.unExpanded}
        />
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content
          css={{
            w: "fit-content",
            maxW: DIALOG_MAX_WIDTH,
            minW: 0,
            maxH: DIALOG_MAX_HEIGHT,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Dialog.CloseTrigger
            css={{
              position: "absolute",
              top: "2",
              right: "2",
              padding: "1",
            }}
          >
            <X
              className={css({
                width: "1.5rem",
                height: "1.5rem",
              })}
            />
          </Dialog.CloseTrigger>
          <Image
            className={css({
              width: "auto",
              maxH: DIALOG_MAX_HEIGHT,
            })}
            alt={alt || ""}
            src={createNotionImageUrl({
              fileUrl: src || "",
              width: IMAGE_SIZE.expanded,
              id: blockId,
            })}
            width={IMAGE_SIZE.expanded}
            height={IMAGE_SIZE.expanded}
          />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}

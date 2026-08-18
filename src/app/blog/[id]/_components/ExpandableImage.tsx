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
        <Image
          className={css({
            display: "block",
            // 원본보다 크게 늘리면 깨지므로 auto로 두고 위아래 한계만 잡는다.
            width: "auto",
            height: "auto",
            aspectRatio: "auto",
            maxW: "full",
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
            w: "100%",
            maxW: DIALOG_MAX_WIDTH,
            minW: 0,
            maxH: "90vh",
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
              borderRadius: "full",
              backgroundColor: "neutral.1",
              boxShadow: "sm",
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
              width: "100%",
              height: "auto",
              maxW: "full",
              maxH: "90vh",
              objectFit: "contain",
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

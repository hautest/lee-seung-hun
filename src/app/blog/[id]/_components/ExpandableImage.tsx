import { createNotionImageUrl } from "@/lib/notion/createImageUrl";
import { Dialog } from "@/lib/ui/dialog";
import Image from "next/image";
import { css } from "styled-system/css";
import { X } from "lucide-react";

const SPACE = {
  lg: "8",
  md: "6",
  sm: "4",
  xs: "2",
};

const IMAGE_SIZE = {
  unExpanded: 600,
  expanded: 800,
};

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
          margin: "0 auto",
          marginBottom: SPACE.sm,
          cursor: "pointer",
        }}
      >
        <Image
          className={css({
            display: "block",
            margin: "0 auto",
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
            maxW: IMAGE_SIZE.expanded,
            minW: 0,
            aspectRatio: "1 / 1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Dialog.CloseTrigger
            css={{
              position: "absolute",
              top: "0",
              right: "0",
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
              width: "full",
              height: "auto",
              maxW: "full",
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

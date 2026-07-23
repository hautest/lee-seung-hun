import Image from "next/image";
import { Gamepad2, Star } from "lucide-react";
import { css } from "styled-system/css";
import { flex } from "styled-system/patterns";
import { createNotionImageUrl } from "@/lib/notion/createImageUrl";
import type { GameItem as GameItemType } from "@/lib/types/Game";
import { Text } from "@/lib/ui/Text";

export function GameItem({
  id,
  name,
  category,
  image,
  review,
  score,
}: GameItemType) {
  return (
    <article
      className={css({
        h: "full",
        overflow: "hidden",
        borderWidth: "1px",
        borderColor: "neutral.4",
        borderRadius: "xl",
        bg: "neutral.2",
        transition: "transform 160ms ease, border-color 160ms ease",
        _hover: {
          transform: "translateY(-4px)",
          borderColor: "neutral.7",
        },
      })}
    >
      <div
        className={css({
          position: "relative",
          aspectRatio: "16 / 10",
          overflow: "hidden",
          bg: "neutral.3",
        })}
      >
        {image ? (
          <Image
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            src={createNotionImageUrl({ fileUrl: image, id, width: 720 })}
            alt={`${name} 게임 이미지`}
            className={css({ objectFit: "cover" })}
          />
        ) : (
          <div
            className={flex({
              w: "full",
              h: "full",
              align: "center",
              justify: "center",
              color: "neutral.7",
            })}
          >
            <Gamepad2 size={52} strokeWidth={1.4} aria-hidden="true" />
          </div>
        )}

        {category && (
          <span
            className={css({
              position: "absolute",
              top: "3",
              left: "3",
              px: "2.5",
              py: "1.5",
              bg: "neutral.12",
              color: "neutral.1",
              borderRadius: "full",
              fontSize: "xs",
              fontWeight: "bold",
              letterSpacing: "0.06em",
            })}
          >
            {category}
          </span>
        )}
      </div>

      <div className={flex({ direction: "column", gap: "3", p: "5" })}>
        <div
          className={flex({
            align: "flex-start",
            justify: "space-between",
            gap: "3",
          })}
        >
          <Text
            as="h2"
            size="xl"
            css={{
              fontWeight: "bold",
              lineHeight: "1.3",
              letterSpacing: "-0.02em",
            }}
          >
            {name}
          </Text>

          {score !== undefined && (
            <span
              aria-label={`평점 ${score}점`}
              className={flex({
                align: "center",
                gap: "1",
                flexShrink: 0,
                color: "neutral.11",
                fontWeight: "bold",
              })}
            >
              <Star size={16} fill="currentColor" aria-hidden="true" />
              {score}
            </span>
          )}
        </div>

        {review && (
          <Text
            as="p"
            size="sm"
            css={{
              color: "neutral.10",
              lineHeight: "1.7",
              whiteSpace: "pre-wrap",
            }}
          >
            {review}
          </Text>
        )}
      </div>
    </article>
  );
}

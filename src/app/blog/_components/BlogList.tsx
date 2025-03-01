import { getBlogList } from "@/lib/notion/getBlogList";
import { BlogItem as BlogItemType } from "@/lib/types/Blog";
import Link from "next/link";
import { flex } from "styled-system/patterns";
import Image from "next/image";
import { createNotionImageUrl } from "@/lib/notion/createImageUrl";
import { Text } from "@/lib/ui/Text";
import { css } from "styled-system/css";
import dayjs from "dayjs";

const IMAGE_SIZE = 150;

function BlogItem({
  createdTime: _createdTime,
  description,
  id,
  thumbnail,
  title,
}: BlogItemType) {
  const titleId = `blog-item-title-${id}`;
  const descriptionId = `blog-item-desc-${id}`;
  const createdTime = dayjs(_createdTime).format("YYYY-MM-DD");

  return (
    <Link
      href={`/blog/${id}`}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      className={flex({
        py: "4",
        gap: "4",
        w: "full",
        alignItems: "flex-start",
        _active: {
          bg: "neutral.5",
        },
        _hover: {
          bg: "neutral.5",
        },
        _focus: {
          bg: "neutral.5",
        },
      })}
    >
      <div className={css({ w: IMAGE_SIZE, h: IMAGE_SIZE, flexShrink: 0 })}>
        <Image
          src={thumbnail || ""}
          alt={title || ""}
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
          className={css({
            objectFit: "contain",
          })}
        />
      </div>
      <div className={flex({ direction: "column" })}>
        <Text
          as="h2"
          css={{ color: "neutral.12", fontWeight: "medium" }}
          id={titleId}
          size="lg"
        >
          {title}
        </Text>
        <Text
          as="p"
          css={{ color: "neutral.11", marginBottom: "4" }}
          id={descriptionId}
          size="sm"
        >
          {description}
        </Text>
        <Text as="p" css={{ color: "neutral.9" }} size="xs">
          {createdTime}
        </Text>
      </div>
    </Link>
  );
}

export async function BlogList() {
  //TODO: 페이지네이션 추가
  const blogList = await getBlogList({ pageSize: 100 });

  return (
    <ul className={flex({ w: "full", direction: "column" })}>
      {blogList.map((blogItem) => (
        <li key={blogItem?.id} className={flex({ w: "full" })}>
          <BlogItem
            {...blogItem}
            thumbnail={createNotionImageUrl({
              fileUrl: blogItem?.thumbnail ?? "",
              id: blogItem?.id ?? "",
              width: IMAGE_SIZE,
            })}
          />
        </li>
      ))}
    </ul>
  );
}

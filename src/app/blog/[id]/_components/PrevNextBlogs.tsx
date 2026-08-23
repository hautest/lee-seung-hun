import { BlogItem } from "@/lib/types/Blog";
import { Text } from "@/lib/ui/Text";
import Link from "next/link";
import { cva } from "styled-system/css";
import { flex } from "styled-system/patterns";

interface PrevNextBlogsProps {
  prevBlog?: BlogItem | null;
  nextBlog?: BlogItem | null;
}

export function PrevNextBlogs({ prevBlog, nextBlog }: PrevNextBlogsProps) {
  return (
    <div
      className={flex({
        marginTop: "16",
        paddingTop: "10",
        paddingBottom: "20",
        borderTopWidth: "1px",
        borderTopColor: "neutral.6",
        justify: "space-between",
        w: "full",
        gap: "3",
        mobileDown: {
          flexDirection: "column",
        },
      })}
    >
      {prevBlog && (
        <Link
          className={styledLink({
            marginRightHalf: !nextBlog,
          })}
          href={`/blog/${prevBlog.id}`}
        >
          <Text size="xs" css={{ w: "full", opacity: 0.7 }}>
            이전글
          </Text>
          <Text size="md" css={{ fontWeight: "medium" }}>
            {prevBlog.title}
          </Text>
        </Link>
      )}
      {nextBlog && (
        <Link
          className={styledLink({
            marginLeftHalf: !prevBlog,
          })}
          href={`/blog/${nextBlog.id}`}
        >
          <Text size="xs" css={{ w: "full", opacity: 0.7 }}>
            다음글
          </Text>
          <Text size="md" css={{ fontWeight: "medium" }}>
            {nextBlog.title}
          </Text>
        </Link>
      )}
    </div>
  );
}

const styledLink = cva({
  base: {
    _hover: {
      color: "neutral.1",
      backgroundColor: "neutral.12",
    },
    _active: {
      color: "neutral.1",
      backgroundColor: "neutral.12",
    },
    _focus: {
      color: "neutral.1",
      backgroundColor: "neutral.12",
    },
    p: "4",
    gap: "1",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "neutral.6",
    borderRadius: "md",
    h: "full",
    w: "full",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
    mobileDown: {
      w: "full",
    },
  },
  variants: {
    marginLeftHalf: {
      true: {
        marginLeft: "50%",
        mobileDown: {
          marginLeft: "0",
        },
      },
    },
    marginRightHalf: {
      true: {
        marginRight: "50%",
        mobileDown: {
          marginRight: "0",
        },
      },
    },
  },
});

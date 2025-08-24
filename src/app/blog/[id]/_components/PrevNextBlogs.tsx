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
        marginTop: "20",
        py: "20",
        justify: "space-between",
        align: "center",
        w: "full",
        gap: "2",
        mobileDown: {
          flexDirection: "column",
          marginTop: "0",
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
          <Text size="sm" css={{ w: "full" }}>
            이전글
          </Text>
          <Text size="lg">{prevBlog.title}</Text>
        </Link>
      )}
      {nextBlog && (
        <Link
          className={styledLink({
            marginLeftHalf: !prevBlog,
          })}
          href={`/blog/${nextBlog.id}`}
        >
          <Text size="sm" css={{ w: "full" }}>
            다음글
          </Text>
          <Text size="lg">{nextBlog.title}</Text>
        </Link>
      )}
    </div>
  );
}

const styledLink = cva({
  base: {
    _hover: {
      color: "white",
      backgroundColor: "neutral.12",
    },
    _active: {
      color: "white",
      backgroundColor: "neutral.12",
    },
    _focus: {
      color: "white",
      backgroundColor: "neutral.12",
    },
    p: "4",
    borderWidth: "1",
    borderStyle: "solid",
    borderColor: "neutral.12",
    h: "full",
    w: "full",
    display: "flex",
    alignItems: "center",
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
      false: {
        marginLeft: "0",
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
      false: {
        marginRight: "0",
        mobileDown: {
          marginRight: "0",
        },
      },
    },
  },
});

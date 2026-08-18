"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { styled } from "styled-system/jsx";
import { flex } from "styled-system/patterns";

const ABOUT_URL = "/about" as Route;
const RESUME_URL = "/resume" as Route;
const BLOG_URL = "/blog" as Route;
const GAME_URL = "/game" as Route;

export function Header() {
  const pathname = usePathname();

  const isMatchUrl = (url: string) => {
    return pathname.includes(url);
  };

  return (
    <header
      // fixed로 두면 body 흐름 밖이라, 모달이 스크롤을 잠글 때 넣는
      // 스크롤바 폭 보정을 받지 못해 헤더만 옆으로 밀린다.
      className={flex({
        justify: "space-between",
        paddingY: "2",
        paddingX: "4",
        position: "sticky",
        top: 0,
        width: "full",
        backgroundColor: "neutral.1",
        zIndex: 100,
        mobileDown: {
          paddingX: "2",
        },
      })}
    >
      <StyledLink href="/">Seung Hun</StyledLink>
      <nav
        className={flex({
          gap: "2",
          mobileDown: {
            gap: "0.5",
          },
        })}
      >
        <StyledLink
          replace
          aria-current={isMatchUrl(ABOUT_URL) ? "page" : undefined}
          currentUrl={isMatchUrl(ABOUT_URL)}
          href={ABOUT_URL}
        >
          About
        </StyledLink>
        <StyledLink
          replace
          aria-current={isMatchUrl(RESUME_URL) ? "page" : undefined}
          currentUrl={isMatchUrl(RESUME_URL)}
          href={RESUME_URL}
        >
          Resume
        </StyledLink>
        <StyledLink
          replace
          aria-current={isMatchUrl(BLOG_URL) ? "page" : undefined}
          currentUrl={isMatchUrl(BLOG_URL)}
          href={BLOG_URL}
        >
          Blog
        </StyledLink>
        <StyledLink
          replace
          aria-current={isMatchUrl(GAME_URL) ? "page" : undefined}
          currentUrl={isMatchUrl(GAME_URL)}
          href={GAME_URL}
        >
          Game
        </StyledLink>
      </nav>
    </header>
  );
}

const StyledLink = styled(Link, {
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
    p: "2",
    fontWeight: "bold",
    whiteSpace: "nowrap",
    mobileDown: {
      p: "1.5",
      fontSize: "sm",
    },
  },
  variants: {
    currentUrl: {
      true: {
        textDecoration: "underline",
        textUnderlineOffset: "4px",
      },
      false: {
        textDecoration: "none",
      },
    },
  },
  defaultVariants: {
    currentUrl: false,
  },
});

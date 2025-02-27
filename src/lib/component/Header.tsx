"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { styled } from "styled-system/jsx";
import { flex } from "styled-system/patterns";

const ABOUT_URL = "/about";
const RESOME_URL = "/resome";
const BLOG_URL = "/blog";

export function Header() {
  const pathname = usePathname();

  const isMatchUrl = (url: string) => {
    return pathname.includes(url);
  };

  return (
    <header
      className={flex({
        justify: "space-between",
        paddingY: "2",
        paddingX: "4",
        position: "fixed",
        top: 0,
        width: "full",
        maxW: "1000px",
        backgroundColor: "neutral.1",
        zIndex: 2,
      })}
    >
      <StyledLink href="/">Seung Hun</StyledLink>
      <div
        className={flex({
          gap: "2",
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
          aria-current={isMatchUrl(RESOME_URL) ? "page" : undefined}
          currentUrl={isMatchUrl(RESOME_URL)}
          href={RESOME_URL}
        >
          Resome
        </StyledLink>
        <StyledLink
          replace
          aria-current={isMatchUrl(BLOG_URL) ? "page" : undefined}
          currentUrl={isMatchUrl(BLOG_URL)}
          href={BLOG_URL}
        >
          Blog
        </StyledLink>
      </div>
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
    p: "2",
    fontWeight: "bold",
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

import Link from "next/link";
import { styled } from "styled-system/jsx";
import { flex } from "styled-system/patterns";

export function Header() {
  return (
    <header
      className={flex({
        justify: "space-between",
        paddingY: "2",
        paddingX: "4",
        position: "fixed",
        top: 0,
        width: "full",
        maxW: "1200px",
        backgroundColor: "neutral.1",
      })}
    >
      <StyledLink href="/">Seung Hun</StyledLink>
      <div
        className={flex({
          gap: "2",
        })}
      >
        <StyledLink href="/about">About</StyledLink>
        <StyledLink href="/resome">Resome</StyledLink>
        <StyledLink href="/blog">Blog</StyledLink>
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
});

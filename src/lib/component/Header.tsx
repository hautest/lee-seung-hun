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
      backgroundColor: "colorPalette.default",
    },
    _active: {
      color: "white",
      backgroundColor: "colorPalette.default",
    },
    p: "2",
    fontWeight: "bold",
  },
});

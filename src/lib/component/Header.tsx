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
      })}
    >
      <StyledLink href="/">seung hun</StyledLink>
      <div
        className={flex({
          gap: "2",
        })}
      >
        <StyledLink href="/about">about</StyledLink>
        <StyledLink href="/resome">resome</StyledLink>
        <StyledLink href="/blog">blog</StyledLink>
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
    p: "2",
  },
});

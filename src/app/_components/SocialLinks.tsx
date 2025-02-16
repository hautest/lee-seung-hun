import { Text } from "@/lib/ui/Text";
import { Linkedin, Github } from "lucide-react";
import { ReactNode } from "react";
import { css } from "styled-system/css";
import { flex } from "styled-system/patterns";

const LINKEDIN_URL =
  "https://www.linkedin.com/in/%EC%8A%B9%ED%9B%88-%EC%9D%B4-87a18024a/";
const GITHUB_URL = "https://github.com/hautest";

interface SocialLinkProps {
  children: ReactNode;
  href: string;
}

function SocialLink({ children, href }: SocialLinkProps) {
  return (
    <a
      className={flex({
        fontSize: "0",
        p: "1",
        _hover: {
          color: "white",
          backgroundColor: "colorPalette.default",
        },
        _active: {
          color: "white",
          backgroundColor: "colorPalette.default",
        },
      })}
      href={href}
      target="_blank"
    >
      {children}
    </a>
  );
}

export function SocialLinks() {
  return (
    <Text
      css={{
        display: "flex",
        gap: "2",
        justifyContent: "center",
        animationName: "fade-in",
        animationDuration: "5s",
      }}
    >
      <SocialLink href={GITHUB_URL}>
        <Github
          className={css({
            w: "6",
            h: "6",
          })}
        />
      </SocialLink>
      <SocialLink href={LINKEDIN_URL}>
        <Linkedin
          className={css({
            w: "6",
            h: "6",
          })}
        />
      </SocialLink>
    </Text>
  );
}

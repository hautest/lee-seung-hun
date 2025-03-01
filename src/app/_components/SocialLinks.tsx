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
  ariaLabel: string;
}

function SocialLink({ children, href, ariaLabel }: SocialLinkProps) {
  return (
    <a
      aria-label={ariaLabel}
      className={flex({
        fontSize: "0",
        p: "1",
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
      <SocialLink href={GITHUB_URL} ariaLabel="깃허브로 바로가기">
        <Github
          className={css({
            w: "6",
            h: "6",
          })}
        />
      </SocialLink>
      <SocialLink href={LINKEDIN_URL} ariaLabel="링크드인으로 바로가기">
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

"use client";

import Cookies from "js-cookie";
import { Moon, Sun } from "lucide-react";
import { css } from "styled-system/css";

const THEME_COOKIE = "theme";

// 정적 export라 렌더 시점에 현재 테마를 알 수 없다. 상태를 React에 들지 않고
// 아이콘 두 개를 모두 렌더한 뒤 .dark 클래스로 하나만 노출해 hydration mismatch를 피한다.
// 아이콘은 현재 테마가 아니라 "누르면 바뀌는 테마"를 가리킨다.
const moonIcon = css({
  w: "5",
  h: "5",
  display: "block",
  _dark: { display: "none" },
});

const sunIcon = css({
  w: "5",
  h: "5",
  display: "none",
  _dark: { display: "block" },
});

export function ThemeToggle() {
  const handleClick = () => {
    const isDark = document.documentElement.classList.toggle("dark");

    Cookies.set(THEME_COOKIE, isDark ? "dark" : "light", {
      expires: 365,
      path: "/",
      sameSite: "lax",
    });
  };

  return (
    <button
      type="button"
      aria-label="테마 전환"
      onClick={handleClick}
      className={css({
        display: "flex",
        alignItems: "center",
        p: "2",
        cursor: "pointer",
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
        mobileDown: {
          py: "1.5",
          px: "1",
        },
      })}
    >
      <Moon className={moonIcon} />
      <Sun className={sunIcon} />
    </button>
  );
}

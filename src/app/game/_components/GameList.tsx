import { Gamepad2 } from "lucide-react";
import { css } from "styled-system/css";
import { flex } from "styled-system/patterns";
import { getGameList } from "@/lib/notion/getGameList";
import { Text } from "@/lib/ui/Text";
import { GameItem } from "./GameItem";

export async function GameList() {
  const games = await getGameList();

  if (games === null) {
    return (
      <section
        className={flex({
          direction: "column",
          align: "center",
          justify: "center",
          gap: "3",
          minH: "280px",
          px: "6",
          borderWidth: "1px",
          borderStyle: "dashed",
          borderColor: "neutral.6",
          borderRadius: "xl",
          textAlign: "center",
        })}
      >
        <Gamepad2 size={36} strokeWidth={1.5} aria-hidden="true" />
        <Text as="h2" size="lg" css={{ fontWeight: "bold" }}>
          게임 DB 연결을 확인해 주세요
        </Text>
        <Text
          as="p"
          size="sm"
          css={{ color: "neutral.9", maxW: "460px", lineHeight: "1.7" }}
        >
          Notion에서 이 데이터베이스를 웹사이트 integration에 공유한 뒤 다시
          빌드하면 게임 기록이 표시됩니다.
        </Text>
      </section>
    );
  }

  if (games.length === 0) {
    return (
      <section
        className={flex({
          direction: "column",
          align: "center",
          justify: "center",
          gap: "3",
          minH: "280px",
          px: "6",
          borderWidth: "1px",
          borderStyle: "dashed",
          borderColor: "neutral.6",
          borderRadius: "xl",
          textAlign: "center",
        })}
      >
        <Gamepad2 size={36} strokeWidth={1.5} aria-hidden="true" />
        <Text as="h2" size="lg" css={{ fontWeight: "bold" }}>
          첫 번째 게임을 기다리고 있어요
        </Text>
        <Text as="p" size="sm" css={{ color: "neutral.9" }}>
          Notion 게임 DB에 항목을 추가하면 이곳에 자동으로 표시됩니다.
        </Text>
      </section>
    );
  }

  return (
    <ul
      className={css({
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: "6",
        listStyle: "none",
        mobileDown: { gridTemplateColumns: "minmax(0, 1fr)" },
      })}
    >
      {games.map((game) => (
        <li key={game.id}>
          <GameItem {...game} />
        </li>
      ))}
    </ul>
  );
}

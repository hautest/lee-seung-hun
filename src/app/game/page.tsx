import type { Metadata } from "next";
import { flex } from "styled-system/patterns";
import { Text } from "@/lib/ui/Text";
import { GameList } from "./_components/GameList";

export const metadata: Metadata = {
  title: "게임 기록 | 이승훈",
  description: "직접 플레이한 게임과 짧은 감상을 모아둔 기록입니다.",
};

export default function GamePage() {
  return (
    <div
      className={flex({
        direction: "column",
        w: "full",
        pb: "16",
      })}
    >
      <section
        aria-labelledby="game-page-title"
        className={flex({ direction: "column", gap: "3" })}
      >
        <Text
          as="h1"
          id="game-page-title"
          size="xl"
          css={{ fontWeight: "bold" }}
        >
          게임 기록
        </Text>
        <Text
          as="p"
          size="md"
          css={{
            color: "neutral.10",
            maxW: "560px",
            mb: "4",
          }}
        >
          엔딩을 본 게임부터 오래 기억하고 싶은 순간까지, 직접 플레이한 게임과
          짧은 감상을 기록합니다.
        </Text>
      </section>

      <GameList />
    </div>
  );
}

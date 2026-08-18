import { css } from "styled-system/css";
import { getGameList } from "@/lib/notion/getGameList";
import { GameItem } from "./GameItem";

export async function GameList() {
  const games = await getGameList();

  return (
    <ul
      className={css({
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: "6",
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

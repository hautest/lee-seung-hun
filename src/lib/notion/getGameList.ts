import { isFullPage } from "@notionhq/client";
import type { GameCategory, GameItem } from "../types/Game";
import { notion } from "./notion";

const GAME_DATABASE_ID =
  process.env.NEXT_PUBLIC_NOTION_GAME_DATABASE_ID ??
  "3a3a463e83038001bfa1d39cce256bd5";

const GAME_CATEGORIES = new Set<GameCategory>(["PC", "닌텐도", "플스"]);

export async function getGameList(): Promise<GameItem[]> {
  const results: Awaited<
    ReturnType<typeof notion.databases.query>
  >["results"] = [];
  let startCursor: string | undefined;

  do {
    const response = await notion.databases.query({
      database_id: GAME_DATABASE_ID,
      sorts: [{ timestamp: "created_time", direction: "descending" }],
      start_cursor: startCursor,
    });

    results.push(...response.results);
    startCursor = response.has_more
      ? (response.next_cursor ?? undefined)
      : undefined;
  } while (startCursor);

  const games = results.flatMap((result) => {
    if (!isFullPage(result)) return [];

    const nameProperty = result.properties["이름"];
    const categoryProperty = result.properties.category;
    const imageProperty = result.properties.img;
    const reviewProperty = result.properties.review;
    const scoreProperty = result.properties.score;

    if (nameProperty?.type !== "title") return [];

    const name = nameProperty.title.map((text) => text.plain_text).join("");
    if (!name) return [];

    const categoryName =
      categoryProperty?.type === "select"
        ? categoryProperty.select?.name
        : undefined;
    const category = GAME_CATEGORIES.has(categoryName as GameCategory)
      ? (categoryName as GameCategory)
      : undefined;

    const imageFile =
      imageProperty?.type === "files" ? imageProperty.files[0] : undefined;
    const image = imageFile
      ? "file" in imageFile
        ? imageFile.file.url
        : imageFile.external.url
      : undefined;

    const review =
      reviewProperty?.type === "rich_text"
        ? reviewProperty.rich_text.map((text) => text.plain_text).join("")
        : undefined;
    const score =
      scoreProperty?.type === "number"
        ? (scoreProperty.number ?? undefined)
        : undefined;

    return [{ id: result.id, name, category, image, review, score }];
  });

  return games.sort((a, b) => {
    if (a.score === undefined && b.score === undefined) return 0;
    if (a.score === undefined) return 1;
    if (b.score === undefined) return -1;

    return b.score - a.score;
  });
}

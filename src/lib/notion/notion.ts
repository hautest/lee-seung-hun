import { Client } from "@notionhq/client";

export const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_KEY,
  notionVersion: "2022-06-28",
});

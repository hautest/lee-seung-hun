import { isFullPage } from "@notionhq/client";
import { notion } from "./notion";
import { BlogItem, Tag } from "../types/Blog";

interface GetBlogListParams {
  pageSize?: number;
}

export async function getBlogList(params?: GetBlogListParams) {
  const { pageSize = 10 } = params || {};

  const { results } = await notion.databases.query({
    database_id: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID as string,
    sorts: [
      {
        property: "id",
        direction: "descending",
      },
    ],
    page_size: pageSize,
  });

  const pageList: (BlogItem | undefined)[] | undefined = results.map(
    (result) => {
      if (isFullPage(result)) {
        if (
          result.properties.id.type === "number" &&
          result.properties.title.type === "title" &&
          result.properties.description.type === "rich_text" &&
          result.properties.thumbnail.type === "files" &&
          result.properties.thumbnail.files[0].type === "file" &&
          result.properties.tags.type === "multi_select"
        ) {
          return {
            createdTime: result.created_time,
            id: result.id,
            title: result.properties.title.title[0].plain_text,
            description: result.properties.description.rich_text[0].plain_text,
            thumbnail: result.properties.thumbnail.files[0].file.url,
            tags: result.properties.tags.multi_select.map(
              (tag) => tag.name
            ) as Tag[],
          };
        }
      }
    }
  );

  return pageList;
}

// if (result.properties.id.type === "unique_id") {
// }

//UniqueIdDatabasePropertyConfigResponse

//UniqueIdPropertyItemObjectResponse

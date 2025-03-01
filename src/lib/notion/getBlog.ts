import { NotionToMarkdown } from "notion-to-md";
import { notion } from "./notion";
import { MdBlock } from "notion-to-md/build/types";
import { isFullPage } from "@notionhq/client";

// notion api 쓸때 expire date가 있어서 배포한 notion에 있는 Image를 가져와야하는데, blockId가 필요해서 임시로 삽입해서 사용
export function altAddBlockId(str: string, blockId: string): string {
  return str.replace(/^(!?\[)([^\]]+)]/, `$1${blockId}:$2]`);
}

export async function getBlog(id: string) {
  const n2m = new NotionToMarkdown({ notionClient: notion });
  const mdBlocks = (await (
    await n2m.pageToMarkdown(id)
  ).map((block) => {
    if (block.type === "image") {
      return {
        ...block,
        parent: altAddBlockId(block.parent, block.blockId),
      };
    }
    return block;
  })) as MdBlock[];

  const page = await notion.pages.retrieve({
    page_id: id,
  });
  const metadata = {
    title: "",
    description: "",
  };

  if (isFullPage(page)) {
    if (
      page.properties.title.type === "title" &&
      page.properties.description.type === "rich_text"
    ) {
      metadata.title = page.properties.title.title[0].plain_text;
      metadata.description =
        page.properties.description.rich_text[0].plain_text;
    }
  }

  const mdString = n2m.toMarkdownString(mdBlocks);

  return { content: mdString.parent, metadata };
}

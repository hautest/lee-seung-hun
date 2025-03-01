import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Text } from "../ui/Text";
import { getBlogList } from "../notion/getBlogList";

export async function MarkdownRender() {
  // const { results } = await notion.databases.query({
  //   database_id: "1a5a463e8303804a99eeffdd738861d2" as string,
  // });

  // console.log(results);
  const pageList = await getBlogList();

  console.log(pageList);

  return (
    <Markdown
      components={{
        h1: ({ children }) => (
          <Text
            as="h1"
            css={{ fontWeight: "bold", marginBottom: "4" }}
            size="3xl"
          >
            {children}
          </Text>
        ),
      }}
      remarkPlugins={[remarkGfm]}
    >
      {/* {content} */}
    </Markdown>
  );
}

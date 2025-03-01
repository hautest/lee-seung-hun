import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Text } from "../ui/Text";

export async function MarkdownRender() {
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

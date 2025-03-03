import { Text } from "@/lib/ui/Text";
import { flex } from "styled-system/patterns";
import { BlogList } from "./_components/BlogList";
export default async function BlogPage() {
  return (
    <div className={flex({ direction: "column", gap: "8", w: "full" })}>
      <Text as="h1" css={{ fontWeight: "bold" }} size="xl">
        프론트엔드 개발자 이승훈 블로그
      </Text>
      <BlogList />
    </div>
  );
}

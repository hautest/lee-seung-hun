import { Text } from "@/lib/ui/Text";
import { ReactNode } from "react";
import { flex } from "styled-system/patterns";

interface ContentItemProps {
  children: ReactNode;
}

function ContentItem({ children }: ContentItemProps) {
  return (
    <Text
      css={{
        listStyle: "inside",
        textIndent: "1.5",
      }}
      as="li"
    >
      {children}
    </Text>
  );
}

interface ContentListProps {
  children: ReactNode;
  title: string;
}

export function ContentList({ children, title }: ContentListProps) {
  return (
    <div className={flex({ flexDir: "column", gap: "2" })}>
      <Text size="lg" css={{ fontWeight: "medium" }} as="h2">
        {title}
      </Text>
      <ul className={flex({ flexDir: "column", gap: "0.5" })}>{children}</ul>
    </div>
  );
}

ContentList.Item = ContentItem;

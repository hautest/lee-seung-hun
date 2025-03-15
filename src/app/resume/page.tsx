import { Text } from "@/lib/ui/Text";
import { DownloadButton } from "./_components/DownloadButton";
import { flex } from "styled-system/patterns";
import { Divider } from "styled-system/jsx";
import { Resume } from "./_components/Resume";

export default function ResumePage() {
  return (
    <div className={flex({ flexDir: "column", gap: "4" })}>
      <div className={flex({ flexDir: "column", gap: "4" })}>
        <Text as="h1" css={{ fontWeight: "bold" }} size="xl">
          프론트엔드 개발자 이승훈 이력서
        </Text>
        <DownloadButton />
        <Divider />
      </div>
      <Resume />
    </div>
  );
}

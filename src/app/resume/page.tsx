import { Text } from "@/lib/ui/Text";
import { DownloadButton } from "./_components/DownloadButton";
import { flex } from "styled-system/patterns";
import { Divider } from "styled-system/jsx";
import { Resume } from "./_components/Resume";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "프론트엔드 개발자 이승훈 이력서",
  description:
    "프론트엔드 개발자 이승훈 이력서입니다. 이력서를 조회, 다운로드 받을 수 있습니다.",
};

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

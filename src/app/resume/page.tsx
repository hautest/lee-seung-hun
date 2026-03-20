import { Text } from "@/lib/ui/Text";
import { DownloadButton } from "./_components/DownloadButton";
import { flex } from "styled-system/patterns";
import { Divider } from "styled-system/jsx";
import { ResumeContent } from "./_components/ResumeContent";
import { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";

export const metadata: Metadata = {
  title: "프론트엔드 개발자 이승훈 이력서",
  description:
    "프론트엔드 개발자 이승훈 이력서입니다. 이력서를 조회, 다운로드 받을 수 있습니다.",
};

export default function ResumePage() {
  const content = readFileSync(
    join(process.cwd(), "public", "resume.md"),
    "utf-8"
  );

  return (
    <div className={flex({ flexDir: "column", gap: "4", pb: "16" })}>
      <div
        className={flex({
          flexDir: "column",
          gap: "4",
          _print: { display: "none" },
        })}
      >
        <Text as="h1" css={{ fontWeight: "bold" }} size="xl">
          프론트엔드 개발자 이승훈 이력서
        </Text>
        <div className={flex({ gap: "4", w: "full", justify: "center" })}>
          <DownloadButton />
        </div>
        <Divider />
      </div>
      <ResumeContent content={content} />
    </div>
  );
}

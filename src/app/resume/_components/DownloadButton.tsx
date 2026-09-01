"use client";

import { Button } from "@/lib/ui/Button";

export function DownloadButton() {
  const handleDownload = () => {
    // 인쇄 다이얼로그의 "PDF로 저장" 파일명은 document.title을 따른다
    const originalTitle = document.title;
    document.title = "이승훈_이력서";
    window.print();
    document.title = originalTitle;
  };

  return (
    <Button
      variant="solid"
      css={{
        colorPalette: "neutral",
        width: "fit",
        alignSelf: "center",
        px: "8",
      }}
      onClick={handleDownload}
    >
      PDF 다운로드
    </Button>
  );
}

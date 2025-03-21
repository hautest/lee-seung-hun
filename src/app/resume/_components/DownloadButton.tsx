import { Button } from "@/lib/ui/Button";

export function DownloadButton() {
  return (
    <Button
      variant="solid"
      css={{
        colorPalette: "neutral",
        width: "fit",
        alignSelf: "center",
        px: "8",
      }}
      asChild
    >
      <a href="/이승훈_이력서.zip" download>
        다운로드
      </a>
    </Button>
  );
}

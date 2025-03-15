import { Button } from "@/lib/ui/Button";

export function DownloadButton() {
  return (
    <Button
      variant="solid"
      css={{ colorPalette: "neutral", width: "fit", alignSelf: "center" }}
      asChild
    >
      <a href="/이승훈_이력서.zip" download>
        이력서 PDF로 다운로드
      </a>
    </Button>
  );
}

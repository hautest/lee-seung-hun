import { Button } from "@/lib/ui/Button";

export function DownloadButton() {
  return (
    <Button
      variant="solid"
      css={{ colorPalette: "neutral", width: "fit", alignSelf: "center" }}
    >
      이력서 PDF로 다운로드
    </Button>
  );
}

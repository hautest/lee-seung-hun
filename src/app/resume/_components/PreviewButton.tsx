import { Button } from "@/lib/ui/Button";

export function PreviewButton() {
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
      <a
        target="_blank"
        href="https://docs.google.com/viewerng/viewer?url=https://lee-seung-hun.com/%EC%9D%B4%EC%8A%B9%ED%9B%88_%EC%9D%B4%EB%A0%A5%EC%84%9C.pdf"
      >
        미리보기
      </a>
    </Button>
  );
}

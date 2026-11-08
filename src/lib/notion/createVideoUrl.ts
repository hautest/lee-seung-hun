import { NOTION_PUBLIC_URL } from "./constants";

interface CreateNotionVideoUrlParams {
  fileUrl: string;
  id: string;
}

// /signed/는 요청마다 새로 서명한 파일 URL로 302 리다이렉트해서, 만료되는 S3 URL 대신 계속 쓸 수 있다.
export function createNotionVideoUrl({
  fileUrl,
  id,
}: CreateNotionVideoUrlParams): string {
  const encodedUrl = encodeURIComponent(fileUrl.split("?")[0]);

  return `${NOTION_PUBLIC_URL}/signed/${encodedUrl}?table=block&id=${id}&cache=v2`;
}

import { NOTION_PUBLIC_URL } from "./constants";

interface CreateNotionImageUrlParams {
  fileUrl: string;
  id: string;
  width?: number;
}

export function createNotionImageUrl({
  fileUrl,
  id,
  width,
}: CreateNotionImageUrlParams): string {
  const encodedUrl = encodeURIComponent(fileUrl.split("?")[0]);

  return `${NOTION_PUBLIC_URL}/image/${encodedUrl}?table=block&id=${id}&cache=v2&width=${width}`;
}

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

  return `https://nimble-monkey-1a1.notion.site/image/${encodedUrl}?table=block&id=${id}&cache=v2&width=${width}`;
}

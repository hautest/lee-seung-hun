export type Tag =
  | "React"
  | "Next.js"
  | "TypeScript"
  | "Tailwind CSS"
  | "Node.js";

export interface BlogItem {
  id?: string;
  title?: string;
  description?: string;
  thumbnail?: string;
  tags?: Tag[];
  publishDate?: string;
}

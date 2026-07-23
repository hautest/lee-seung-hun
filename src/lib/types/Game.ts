export type GameCategory = "PC" | "닌텐도" | "플스";

export interface GameItem {
  id: string;
  name: string;
  category?: GameCategory;
  image?: string;
  review?: string;
  score?: number;
}

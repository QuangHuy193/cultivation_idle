import { CharacterStats } from "./characterTypes";

export interface Item {
  _id: string;
  name: string;
  rarity: string;
  type: string;
  stats: CharacterStats;
  sellPrice: number;
  icon: string;
  description: string;
  level: number;
  buff: Buff;
  quantity: number;
}

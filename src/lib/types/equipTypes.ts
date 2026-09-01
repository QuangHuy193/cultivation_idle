import { CharacterStats } from "./characterTypes";

export interface Equip {
  _id: string;
  name: string;
  rarity: string;
  type: string;
  stats: CharacterStats;
  sellPrice: number;
  icon: string;
  level: number;
}
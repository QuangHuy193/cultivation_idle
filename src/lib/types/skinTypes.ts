import { CharacterStats } from "./characterTypes";

export interface Skin {
  _id: string;
  name: string;
  icon: string;
  rarity: string;
  price: {
    number: number;
    unity: string;
  };
  buffs: CharacterStats;
}
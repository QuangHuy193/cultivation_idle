import { Droppable } from "./mapTypes";

export interface Monster {
  _id: string;
  name: string;
  rarity: string;
  icon: string;
  stats: {
    hp: number;
    atk: number;
    def: number;
  };
  realmReward: number;
  droppable: Droppable;
}

import { Item } from "./itemTypes";

export interface ClassLevel {
  level: number;
  name: string;
  requiredExp: number;
  buffs: {
    hp: number;
    atk: number;
    def: number;
    skill: number;
  };
}

export interface Class {
  _id: string;
  name: string;
  icon: string;
  description: string;
  typeSkillBuff: string;
  levels: [ClassLevel];
}

export interface ClassMission {
  _id: string;

  name: string;
  description: string;

  itemId: Item;

  baseQuantity: number;

  expReward: number;
}
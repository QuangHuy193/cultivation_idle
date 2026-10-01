import { CharacterStats } from "./characterTypes";

export interface RealmLevels {
  name: string;
  order: number;
  cultivationRequired: number;
  buffs: CharacterStats;
}

export interface Realm {
  _id: string;
  name: string;
  order: number;
  maxLevel: number;
  levels: [RealmLevels];
  createdAt: string;
  updatedAt: string;
}

export interface RealmNameList {
  _id: string;
  name: string;
  order: number;
}

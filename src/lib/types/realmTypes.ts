export interface RealmLevels {
  name: string;
  order: number;
  cultivationRequired: number;
  hpBonus: number;
  atkBonus: number;
  defBonus: number;
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

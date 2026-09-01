export interface Realm {
  _id: string;
  name: string;
  order: number;
  maxLevel: number;
  cultivationRequired: number;
  hpBonus: number;
  atkBonus: number;
  defBonus: number;
  createdAt: string;
  updatedAt: string;
}
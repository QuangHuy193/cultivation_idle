import { MonstersResponse } from "./battleTypes";
import { Realm } from "./realmTypes";

export interface MapsResponse {
  _id: string;
  name: string;
  icon: string;
  order: number;
  maxStage: number;
  requiredRealm: Realm;
  monsterStatMultiplier: number;
  rewardMultiplier: number;
  cultivationPerSecondBouns: number;
  monsters: MonstersResponse[];
}
import { Class, ClassMission } from "./classTypes";
import { Equip } from "./equipTypes";
import { Item } from "./itemTypes";
import { MapsResponse } from "./mapTypes";
import { Realm } from "./realmTypes";
import { Skill } from "./skillTypes";
import { Skin } from "./skinTypes";

export interface CharacterStats {
  atk: number;
  hp: number;
  def: number;
}

export interface CharacterAllStats {
  base: CharacterStats;

  equips: CharacterStats;

  skins: CharacterStats;

  items: CharacterStats;

  realm: CharacterStats;

  class: CharacterStats;
}

export interface CharacterEquipments {
  weapon?: Equip;
  helmet?: Equip;
  armor?: Equip;
  ring?: Equip;
  necklace?: Equip;
  boots?: Equip;
}

export interface CharacterInventoryItem {
  equips: Array<{ equipId: Equip }> | [];
  items: Array<{ itemId: Item; quantity: number }> | [];
  skills: Array<{ skillId: Skill; level: number; shard: number }> | [];
  skins: Array<{ skinId: Skin }> | [];
}

export interface CultivationPerSecond {
  base: number;
  fromMap: number;
  fromItem: number;
  fromVip: number;
}

export interface CurentMapMap {
  _id: string;
  name: string;
  order: number;
  icon: string;
  maxStage: number;
}

export interface CurrentMap {
  map: CurentMapMap;
  stage: number;
}

export interface CharacterClass {
  classId: Class;
  classLevelCharacter: number;
  exp: number;
}

export interface ProgressMapResponse {
  currentMapId: string;
  currentStage: number;
  maps: MapsResponse[];
}

export interface CharacterClassMission {
  _id: string;
  characterId: string;
  missionId: ClassMission;
  description: string;
  rarity: string;
  quantity: number;
  rewardExp: number;
  status: "pending" | "completed" | "claimed";
  date: string;
}

export interface CharacterResponse {
  _id: string;
  userId: string;
  name: string;
  skinId: Skin;
  class: CharacterClass;
  realmId?: Realm;
  realmLevel?: number;
  cultivation: number;
  currentMap: CurrentMap;
  cultivationPerSecond: CultivationPerSecond;
  spiritStone: number;
  stats: CharacterAllStats;
  finalStats?: CharacterStats;
  equippedSkills: Array<{ skillId: string; slot: number }>;
  equipments: CharacterEquipments;
  inventory: CharacterInventoryItem;
  lastOnlineAt: string;
  breakthroughRequired?: number;
  canBreakthrough?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
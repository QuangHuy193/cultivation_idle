import { Class, ClassMission } from "./classTypes";
import { Equip } from "./equipTypes";
import { Item } from "./itemTypes";
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

export interface SkillItemInInventory {
  skillId: Skill;
  level: number;
  shard: number;
}

export interface ItemItemInInventory {
  itemId: Item;
  quantity: number;
}

export interface EquipItemInInventory {
  equipId: Equip;
}

export interface SkinItemInInventory {
  skinId: Skin;
}

export interface CharacterInventoryItem {
  equips: Array<EquipItemInInventory> | [];
  items: Array<ItemItemInInventory> | [];
  skills: Array<SkillItemInInventory> | [];
  skins: Array<SkinItemInInventory> | [];
}

export interface CultivationPerMinute {
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

export interface SkillInEquippedSkills {
  skillId: string;
  slot: number;
}

export interface DailyLoginInCharacter {
  total: number;
  rewardDay: number;
  lastClaimAt: string;
}

export interface CharacterResponse {
  _id: string;
  userId: string;
  name: string;
  countChangeName: number;
  skinId: Skin;
  class: CharacterClass;
  realmId: Realm;
  realmLevel: number;
  cultivation: number;
  currentMap: CurrentMap;
  cultivationPerMinute: CultivationPerMinute;
  cultivationOffline: number;
  timeReawrdOffline: number;
  spiritStone: number;
  stats: CharacterAllStats;
  finalStats?: CharacterStats;
  equippedSkills: Array<SkillInEquippedSkills>;
  equipments: CharacterEquipments;
  inventory: CharacterInventoryItem;
  dailyLogin: DailyLoginInCharacter;
  lastOnlineAt: string;
  breakthroughRequired?: number;
  canBreakthrough?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

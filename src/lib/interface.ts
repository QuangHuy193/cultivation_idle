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

interface Buff {
  statBonus: {
    hp: number;
    attack: number;
    defense: number;
  };
  realmBonus: {
    realm: number;
  };
}

export interface Item {
  _id: string;
  name: string;
  rarity: string;
  type: string;
  stats: CharacterStats;
  sellPrice: number;
  icon: string;
  description: string;
  level: number;
  buff: Buff;
  quantity: number;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SignInResponse {
  user: User;
  token: string;
}

export interface CharacterStats {
  hp: number;
  attack: number;
  defense: number;
}

export interface CharacterEquipments {
  weapon?: Equip;
  helmet?: Equip;
  armor?: Equip;
  ring?: Equip;
  necklace?: Equip;
  boots?: Equip;
}

export interface SkillLevel {
  level: number;
  attackPower: number;
  upgradeCost: number;
}

export interface Skill {
  _id: string;
  name: string;
  icon: string;
  description: string;
  rarity: string;
  cooldown: number;
  maxLevel: number;
  levels: SkillLevel[];
}

export interface CharacterInventoryItem {
  equips: Array<{ equipId: Equip }> | [];
  items: Array<{ itemId: Item; quantity: number }> | [];
  skills: Array<{ skillId: Skill; level: number; shard: number }> | [];
}

export interface Realm {
  _id: string;
  name: string;
  order: number;
  maxLevel: number;
  cultivationRequired: number;
  hpBonus: number;
  attackBonus: number;
  defenseBonus: number;
  createdAt: string;
  updatedAt: string;
}

export interface CultivationPerSecond {
  base: number;
  fromMap: number;
  fromItem: number;
  fromVip: number;
}

export interface CurrentMap {
  map: string;
  stage: number;
}

export interface Skin {
  _id: string;
  name: string;
  icon: string;
  bg: string;
  rarity: string;
  price: {
    number: number;
    unity: string;
  };
  buffs: CharacterStats;
}

export interface CharacterResponse {
  _id: string;
  userId: string;
  name: string;
  skinId: Skin;
  realmId?: Realm;
  realmLevel?: number;
  cultivation: number;
  currentMap: CurrentMap;
  cultivationPerSecond: CultivationPerSecond;
  spiritStone: number;
  stats: CharacterStats;
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

export interface MonstersResponse {
  monsterId: {
    _id: string;
    name: string;
    rarity: string;
    icon: string;
    stats: {
      hp: number;
      attack: number;
      defense: number;
    };
    expReward: number;
    spiritStoneReward: number;
    dropTable: Array<{ itemId: string; chance: number }>;
  };
  weight: number;
}

export interface MapsResponse {
  _id: string;
  name: string;
  icon: string;
  order: number;
  maxStage: number;
  requiredRealm: string;
  monsterStatMultiplier: number;
  rewardMultiplier: number;
  cultivationPerSecondBouns: number;
  monsters: MonstersResponse[];
}

export interface ProgressMapResponse {
  currentMapId: string;
  currentStage: number;
  maps: MapsResponse[];
}

///
export interface BattleSkill {
  skillId: string;
  currentCooldown: number;
}

export interface BattleMonster {
  id: string;
  name: string;
  icon: string;

  hp: number;
  maxHp: number;

  attack: number;
  defense: number;
}

export interface BattleState {
  turn: number;

  playerHp: number;
  playerMaxHp: number;

  monster: BattleMonster;

  skills: BattleSkill[];

  battleStatus: string; //"fighting" | "win" | "lose"

  logs: string[];
}

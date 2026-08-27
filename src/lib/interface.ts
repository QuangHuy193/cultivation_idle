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
    atk: number;
    def: number;
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
  skins: Array<{ skinId: Skin }> | [];
}

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

export interface CharacterClass {
  classId: Class;
  classLevelCharacter: number;
  exp: number;
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

export interface MonstersResponse {
  monsterId: {
    _id: string;
    name: string;
    rarity: string;
    icon: string;
    stats: {
      hp: number;
      atk: number;
      def: number;
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
  requiredRealm: Realm;
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

export interface BattleSkill {
  skillId: string;
  currentCooldown: number;
}

export interface BattleMonster {
  monsterId: string;
  name: string;
  icon: string;

  hp: number;
  maxHp: number;

  atk: number;
  def: number;
}

export interface Log {
  name: string;
  enemyName: string;
  dmg: number;
  skill: string;
}

export interface BattleState {
  _id: string;

  characterId: string;

  turn: number;

  playerHp: number;
  playerMaxHp: number;

  monster: BattleMonster;

  skills: BattleSkill[];

  mapId: string;

  stage: number;

  battleStatus: string; //"fighting" | "win" | "lose"

  lastTurnAt: Date;

  logs: Log[];
}

import { CharacterResponse, CurrentMap } from "./characterTypes";
import { Equip } from "./equipTypes";
import { Item } from "./itemTypes";
import { RewardItems } from "./mapTypes";
import { Monster } from "./monsterTypes";
import { Skill } from "./skillTypes";
import { Skin } from "./skinTypes";

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

export interface SkillInBattle {
  skillId: string;
  currentCooldown: number;
}

export interface BattleRewards extends RewardItems {
  realmReward: number;
  spiritStoneReward: number;
}

export interface ResponseRewardBattleApi {
  character: Partial<CharacterResponse>;
  rewards: BattleRewards;
}
export interface Turn {
  turn: number;
  playerHp: number;
  monsterHp: number;
  logs: Log[];
}

export interface ResponseTurns {
  battleStatus: string;
  turns: Turn[];
  reason?: string;
}

export interface BattleState {
  _id: string;

  characterId: string;

  battleType: "mainStage" | "wildMap" | string;

  turn: number;

  playerHp: number;

  playerMaxHp: number;

  monster: BattleMonster;

  skills: SkillInBattle[];

  mapId: string;

  stage: number;

  battleStatus: string; //"fighting" | "win" | "lose"

  lastTurnAt: string;

  logs: Log[];
}

export interface MonstersResponse {
  monsterId: Monster;
}

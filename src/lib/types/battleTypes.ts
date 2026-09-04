import { Monster } from "./monsterTypes";

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

export interface BattleSkill {
  skillId: string;
  currentCooldown: number;
}


export interface BattleState {
  _id: string;

  characterId: string;

  battleType: "mainStage" | "wildMap";

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


export interface MonstersResponse {
  monsterId: Monster
}
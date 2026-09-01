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
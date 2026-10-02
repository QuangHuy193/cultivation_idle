export interface SproutStatSchema {
  atk: number;
  hp: number;
  def: number;
}

export interface SproutLevelSchema {
  name: string;
  maxStatLevel: number;
  statPerLevel: SproutStatSchema;
  goldCostPerLevel: number;
  itemCostPerLevel?: {
    itemId: string;
    quantity: number;
  };
}

export interface Sprout {
  _id: string;
  name: string;
  maxLevel: number;
  levels: SproutLevelSchema[];
}

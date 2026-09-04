import { MonstersResponse } from "./battleTypes";
import { Equip } from "./equipTypes";
import { Item } from "./itemTypes";
import { Realm } from "./realmTypes";
import { Skill } from "./skillTypes";
import { Skin } from "./skinTypes";

export interface Droppable {
  spiritStone: {
    amount: number;
    chance: number;
  };

  items: [
    {
      itemId: Item;
      quantity: number;
    },
  ];
  equips: [
    {
      equipId: Equip;
      quantity: number;
    },
  ];
  skills: [
    {
      skillId: Skill;
      quantity: number;
    },
  ];
  skins: [
    {
      skinId: Skin;
      quantity: number;
    },
  ];
}

export interface MapsResponse {
  _id: string;
  name: string;
  icon: string;
  order: number;
  maxStage: number;
  requiredRealm: Realm;
  monsterStatMultiplier: number;
  cultivationPerMinuteBouns: number;
  stages: [
    {
      stage: number;
      monsterId: MonstersResponse;
      firstClearReward: {
        cultivation: number;
        rewards: Droppable;
      };
    },
  ];
}

import { CharacterStats } from "./characterTypes";

export const ITEM_TYPE = {
  CONSUMABLE: "consumable",
  MATERIAL: "material",
  QUEST: "quest",
  BUFF: "buff",
} as const;

export const ITEM_USE_TYPE = {
  CULTIVATION_CARD: "cultivation_card", // thẻ tăng tu vi theo cảnh giới
  CULTIVATION: "cultivation", // vật phẩm tăng tu vi cố định
  ATK_PERMANENT: "atk_permanent", // vật phẩm tăng tấn công vĩnh viễn
  HP_PERMANENT: "hp_permanent", // vật phẩm tăng tấn công vĩnh viễn
  DEF_PERMANENT: "def_permanent", // vật phẩm tăng tấn công vĩnh viễn
  MATERIAL: "material", // nguyên liệu nâng cấp,...
} as const;

export type ItemType = (typeof ITEM_TYPE)[keyof typeof ITEM_TYPE];

export type ItemUseType = (typeof ITEM_USE_TYPE)[keyof typeof ITEM_USE_TYPE];

interface Buff {
  statBonus: {
    hp: number;
    atk: number;
    def: number;
    time: { value: number; unit: string };
  };
  cultivationBonus: {
    cultivation: number;
    cultivationMultipleForRealm: [
      {
        order: number;
        multiple: number;
      },
    ];
  };
}

export interface Item {
  _id: string;
  name: string;
  rarity: string;
  type: ItemType;
  typeUse: ItemUseType;
  stats: CharacterStats;
  sellPrice: number;
  icon: string;
  description: string;
  level: number;
  buff: Buff;
  quantity: number;
}

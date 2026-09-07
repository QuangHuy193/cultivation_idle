import { Types } from "mongoose";
import { ICharacter } from "./models/Character";

export const characterPopulate = [
  { path: "realmId" },
  { path: "currentMap.map", select: "_id icon name order maxStage" },
  { path: "skinId" },
  { path: "class.classId" },
  { path: "equipments.weapon" },
  { path: "equipments.helmet" },
  { path: "equipments.armor" },
  { path: "equipments.ring" },
  { path: "equipments.necklace" },
  { path: "equipments.boots" },
  { path: "inventory.equips.equipId" },
  { path: "inventory.items.itemId" },
  { path: "inventory.skills.skillId" },
  { path: "inventory.skins.skinId" },
];

export const mapPopulate = [
  { path: "stages.monsterId" },
  { path: "stages.firstClearReward.rewards.items.itemId" },
  { path: "stages.firstClearReward.rewards.equips.equipId" },
  { path: "stages.firstClearReward.rewards.skills.skillId" },
  { path: "stages.firstClearReward.rewards.skins.skinId" },
];

export const equipmentPopulate = [
  { path: "equipments.weapon" },
  { path: "equipments.helmet" },
  { path: "equipments.armor" },
  { path: "equipments.ring" },
  { path: "equipments.necklace" },
  { path: "equipments.boots" },
];

// tính chỉ số cuối của nhân vật
export const calculateCharacterStats = (character: ICharacter) => {
  const sources = [
    character.stats?.base,
    character.stats?.equips,
    character.stats?.skins,
    character.stats?.items,
    character.stats?.realm,
  ];

  const finalStats = sources.reduce(
    (total, stat) => ({
      hp: total.hp + (stat?.hp || 0),
      atk: total.atk + (stat?.atk || 0),
      def: total.def + (stat?.def || 0),
    }),
    {
      hp: 0,
      atk: 0,
      def: 0,
    },
  );

  return { finalStats };
};

// thêm đột phá nếu tu vi vượt ngưỡng
export function addBreakthroughInfo(character: any) {
  const breakthroughRequired = character.realmId?.cultivationRequired ?? 0;

  const canBreakthrough = character.cultivation >= breakthroughRequired;

  return {
    ...character,
    breakthroughRequired,
    canBreakthrough,
  };
}

// tỉ lệ rơi
export const rollChance = (chance: number): boolean => {
  return Math.random() * 100 < chance;
};

// cập nhật thưởng cho nhân vật
export const grantRewards = async (
  character,
  rewards: {
    cultivation?: number;
    spiritStone?: number;

    items?: {
      itemId: Types.ObjectId;
      quantity: number;
    }[];

    equips?: {
      equipId: Types.ObjectId;
      quantity: number;
    }[];

    skills?: {
      skillId: string;
      quantity?: number;
    }[];

    skins?: {
      skinId: string;
      quantity?: number;
    }[];
  },
) => {
  // linh thạch + tu vi
  character.cultivation += rewards.cultivation || 0;
  character.spiritStone += rewards.spiritStone || 0;

  // items
  for (const reward of rewards.items || []) {
    const inventoryItem = character.inventory.items.find(
      (i: any) => i.itemId.toString() === reward.itemId.toString(),
    );

    if (inventoryItem) {
      inventoryItem.quantity += reward.quantity;
    } else {
      character.inventory.items.push({
        itemId: reward.itemId,
        quantity: reward.quantity,
      });
    }
  }

  // equips
  for (const reward of rewards.equips || []) {
    for (let i = 0; i < reward.quantity; i++) {
      character.inventory.equips.push({
        equipId: reward.equipId,
      });
    }
  }

  // skills
  for (const reward of rewards.skills || []) {
    const inventorySkill = character.inventory.skills.find(
      (s: any) => s.skillId === reward.skillId,
    );

    if (inventorySkill) {
      inventorySkill.shard += reward.quantity || 1;
    } else {
      character.inventory.skills.push({
        skillId: reward.skillId,
        level: 1,
        shard: 0,
      });
    }
  }

  // skins
  for (const reward of rewards.skins || []) {
    const existed = character.inventory.skins.some(
      (s: any) => s.skinId === reward.skinId,
    );

    if (!existed) {
      character.inventory.skins.push({
        skinId: reward.skinId,
      });
    }
  }

  return character;
};

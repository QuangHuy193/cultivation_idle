import { ICharacter } from "./models/Character";

export const characterPopulate = [
  { path: "realmId" },
  { path: "currentMap.map", select: "_id icon name order maxStage" },
  { path: "skinId" },
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

export const equipmentPopulate = [
  { path: "equipments.weapon" },
  { path: "equipments.helmet" },
  { path: "equipments.armor" },
  { path: "equipments.ring" },
  { path: "equipments.necklace" },
  { path: "equipments.boots" },
];

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

export function addBreakthroughInfo(character: any) {
  const breakthroughRequired = character.realmId?.cultivationRequired ?? 0;

  const canBreakthrough = character.cultivation >= breakthroughRequired;

  return {
    ...character,
    breakthroughRequired,
    canBreakthrough,
  };
}

// export function buildCharacterResponse(character: any) {
//   const realm = character.realmId;

//   return {
//     ...character,

//     breakthroughRequired:
//       realm?.cultivationRequired ?? 0,

//     canBreakthrough:
//       character.cultivation >=
//       (realm?.cultivationRequired ?? Infinity),
//   };
// }

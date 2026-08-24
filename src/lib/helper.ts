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

export const calculateCharacterStats = (character: any) => {
  let hp = character.stats.hp;
  let attack = character.stats.attack;
  let defense = character.stats.defense;

  // bonus cảnh giới
  if (character.realmId) {
    hp += character.realmId.hpBonus;
    attack += character.realmId.attackBonus;
    defense += character.realmId.defenseBonus;
  }

  // bonus trang bị
  Object.values(character.equipments || {}).forEach((equip) => {
    if (!equip) return;

    hp += equip.stats?.hp || 0;
    attack += equip.stats?.attack || 0;
    defense += equip.stats?.defense || 0;
  });

  return {
    finalStats: {
      hp,
      attack,
      defense,
    },
  };
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

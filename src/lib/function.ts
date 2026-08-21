const castSkill = (
  skillInventory,
  monster,
) => {
  const currentLevel =
    skillInventory.skillId.levels.find(
      (lv) =>
        lv.level === skillInventory.level,
    );

  const damage =
    Math.floor(
      character.finalStats.attack *
        (currentLevel.attackPower /
          100),
    );

  const finalDamage = Math.max(
    damage - monster.defense,
    1,
  );

  return finalDamage;
};

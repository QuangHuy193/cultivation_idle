import { BattleState } from "./../lib/interface";
import { Log } from "@/lib/interface";

export const playerTurn = (battle, character, currentMonster, updateBattle) => {
  updateBattle((battle) => {
    if (battle.battleStatus === "lose" || battle.playerHp <= 0) {
      return battle;
    }

    const newLogs: Log[] = [];

    const newSkills = [...battle.skills];
    let totalDamage = 0;

    for (let i = 0; i < newSkills.length; i++) {
      const battleSkill = newSkills[i];

      if (battleSkill.currentCooldown > 0) continue;

      const skillData = character.inventory.skills.find(
        (s) => s.skillId._id === battleSkill.skillId,
      );

      if (!skillData) continue;

      const damgeOneSkill =
        ((character.finalStats?.atk ?? 1) *
          skillData.skillId.levels[skillData.level].attackPower) /
          100 -
        battle.monster.def;

      totalDamage += damgeOneSkill;

      if (battleSkill?.currentCooldown === 0) {
        newLogs.push({
          name: "Bạn",
          enemyName: currentMonster?.name ?? "",
          damage: damgeOneSkill,
          skill: skillData.skillId.name,
        });
      }

      newSkills[i] = {
        ...battleSkill,
        currentCooldown: skillData.skillId.cooldown,
      };
    }

    const newMonterHp = battle.monster.hp - totalDamage;

    return {
      ...battle,
      logs: [...battle.logs, ...newLogs],
      battleStatus: newMonterHp <= 0 ? "win" : battle.battleStatus,
      monster: {
        ...battle.monster,
        hp: newMonterHp <= 0 ? 0 : newMonterHp,
      },
      skills: newMonterHp > 0 ? newSkills : battle.skills,
    };
  });
};

export const monsterTurn = (battle, character, currentMap, updateBattle) => {
  updateBattle((battle) => {
    if (battle.battleStatus === "win" || battle.monster.hp <= 0) {
      return battle;
    }

    const monsterDamge =
      battle.monster.atk * (currentMap?.monsterStatMultiplier ?? 1) -
      (character.finalStats?.def ?? 0);

    const newPlayerHp = battle.playerHp - monsterDamge;

    const newLogs: Log[] = [];

    newLogs.push({
      name: battle.monster.name,
      enemyName: "Bạn",
      damage: monsterDamge,
      skill: "",
    });

    return {
      ...battle,
      logs: [...battle.logs, ...newLogs],
      battleStatus: newPlayerHp <= 0 ? "lose" : battle.battleStatus,
      playerHp: newPlayerHp <= 0 ? 0 : newPlayerHp,
    };
  });
};

export const reduceCooldown = (battle, updateBattle) => {
  updateBattle((battle) => {
    const newSkills = battle.skills.map((skill) => ({
      ...skill,
      currentCooldown:
        skill.currentCooldown > 0 ? skill.currentCooldown - 1 : 0,
    }));

    return {
      ...battle,
      skills: newSkills,
      turn: battle.turn + 1,
    };
  });
};

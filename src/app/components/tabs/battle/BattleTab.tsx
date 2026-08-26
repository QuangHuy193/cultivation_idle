"use client";

import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import { useMapStore } from "@/lib/useStore/useMapStore";
import { useBattleStore } from "@/lib/useStore/useBattleStore";
import { useEffect, useState } from "react";
import { showError, showSuccess } from "@/lib/toast";
import { useSettingStore } from "@/lib/useStore/usseSetting";
import {
  monsterTurn,
  playerTurn,
  reduceCooldown,
} from "@/systems/battleFunction";
import SplitLayout from "../../layout/SplitLayout";
import BattleTabBattle from "./BattleTabBattle";
import BattleTabLog from "./BattleTabLog";

const BattleTab = () => {
  const { character } = useCharacterStore();
  const { progressMap } = useMapStore();

  const { setBattle, battle, updateBattle, isBattlePause, isBattleStart } =
    useBattleStore();
  const { battleSpeed } = useSettingStore();

  const currentMap = progressMap?.maps?.find(
    (map) => map._id === progressMap?.currentMapId,
  );

  const currentMonster = currentMap?.monsters?.[0]?.monsterId;

  function createMonster() {
    const monster =
      currentMap?.monsters[
        Math.floor(Math.random() * currentMap.monsters.length)
      ];

    return {
      id: monster?.monsterId._id,

      name: monster?.monsterId.name,

      icon: monster?.monsterId.icon,

      hp:
        monster?.monsterId.stats.hp ??
        1 * (currentMap?.monsterStatMultiplier ?? 1),

      maxHp:
        monster?.monsterId.stats.hp ??
        1 * (currentMap?.monsterStatMultiplier ?? 1),

      atk:
        monster?.monsterId.stats.atk ??
        1 * (currentMap?.monsterStatMultiplier ?? 1),

      def:
        monster?.monsterId.stats.def ??
        1 * (currentMap?.monsterStatMultiplier ?? 1),
    };
  }

  const battleTurn = () => {
    if (!battle) return;

    reduceCooldown(battle, updateBattle);

    if (battle.playerHp && battle.playerHp > 0)
      playerTurn(battle, character, currentMonster, updateBattle);

    if (battle.monster.hp && battle.monster.hp > 0)
      monsterTurn(battle, character, currentMap, updateBattle);
  };

  useEffect(() => {
    if (!character || !currentMap) return;

    const battleSkills = character.equippedSkills.map((equippedSkill) => {
      const skillData = character.inventory.skills.find(
        (skill) => skill.skillId._id === equippedSkill.skillId,
      );

      return {
        skillId: equippedSkill.skillId,
        currentCooldown: skillData?.skillId.cooldown,
      };
    });

    const battleMonster = createMonster();

    setBattle({
      turn: 1,

      playerHp: character?.finalStats?.hp || 0,
      playerMaxHp: character?.finalStats?.hp || 0,

      monster: battleMonster,

      battleStatus: "fighting",

      skills: battleSkills,

      logs: [],
    });
  }, []);

  useEffect(() => {
    if (!battle) return;

    if (battle.battleStatus === "win") {
      showSuccess("Bạn chiến thắng");
    }

    if (battle.battleStatus === "lose") {
      showError("Bạn thất bại");
    }
  }, [battle?.battleStatus]);

  useEffect(() => {
    if (!battle || !isBattleStart || isBattlePause) return;

    if (battle.battleStatus === "win" || battle.battleStatus === "lose") {
      return;
    }

    const timer = setInterval(() => {
      battleTurn();
    }, 4000 / battleSpeed);

    return () => clearInterval(timer);
  }, [battleSpeed, isBattleStart, battle?.battleStatus, isBattlePause]);

  return (
    <SplitLayout
      top={<BattleTabBattle />}
      bottom={<BattleTabLog />}
      percentTop="flex-7"
      percentBottom="flex-5"
    />
  );
};

export default BattleTab;

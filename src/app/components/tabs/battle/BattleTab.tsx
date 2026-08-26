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
import { createBattleAPI } from "@/app/axios/battleAPI";
import Loading from "../Loading";

const BattleTab = () => {
  const { character } = useCharacterStore();

  const { setBattle, loadingUseBattle, setLoadingUseBattle } = useBattleStore();
  //const { battleSpeed } = useSettingStore();

  // tạo battle
  useEffect(() => {
    const createBattleApi = async () => {
      try {
        setLoadingUseBattle(true);
        const res = await createBattleAPI(character._id);
        setBattle(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingUseBattle(false);
      }
    };

    if (character?._id) {
      createBattleApi();
    }
  }, []);

  // const battleTurn = () => {
  //   if (!battle) return;

  //   reduceCooldown(battle, updateBattle);

  //   if (battle.playerHp && battle.playerHp > 0)
  //     playerTurn(battle, character, currentMonster, updateBattle);

  //   if (battle.monster.hp && battle.monster.hp > 0)
  //     monsterTurn(battle, character, currentMap, updateBattle);
  // };

  // khởi tạo lại lượt chơi mới
  // useEffect(() => {
  //   setIsBattlePause(false);
  //   setIsBattleStart(false);
  // }, []);

  // useEffect(() => {
  //   if (!character || !currentMap) return;

  //   const battleSkills = character.equippedSkills.map((equippedSkill) => {
  //     const skillData = character.inventory.skills.find(
  //       (skill) => skill.skillId._id === equippedSkill.skillId,
  //     );

  //     return {
  //       skillId: equippedSkill.skillId,
  //       currentCooldown: skillData?.skillId.cooldown,
  //     };
  //   });

  //   const battleMonster = createMonster();

  //   setBattle({
  //     turn: 1,

  //     playerHp: character?.finalStats?.hp || 0,
  //     playerMaxHp: character?.finalStats?.hp || 0,

  //     monster: battleMonster,

  //     battleStatus: "fighting",

  //     skills: battleSkills,

  //     logs: [],
  //   });
  // }, []);

  // useEffect(() => {
  //   if (!battle) return;

  //   if (battle.battleStatus === "win") {
  //     showSuccess("Bạn chiến thắng");
  //   }

  //   if (battle.battleStatus === "lose") {
  //     showError("Bạn thất bại");
  //   }
  // }, [battle?.battleStatus]);

  // useEffect(() => {
  //   if (!battle || !isBattleStart || isBattlePause) return;

  //   if (battle.battleStatus === "win" || battle.battleStatus === "lose") {
  //     return;
  //   }

  //   const timer = setInterval(() => {
  //     battleTurn();
  //   }, 4000 / battleSpeed);

  //   return () => clearInterval(timer);
  // }, [battleSpeed, isBattleStart, battle?.battleStatus, isBattlePause]);

  return (
    <>
      {loadingUseBattle ? (
        <div>
          <Loading message="Đang tạo chiến trường..." />
        </div>
      ) : (
        <SplitLayout
          top={<BattleTabBattle />}
          bottom={<BattleTabLog />}
          percentTop="flex-7"
          percentBottom="flex-5"
        />
      )}
    </>
  );
};

export default BattleTab;

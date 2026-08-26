"use client";

import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import { useBattleStore } from "@/lib/useStore/useBattleStore";
import { useEffect, useState } from "react";
import { showError, showSuccess } from "@/lib/toast";
import { useSettingStore } from "@/lib/useStore/usseSetting";
import SplitLayout from "../../layout/SplitLayout";
import BattleTabBattle from "./BattleTabBattle";
import BattleTabLog from "./BattleTabLog";
import { createBattleAPI, fightBattleAPI } from "@/app/axios/battleAPI";
import Loading from "../Loading";

const BattleTab = () => {
  const { character } = useCharacterStore();
  const {
    battle,
    setBattle,
    updateBattle,
    loadingUseBattle,
    setLoadingUseBattle,
    isBattlePause,
    isBattleStart,
  } = useBattleStore();
  const { battleSpeed } = useSettingStore();

  // danh sách turns từ api {battleStatus, turns}
  const [turns, setTurns] = useState([]);
  // lượt hiện tại
  const [currentTurn, setCurrentTurn] = useState(0);

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

  // tải trước turn
  useEffect(() => {
    const fightBattleApi = async () => {
      try {
        const res = await fightBattleAPI(battle._id)        

        setTurns(res.turns);

        updateBattle((battle) => {
          return {
            ...battle,
            battleStatus: res.battleStatus,
          };
        });

        setCurrentTurn(0);
      } catch (error) {
        console.log(error);
      }
    };

    if (battle?._id) {
      fightBattleApi();
    }
  }, [battle?._id]);

  // chạy từng lượt
  useEffect(() => {
    
    if (!isBattleStart) return;
    
    if (isBattlePause) return;
    
    if (!turns.length) return;
    
    if (currentTurn >= turns.length) {
      if (battle.battleStatus === "win") {
        showSuccess("Chiến thắng");
      } else {
        showError("Thất bại");
      }
      return;
    }

    const timer = setTimeout(() => {
      updateBattle((battle) => {
        return {
          ...battle,
          playerHp: turns[currentTurn].playerHp,
          monster: {
            ...battle.monster,
            hp: turns[currentTurn].monsterHp,
          },
          logs: [...battle.logs, ...turns[currentTurn].logs],
        };
      });

      setCurrentTurn((prev) => prev + 1);
    }, 4000 / battleSpeed);

    return () => clearTimeout(timer);
  }, [currentTurn, turns, isBattleStart, isBattlePause, battleSpeed]);

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

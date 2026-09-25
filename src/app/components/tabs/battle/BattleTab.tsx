"use client";

import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import {
  battleStateDefault,
  useBattleStore,
} from "@/lib/useStore/useBattleStore";
import { useEffect, useState } from "react";
import { showError } from "@/lib/toast";
import { useSettingStore } from "@/lib/useStore/useSetting";
import SplitLayout from "../../layout/SplitLayout";
import BattleTabBattle from "./BattleTabBattle";
import BattleTabLog from "./BattleTabLog";
import {
  createBattleAPI,
  fightBattleAPI,
  rewardBattleAPI,
} from "@/app/axios/battleAPI";
import Loading from "../../ui/Loading";
import RewardAlert from "../../alert/RewardAlert";
import {
  ResponseRewardBattleApi,
  ResponseTurns,
} from "@/lib/types/battleTypes";

const BattleTab = () => {
  const [rewardAlertOpen, setRewardAlertOpen] = useState(false);
  const { character } = useCharacterStore();
  const {
    battle,
    setBattle,
    updateBattle,
    loadingUseBattle,
    setLoadingUseBattle,
    isBattlePause,
    setIsBattlePause,
    isBattleStart,
    setIsBattleStart,
  } = useBattleStore();
  const { battleSpeed } = useSettingStore();

  // danh sách turns từ api {battleStatus, turns, resaon?}
  const [turns, setTurns] = useState<ResponseTurns | null>(null);
  // lượt hiện tại
  const [currentTurn, setCurrentTurn] = useState(0);
  // trả về từ api lấy rewward {character, rewwards}
  const [resReward, setResReawrd] = useState<ResponseRewardBattleApi | null>(
    null,
  );

  // tạo battle
  useEffect(() => {
    const createBattleApi = async () => {
      try {
        setLoadingUseBattle(true);
        const res = await createBattleAPI(character?._id ?? "", "mainStage");
        setBattle(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingUseBattle(false);
      }
    };

    // tạo lại các tham số khác
    setIsBattleStart(false);
    setIsBattlePause(false);

    if (character?._id) {
      setBattle(battleStateDefault);
      createBattleApi();
    }
  }, []);

  // tải trước turn
  useEffect(() => {
    const fightBattleApi = async () => {
      try {
        const res = await fightBattleAPI(battle._id, "mainStage");
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

    if (!turns?.turns?.length) return;

    const timer = setTimeout(() => {
      updateBattle((battle) => {
        return {
          ...battle,
          playerHp: turns.turns[currentTurn].playerHp,
          monster: {
            ...battle.monster,
            hp: turns.turns[currentTurn].monsterHp,
          },
          logs: [...battle.logs, ...turns.turns[currentTurn].logs],
        };
      });

      setCurrentTurn((prev) => prev + 1);
    }, 4000 / battleSpeed);

    return () => clearTimeout(timer);
  }, [currentTurn, turns, isBattleStart, isBattlePause, battleSpeed]);

  // gọi api nhận thưởng
  const getRewardApi = async () => {
    try {
      const res = await rewardBattleAPI(battle._id);
      console.log("ssss", res);
      setResReawrd(res);
    } catch (error) {
      console.log(error);
    }
  };

  // kiểm tra thắng thua
  useEffect(() => {
    if (!isBattleStart) return;

    if (isBattlePause) return;

    if (!turns?.turns?.length) return;

    if (currentTurn >= turns?.turns?.length) {
      if (battle.battleStatus === "win") {
        setRewardAlertOpen(true);
        getRewardApi();
      } else {
        showError("Thất bại");
      }
      return;
    }
  }, [currentTurn, turns]);

  return (
    <>
      {loadingUseBattle ? (
        <div>
          <Loading message="Đang tạo chiến trường..." />
        </div>
      ) : (
        <>
          {rewardAlertOpen && (
            <RewardAlert
              status={battle?.battleStatus}
              newCharacter={resReward?.character}
              rewards={resReward?.rewards}
              onClose={() => {
                setRewardAlertOpen(false);
              }}
            />
          )}
          <SplitLayout
            top={<BattleTabBattle />}
            bottom={<BattleTabLog />}
            percentTop="flex-7"
            percentBottom="flex-5"
          />
        </>
      )}
    </>
  );
};

export default BattleTab;

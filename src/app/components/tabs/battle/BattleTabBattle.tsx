"use client";

import { DEFAULT_IMG_CHARACTER } from "@/lib/constants/imageConstants";
import { useBattleStore } from "@/lib/useStore/useBattleStore";
import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import { useMapStore } from "@/lib/useStore/useMapStore";
import { useToggleStore } from "@/lib/useStore/useToggleStore";
import { useSettingStore } from "@/lib/useStore/usseSetting";
import { SquarePause } from "lucide-react";
import Image from "next/image";
import PauseAlert from "../../alert/PauseAlert";

const BattleTabBattle = () => {
  const { character } = useCharacterStore();
  const { progressMap } = useMapStore();
  const { isOpenPause, setIsOpenPause, tabState, setTabState } =
    useToggleStore();
  const { battle, setIsBattlePause } = useBattleStore();
  const { battleSpeed, setBattleSpeed } = useSettingStore();

  const currentMap = progressMap?.maps?.find(
    (map) => map._id === progressMap?.currentMapId,
  );

  return (
    <div className="w-full h-full">
      {/*  pause  */}
      <SquarePause
        onClick={() => {
          setIsBattlePause(true);
          setIsOpenPause(true);
        }}
        className="fixed w-8 h-8 top-2 right-2 z-99"
      />
      {isOpenPause && (
        <PauseAlert
          onContinue={() => {
            setIsBattlePause(false);
            setIsOpenPause(false);
          }}
          onExit={() => {
            setTabState(tabState.prevousTab, "home");
            setIsOpenPause(false);
          }}
          onRestart={() => {}}
        />
      )}
      <div className="flex h-full flex-col flex-7/12">
        {/* battle area */}
        <div
          className="relative flex items-end h-full"
          style={{
            backgroundImage: `url('${currentMap?.icon}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* map info */}
          <div
            className="absolute top-3 left-1/2 -translate-x-1/2 rounded-xl
            bg-black/50 px-4 py-2 text-center text-white backdrop-blur-sm"
          >
            <div className="font-semibold">{currentMap?.name}</div>

            <div className="text-xs text-zinc-200">
              Tầng {progressMap?.currentStage}/{currentMap?.maxStage}
            </div>

            <div>Lượt {battle?.turn}</div>
          </div>

          {/* character */}
          <div className="absolute bottom-2 left-4">
            <div className="mb-2 w-32">
              <div className="mb-1 text-xs font-semibold text-white">
                {character.name}
              </div>

              <div
                className="h-2 overflow-hidden rounded bg-zinc-800 border 
              border-green-500"
              >
                <div
                  className="h-full bg-green-500"
                  style={{
                    width: `${(battle?.playerHp / battle?.playerMaxHp) * 100}%`,
                  }}
                />
              </div>
            </div>

            <Image
              src={DEFAULT_IMG_CHARACTER}
              alt="Nhân vật"
              width={130}
              height={130}
              className="drop-shadow-xl"
            />
          </div>

          {/* monster */}
          <div className="absolute bottom-2 right-4">
            <div className="mb-2 w-32">
              <div className="mb-1 text-right text-xs font-semibold text-white">
                {battle.monster?.name || "Quái vật"}
              </div>

              <div
                className="h-2 overflow-hidden rounded bg-zinc-800 border 
              border-red-500"
              >
                <div
                  className="h-full bg-red-500 "
                  style={{
                    width: `${
                      (battle.monster.hp / battle.monster.maxHp) * 100
                    }%`,
                  }}
                />
              </div>
            </div>

            <Image
              src={battle.monster?.icon || ""}
              alt="Monster"
              width={130}
              height={130}
              className="scale-x-[-1] drop-shadow-xl"
            />
          </div>

          {/* speed button */}
          <div className="absolute right-3 bottom-2">
            <button
              className="rounded-lg bg-black/60 px-3 py-2 text-sm font-bold text-white"
              onClick={() => {
                switch (battleSpeed) {
                  case 1:
                    setBattleSpeed(2);
                    break;
                  case 2:
                    setBattleSpeed(4);
                    break;
                  case 4:
                    setBattleSpeed(1);
                    break;
                  default:
                    break;
                }
              }}
            >
              x{battleSpeed}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleTabBattle;

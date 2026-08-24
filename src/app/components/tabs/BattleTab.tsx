"use client";

import Image from "next/image";

import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import { useMapStore } from "@/lib/useStore/useMapStore";
import { SquarePause } from "lucide-react";
import PauseAlert from "../alert/PauseAlert";
import { useBattleStore } from "@/lib/useStore/useBattleStore";
import { useEffect } from "react";
import { showError, showSuccess } from "@/lib/toast";
import { useToggleStore } from "@/lib/useStore/useToggleStore";
import { DEFAULT_IMG_CHARACTER } from "@/lib/constants/imageConstants";

const BattleTab = () => {
  const { character } = useCharacterStore();
  const { progressMap } = useMapStore();
  const { isOpenPause, setIsOpenPause, tabState, setTabState } = useToggleStore();
  const { setBattle, battle, addLog, updateBattle, updateBattleStatus } =
    useBattleStore();

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

      hp: monster?.monsterId.stats.hp || 1 * currentMap?.monsterStatMultiplier,

      maxHp:
        monster?.monsterId.stats.hp || 1 * currentMap?.monsterStatMultiplier,

      attack:
        monster?.monsterId.stats.attack ||
        1 * currentMap?.monsterStatMultiplier,

      defense:
        monster?.monsterId.stats.defense ||
        1 * currentMap?.monsterStatMultiplier,
    };
  }

  const reduceCooldown = () => {
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

  const playerTurn = () => {
    if (battle.battleStatus === "lose" || battle.playerHp <= 0) {
      return battle;
    }

    const newLogs: string[] = [];
    updateBattle((battle) => {
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
          (character.finalStats?.attack *
            skillData.skillId.levels[skillData.level].attackPower) /
            100 -
          battle.monster.defense;

        totalDamage += damgeOneSkill;

        if (battleSkill?.currentCooldown === 0) {
          newLogs.push(
            `Bạn dùng kỹ năng ${skillData.skillId.name} gây ${damgeOneSkill} sát thương`,
          );
        }

        newSkills[i] = {
          ...battleSkill,
          currentCooldown: skillData.skillId.cooldown,
        };
      }

      const newMonterHp = battle.monster.hp - totalDamage;
      if (newMonterHp <= 0) {
        return {
          ...battle,
          battleStatus: "win",
          monster: {
            ...battle.monster,
            hp: 0,
          },
          logs: [...battle.logs, ...newLogs],
        };
      }

      return {
        ...battle,
        monster: {
          ...battle.monster,
          hp: newMonterHp,
        },
        skills: newSkills,
        logs: [...battle.logs, ...newLogs],
      };
    });
  };

  const monsterTurn = () => {
    updateBattle((battle) => {
      if (battle.battleStatus === "win" || battle.monster.hp <= 0) {
        return battle;
      }

      const monsterDamge =
        battle.monster.attack * currentMap?.monsterStatMultiplier -
        character.finalStats?.defense;

      const newPlayerHp = battle.playerHp - monsterDamge;

      const newLogs: string[] = [];

      newLogs.push(
        `${battle.monster.name} gây cho bạn ${monsterDamge} sát thương`,
      );

      if (newPlayerHp <= 0) {
        return {
          ...battle,
          battleStatus: "lose",
          playerHp: 0,
          logs: [...battle.logs, ...newLogs],
        };
      }

      return {
        ...battle,
        playerHp: newPlayerHp,
        logs: [...battle.logs, ...newLogs],
      };
    });
  };

  const battleTurn = () => {
    if (!battle) return;

    reduceCooldown();

    if (battle.playerHp && battle.playerHp > 0) playerTurn();

    if (battle.monster.hp && battle.monster.hp > 0) monsterTurn();
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
      return;
    }

    if (battle.battleStatus === "lose") {
      showError("Bạn thất bại");
      return;
    }

    const timer = setInterval(() => {
      battleTurn();
    }, 4000);

    return () => clearInterval(timer);
  }, [battle?.battleStatus]);

  return (
    <section className="h-full w-full flex flex-col overflow-hidden">
      {/*  pause  */}
      <SquarePause
        onClick={() => setIsOpenPause(true)}
        className="fixed w-8 h-8 top-2 right-2 z-99"
      />
      {isOpenPause && (
        <PauseAlert
          onContinue={() => {
            setIsOpenPause(false);
          }}
          onExit={() => {            
            setTabState(tabState.prevousTab, "dongphu")
            setIsOpenPause(false);}}
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
            className="absolute top-3 left-1/2
              -translate-x-1/2
              rounded-xl
              bg-black/50
              px-4 py-2
              text-center
              text-white
              backdrop-blur-sm
            "
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

              <div className="h-2 overflow-hidden rounded bg-zinc-800">
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
                {currentMonster?.name || "Quái vật"}
              </div>

              <div className="h-2 overflow-hidden rounded bg-zinc-800">
                <div
                  className="h-full bg-red-500"
                  style={{
                    width: `${
                      (battle.monster.hp / battle.monster.maxHp) * 100
                    }%`,
                  }}
                />
              </div>
            </div>

            <Image
              src={currentMonster?.icon || ""}
              alt="Monster"
              width={130}
              height={130}
              className="scale-x-[-1] drop-shadow-xl"
            />
          </div>

          {/* speed button */}
          <div
            className="
              absolute right-3 bottom-2"
          >
            <button
              className="
                rounded-lg
                bg-black/60
                px-3 py-2
                text-sm font-bold
                text-white
              "
            >
              x2
            </button>
          </div>
        </div>
      </div>

      {/* bottom panel */}
      <div className="bg-zinc-100 p-3 flex-5/12">
        <div className="mb-2 font-semibold text-zinc-700">Kỹ năng</div>

        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, index) => {
            const equippedSkill = character.equippedSkills?.find(
              (skill) => skill.slot === index + 1,
            );

            const skillData = character.inventory.skills?.find(
              (skill) => skill.skillId._id === equippedSkill?.skillId,
            );

            const battleSkill = battle.skills.find(
              (s) => s.skillId === skillData?.skillId._id,
            );

            return (
              <div
                key={index}
                className="relative aspect-square rounded-xl border-2 border-amber-300
                bg-white p-2 shadow-sm"
              >
                {battleSkill?.currentCooldown &&
                battleSkill?.currentCooldown > 0 ? (
                  <div
                    className="absolute h-full w-full top-0 right-0 rounded-xl bg-black/20
                  flex justify-center items-center text-3xl font-bold text-red-500"
                  >
                    {battleSkill.currentCooldown}
                  </div>
                ) : (
                  ""
                )}
                {skillData ? (
                  <>
                    <Image
                      src={skillData.skillId.icon}
                      alt={skillData.skillId.name}
                      width={64}
                      height={64}
                      className="h-full w-full object-contain"
                    />

                    <span
                      className="absolute bottom-1 right-1 rounded bg-black/70 px-1 
                      text-[10px] text-white"
                    >
                      Lv.{skillData.level}
                    </span>
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-zinc-400">
                    Trống
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-white max-h-60 rounded-3xl p-4 flex flex-col gap-2 overflow-y-scroll">
          {battle.logs &&
            battle.logs.map((log, ind) => {
              return (
                <div key={ind} className="italic">
                  {log}
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default BattleTab;

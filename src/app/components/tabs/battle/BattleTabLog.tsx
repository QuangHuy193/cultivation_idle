"use client";

import { SkillInBattle } from "@/lib/types/battleTypes";
import {
  SkillInEquippedSkills,
  SkillItemInInventory,
} from "@/lib/types/characterTypes";
import { useBattleStore } from "@/lib/useStore/useBattleStore";
import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import Image from "next/image";

const BattleTabLog = () => {
  const { character } = useCharacterStore();

  const { battle, isBattleStart, setIsBattleStart } = useBattleStore();

  const groupedLogs = battle.logs.reduce(
    (groups, log) => {
      if (!groups[log.turn]) {
        groups[log.turn] = [];
      }

      groups[log.turn].push(log);

      return groups;
    },
    {} as Record<number, typeof battle.logs>,
  );

  return (
    <div>
      {/* bottom panel */}
      <div className="bg-zinc-100 px-3 flex-5/12">
        <div className="mb-2 font-semibold text-zinc-700">Kỹ năng</div>

        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, index) => {
            const equippedSkill = character?.equippedSkills?.find(
              (skill: SkillInEquippedSkills) => skill.slot === index + 1,
            );

            const skillData = character?.inventory.skills?.find(
              (skill: SkillItemInInventory) =>
                skill.skillId._id === equippedSkill?.skillId,
            );

            const battleSkill = battle.skills.find(
              (s: SkillInBattle) => s.skillId === skillData?.skillId._id,
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
                  <div
                    className="flex h-full items-center justify-center text-xs 
                  text-zinc-400"
                  >
                    Trống
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="max-h-60 overflow-y-auto rounded-t-3xl bg-white p-4 pb-10">
          {Object.entries(groupedLogs).map(([turn, logs]) => (
            <div
              key={turn}
              className="mb-3 overflow-hidden rounded-xl border border-amber-200 
              bg-amber-50"
            >
              {/* Turn header */}
              <div
                className="border-b border-amber-200 bg-linear-to-r from-amber-100 
                to-yellow-50 px-3 py-2 text-sm font-bold text-amber-800"
              >
                Lượt {turn}
              </div>

              {/* Logs */}
              <div className="space-y-1 p-2">
                {logs.map((log, index) => (
                  <div
                    key={index}
                    className={`rounded-lg px-2 py-1.5 text-sm
                      ${log.type === "player" ? "bg-blue-50" : "bg-red-50"}`}
                  >
                    <div className="flex items-center gap-1">
                      <span className="font-bold">
                        {log.type === "player" ? "⚔️" : "👹"}
                      </span>

                      <span
                        className={
                          log.type === "player"
                            ? "font-semibold text-blue-600"
                            : "font-semibold text-red-600"
                        }
                      >
                        {log.name}
                      </span>

                      {log.skill && (
                        <>
                          <span className="text-zinc-600">dùng</span>

                          <span className="font-bold text-yellow-600">
                            {log.skill}
                          </span>
                        </>
                      )}

                      <span className="text-zinc-600">gây</span>

                      <span className="font-bold text-red-500">{log.dmg}</span>

                      <span className="text-zinc-600">sát thương</span>

                      <span className="font-medium text-zinc-700">
                        {log.enemyName}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {!isBattleStart && (
          <div className="fixed w-full h-fit inset-x-0 bottom-18 flex justify-center">
            <button
              className="px-5 py-2 bg-blue-500 rounded-2xl text-white"
              onClick={() => {
                setIsBattleStart(true);
              }}
            >
              Chiến đấu
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BattleTabLog;

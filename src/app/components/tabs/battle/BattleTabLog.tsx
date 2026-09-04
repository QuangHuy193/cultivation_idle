"use client";

import { useBattleStore } from "@/lib/useStore/useBattleStore";
import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import Image from "next/image";

const BattleTabLog = () => {
  const { character } = useCharacterStore();

  const { battle, isBattleStart, setIsBattleStart } = useBattleStore();

  return (
    <div>
      {/* bottom panel */}
      <div className="bg-zinc-100 px-3 flex-5/12">
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

        <div
          className="bg-white max-h-60 rounded-t-3xl p-4 flex flex-col gap-2 pb-16.25
        overflow-y-scroll"
        >
          {battle.logs &&
            battle.logs.map((log, ind) => {
              return (
                <div key={ind} className="italic">
                  <span className="text-[#60a5fa]">{log.name}</span>

                  {log.skill && (
                    <>
                      {" dùng "}
                      <span className="text-[#facc15] font-bold">
                        {log.skill}
                      </span>
                    </>
                  )}

                  {" gây "}
                  <span className="text-[#ef4444] font-bold">{log.dmg}</span>
                  {" sát thương cho "}
                  <span className="text-[#f87171]">{log.enemyName}</span>
                </div>
              );
            })}
        </div>

        {!isBattleStart && (
          <div className="fixed w-full h-fit inset-x-0 bottom-16.25 flex justify-center">
            <button
              className=" px-5 py-2 bg-blue-500 rounded-2xl text-white"
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

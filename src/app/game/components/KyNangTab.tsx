"use client";

import Image from "next/image";

import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import SkillInfo from "./alert/SkillInfo";
import { useToggleStore } from "@/lib/useStore/useToggleStore";
import { equipSkillAPI } from "@/app/axios/characterAPI";

export default function KyNangTab() {
  const { character,updateCharacter } = useCharacterStore();
  const {
    itemInfoToggle,
    setItemInfoToggle,
    equipSkillSelect,
    setEquipSkillSelect,
  } = useToggleStore();

  // lấy dl từ equippedSkills để hiện các skill đang trang bị (hiện "eq" ở phần inventory)
  const equippedSkillSet = new Set(
    character.equippedSkills?.map((skill) => skill.skillId) || [],
  );

  return (
    <section className=" bg-zinc-50 p-5 h-full">
      {/* Skill đang trang bị */}
      <div className="mb-6">
        <h3 className="mb-3 text-center font-semibold text-zinc-700">
          Kỹ năng đang trang bị
        </h3>
        {equipSkillSelect.active && (
          <div
            className="mb-3 rounded-lg bg-yellow-100 border border-yellow-400 p-2
            text-center text-sm font-medium "
          >
            <div className="relative">
              <span>Chọn 1 ô kỹ năng để trang bị</span>
              <span className="absolute right-0 text-red-500 font-bolds text-xl">
                X
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, index) => {
            const equippedSkill = character.equippedSkills?.find(
              (skill) => skill.slot === index + 1,
            );

            const skillData = character.inventory.skills?.find(
              (skill) => skill.skillId._id === equippedSkill?.skillId,
            );

            return (
              <div
                key={index}
                className={`aspect-square rounded-xl border-2 border-amber-300 bg-amber-50
                overflow-hidden flex items-center justify-center ${
                  equipSkillSelect.active
                    ? "border-yellow-400 ring-4 ring-yellow-300 animate-pulse"
                    : "border-amber-300"
                }`}
                onClick={async () => {
                  if (!equipSkillSelect.active) return;

                  try {
                    const res = await equipSkillAPI(
                      character._id,
                      equipSkillSelect.skillId,
                      index + 1,
                    );

                    updateCharacter(res);

                    setEquipSkillSelect({
                      active: false,
                      skillId: "",
                    });
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                {equippedSkill ? (
                  <Image
                    src={skillData?.skillId.icon || ""}
                    alt={skillData?.skillId.name || ""}
                    width={64}
                    height={64}
                    className="object-contain"
                    onClick={() => {
                      if (equipSkillSelect.active) return;
                      setItemInfoToggle({
                        open: true,
                        item: skillData?.skillId || null,
                        state: "equip",
                      });
                    }}
                  />
                ) : (
                  <span className="text-xs text-zinc-400">Trống</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Danh sách kỹ năng */}
      <div>
        <div className="mb-3 border-b pb-2 text-lg font-semibold text-zinc-700">
          Kỹ năng
        </div>

        <div className="grid grid-cols-5 gap-3">
          {character.inventory.skills?.map((skill, ind) => {
            const isEquipped = equippedSkillSet.has(skill.skillId._id);

            return (
              <button
                key={ind}
                className="relative aspect-square rounded-xl border border-zinc-300 bg-white
                p-1 hover:border-amber-400 hover:shadow-md transition"
              >
                {isEquipped && (
                  <span
                    className="absolute top-1 left-1 z-10 rounded bg-green-600 px-1.5
                    py-0.5 text-[10px] font-bold text-white"
                  >
                    EQ
                  </span>
                )}

                <Image
                  src={skill.skillId.icon}
                  alt={skill.skillId.name}
                  width={64}
                  height={64}
                  className="h-full w-full object-contain"
                  onClick={() => {
                    setItemInfoToggle({
                      open: true,
                      item: skill.skillId,
                      state: isEquipped ? "equip" : "unequip",
                      levelSKill: skill.level,
                      shardSKill: skill.shard,
                    });
                  }}
                />

                <span
                  className="bottom-1 absolute rounded right-1 px-1 bg-black/70
                  text-white text-[10px]"
                >
                  Lv.{skill.level}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {itemInfoToggle.open && itemInfoToggle.item && (
        <SkillInfo
          skill={itemInfoToggle.item}
          isEquipped={itemInfoToggle.state === "equip"}
          level={itemInfoToggle.levelSKill || 1}
          shard={itemInfoToggle.shardSKill || 0}
          onClose={() =>
            setItemInfoToggle({ open: false, item: null, state: "" })
          }
        />
      )}
    </section>
  );
}

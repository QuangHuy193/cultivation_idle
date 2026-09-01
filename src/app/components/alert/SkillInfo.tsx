"use client";
import {  unequipSkillAPI } from "@/app/axios/characterAPI";

import { RARITY_CSS } from "@/lib/constants/cssConstants";
import { RARITY_TEXT_MAP } from "@/lib/constants/mapConstants";
import { Skill } from "@/lib/types/skillTypes";

import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import { useToggleStore } from "@/lib/useStore/useToggleStore";
import Image from "next/image";

interface SkillInfoProps {
  skill: Skill;
  level: number;
  shard: number;
  isEquipped?: boolean;
  onClose?: () => void;
}

const SkillInfo = ({
  skill,
  level,
  shard,
  isEquipped,
  onClose,
}: SkillInfoProps) => {
  const { setEquipSkillSelect } = useToggleStore();
  const { character, updateCharacter } = useCharacterStore();

  const unequipSkillApi = async () => {
    try {
      const res = await unequipSkillAPI(character._id, skill._id);
      updateCharacter(res);
      onClose?.();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-50"
        onClick={onClose}
      />

      <div
        className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[320px] rounded-2xl border-2 border-amber-700 bg-linear-to-b from-stone-100 
        to-amber-50 shadow-[0_0_30px_rgba(251,191,36,0.35)] overflow-hidden"
      >
        {/* Header */}
        <div
          className={`px-4 py-3 text-center text-lg font-bold ${RARITY_CSS[skill.rarity].text}
  `}
        >
          {skill.name} - {RARITY_TEXT_MAP(skill.rarity)}
        </div>

        {/* Body */}
        <div className="p-4">
          <div className="flex justify-center mb-4">
            <Image
              src={skill.icon}
              alt={skill.name}
              width={80}
              height={80}
              className="w-20 h-20 object-contain"
            />
          </div>

          <div className="rounded-xl border border-amber-200 bg-white/70 p-3 min-h-25">
            <div className="text-zinc-700 leading-relaxed text-sm">
              {skill.description}

              <div>
                Gây sát thương bằng {skill.levels[level].attackPower} % ATK
              </div>
              <div>CD: {skill.cooldown}</div>
              <div>Hiện có: {shard} mảnh</div>
            </div>
          </div>

          <div className="flex justify-around mt-5 gap-5">
            <button
              className="flex-1 py-2 rounded-xl bg-indigo-500
                text-white transition font-medium"
            >
              Nâng cấp
            </button>
            {isEquipped ? (
              <button
              onClick={unequipSkillApi}
                className="flex-1 py-2 rounded-xl bg-amber-600 
                text-white transition font-medium"
              >
                Gỡ
              </button>
            ) : (
              <button
                onClick={() => {
                  setEquipSkillSelect({
                    active: true,
                    skillId: skill._id,
                  });

                  onClose?.();
                }}
                className="flex-1 py-2 rounded-xl bg-emerald-600
                text-white transition font-medium"
              >
                Trang bị
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillInfo;

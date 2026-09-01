"use client";

import { SKILL_TYPE_TEXT_MAP } from "@/lib/constants/mapConstants";
import { useClassStore } from "@/lib/useStore/useClassStore";
import Image from "next/image";
import { useState } from "react";

const SelectClass = () => {
  const { classes } = useClassStore();
  const [classSelect, setClassSelect] = useState("");

  return (
    <div className="w-full h-full flex flex-col gap-3 overflow-y-auto items-center justify-center">
      {classes?.map((cls) => (
        <div
          key={cls._id}
          onClick={() => setClassSelect(cls._id)}
          className={`
        cursor-pointer rounded-2xl border-2 p-4 transition-all duration-300
        ${
          classSelect === cls._id
            ? "border-amber-400 bg-amber-50 shadow-lg"
            : "border-zinc-200 bg-white hover:border-amber-200 hover:shadow"
        }
      `}
        >
          <div className="flex gap-4">
            {/* trái */}
            <div className="flex w-30 shrink-0 flex-col items-center justify-center">
              <div
                className="
              flex items-center justify-center
              rounded-full border-2 border-amber-300 bg-white
              shadow-md
            "
              >
                <Image
                  height={80}
                  width={80}
                  src={cls.icon}
                  alt={cls.name}
                  className="h-30 w-30 "
                />
              </div>

              <div className="mt-2 text-center font-bold text-amber-700">
                {cls.name}
              </div>
            </div>

            {/* phải */}
            {classSelect === cls._id && (
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <div className="mb-3 text-sm text-zinc-600">
                    {cls.description}
                  </div>

                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
                    <div className="font-semibold text-amber-700">
                      {cls.levels[0].name}
                    </div>

                    <div className="mt-2 space-y-1 text-sm">
                      <div>⚔️ Công: +{cls.levels[0].buffs.atk}</div>

                      <div>❤️ Máu: +{cls.levels[0].buffs.hp}</div>

                      <div>🛡️ Thủ: +{cls.levels[0].buffs.def}</div>

                      <div className="font-medium text-blue-600">
                        ✦ Tấn công kỹ năng hệ {SKILL_TYPE_TEXT_MAP(cls.typeSkillBuff)} +
                        {cls.levels[0].buffs.skill}%
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-center">
                  <button
                    className="rounded-xl bg-amber-500 px-4 py-2 font-semibold text-white
                    transition hover:bg-amber-600"
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectClass;

"use client";

import { CLASS_COATING_XS, CLASS_X_ALERT } from "@/lib/constants/cssConstants";
import { NAME_STAT_TEXT_MAP } from "@/lib/constants/mapConstants";
import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import { useToggleStore } from "@/lib/useStore/useToggleStore";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { useState } from "react";

const CharacterStat = () => {
  const { character } = useCharacterStore();
  const { setAlertSingle } = useToggleStore();

  const [isOpen, setIsOpen] = useState({
    base: true,
    equips: true,
    skins: true,
    items: true,
    realm: true,
    class: true,
  });

  const handleToggle = (name: string) => {
    setIsOpen((state) => {
      if (!(name in isOpen)) {
        return state;
      }

      const key = name as keyof typeof isOpen;

      return {
        ...state,
        [name]: !state[key],
      };
    });
  };

  return (
    <div className={`${CLASS_COATING_XS} z-25`}>
      <div
        className="relative h-[60%] w-[80%] rounded-2xl border-2 border-amber-500
        bg-linear-to-b from-amber-200 to-amber-300 p-2 shadow-xl pt-5"
      >
        <X
          className={`${CLASS_X_ALERT} fill-red-500 text-red-500`}
          onClick={() => {
            setAlertSingle("");
          }}
        />
        <div
          className="flex h-full w-full flex-col gap-2 overflow-y-auto rounded-xl
          bg-linear-to-b from-amber-50 to-yellow-50 p-2"
        >
          {Object.entries(character?.stats ?? {}).map(([statName, stat]) => (
            <div
              key={statName}
              className="rounded-xl border border-amber-200 bg-white/70 shadow-sm"
            >
              {/* Title */}
              <div
                className="flex items-center justify-between border-b border-amber-200
                bg-linear-to-r from-amber-100 to-yellow-100 px-3 py-2"
              >
                <div
                  className="text-sm font-bold tracking-wide text-amber-900"
                >
                  {NAME_STAT_TEXT_MAP(statName)}
                </div>

                <div
                  onClick={() => {
                    handleToggle(statName);
                  }}
                  className="rounded-full border border-amber-300 bg-amber-200 px-1 py-0.5
                  text-xs font-semibold text-amber-800 shadow-inner"
                >
                  {isOpen[statName as keyof typeof isOpen] ? (
                    <ChevronDown />
                  ) : (
                    <ChevronUp />
                  )}
                </div>
              </div>

              {/* Stats */}
              {isOpen[statName as keyof typeof isOpen] ? (
                <div className="flex flex-col gap-1 p-2">
                  <div
                    className="flex items-center justify-between rounded-lg bg-red-50
                    px-2 py-1.5 text-sm"
                  >
                    <div className="font-medium text-red-700">
                      Tấn công (ATK)
                    </div>

                    <div className="font-bold text-red-600">+{stat.atk}</div>
                  </div>

                  <div
                    className="flex items-center justify-between rounded-lg bg-rose-50
                    px-2 py-1.5 text-sm"
                  >
                    <div className="font-medium text-green-700">Máu (HP)</div>

                    <div className="font-bold text-green-600">+{stat.hp}</div>
                  </div>

                  <div
                    className="flex items-center justify-between rounded-lg bg-sky-50
                    px-2 py-1.5 text-sm"
                  >
                    <div className="font-medium text-sky-700">
                      Phòng thủ (DEF)
                    </div>

                    <div className="font-bold text-sky-600">+{stat.def}</div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterStat;

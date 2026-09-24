"use client";

import { selectClassAPI } from "@/app/axios/classApi";
import { SKILL_TYPE_TEXT_MAP } from "@/lib/constants/mapConstants";
import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import { useClassStore } from "@/lib/useStore/useClassStore";
import { useLoadingStore } from "@/lib/useStore/useLoading";
import { useToggleStore } from "@/lib/useStore/useToggleStore";
import Image from "next/image";
import { useState } from "react";
import Loading from "../../ui/Loading";

const SelectClass = () => {
  const { character, updateCharacter } = useCharacterStore();
  const { classes } = useClassStore();
  const [classSelect, setClassSelect] = useState("");
  const { setComfirmAlert } = useToggleStore();
  const { actionLoadingName, setActionLoadingName } = useLoadingStore();

  const onSelect = async (classId: string) => {
    const onComfirm = async () => {
      selectClassApi(classId);
      setComfirmAlert({ isOpen: false });
    };
    const onUncomfirm = () => {
      setComfirmAlert({ isOpen: false });
    };
    setComfirmAlert({
      isOpen: true,
      text: "Bạn chắc chắn muốn chọn hệ phái này?",
      onYes: onComfirm,
      onNo: onUncomfirm,
    });
  };

  const selectClassApi = async (classId: string) => {
    try {
      setActionLoadingName("selectClass");
      const res = await selectClassAPI(character._id, classId);
      updateCharacter(res);
    } catch (error) {
      console.log(error);
    } finally {
      setActionLoadingName("");
    }
  };

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
                {actionLoadingName === "selectClass" && (
                  <Loading message="Đang gia nhập hệ phái..." />
                )}
                <div>
                  <div className="mb-3 text-sm text-zinc-600">
                    {cls.description}
                  </div>

                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
                    <div className="font-semibold text-amber-700">
                      {cls.levels?.[0]?.name}
                    </div>

                    <div className="mt-2 space-y-1 text-sm">
                      <div>⚔️ Công: +{cls.levels?.[0]?.buffs?.atk}</div>

                      <div>❤️ Máu: +{cls.levels?.[0]?.buffs?.hp}</div>

                      <div>🛡️ Thủ: +{cls.levels?.[0]?.buffs?.def}</div>

                      <div className="font-medium text-blue-600">
                        ✦ Tấn công kỹ năng hệ{" "}
                        {SKILL_TYPE_TEXT_MAP(cls.typeSkillBuff)} +
                        {cls.levels?.[0]?.buffs?.skill}%
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => {
                      onSelect(cls._id);
                    }}
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

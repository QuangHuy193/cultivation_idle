import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import { useClassStore } from "@/lib/useStore/useClassStore";
import { Gift } from "lucide-react";
import Image from "next/image";

const milestones = [25, 50, 75, 100];

const ClassMissonTop = () => {
  const { character } = useCharacterStore();
  const { classes } = useClassStore();

  const charCls = character.class.classId;
  const charClsLevel = character.class.classLevelCharacter - 1;
  const charClsExp = character.class.exp;

  const classs = classes.find((cl) => cl._id === charCls._id);

  const percentExp =
    (classs.levels[charClsLevel].requiredExp / 100) * charClsExp;

  return (
    <div className="flex h-full flex-col gap-8 justify-center py-2">
      <div className="flex flex-col gap-9">
        {/* Thông tin hệ phái */}
        <div className="flex items-center gap-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <Image
            width={80}
            height={80}
            src={charCls.icon}
            alt={charCls.name}
            className="h-20 w-20 shrink-0 object-contain"
          />

          <div>
            <div className="text-lg font-bold text-amber-700">
              {charCls.name}
            </div>

            <div className="mt-1 text-sm text-zinc-600">
              {charCls.description}
            </div>
          </div>
        </div>

        {/* Thanh exp */}
        <div className="flex justify-center">
          <div className="relative w-[90%]">
            {/* Exp hiện tại */}
            <div
              className="absolute -top-7 left-1/2
          -translate-x-1/2
          rounded-lg bg-amber-500 px-3 py-1
          text-xs font-bold text-white
          shadow
        "
            >
              {character.class.exp} Kinh nghiệm
            </div>

            {/* Tên cấp hiện tại */}
            <div className="absolute -top-8 left-0 text-sm font-semibold text-emerald-600">
              {charCls.levels[charClsLevel]?.name}
            </div>

            {/* Tên cấp tiếp theo */}
            <div className="absolute -top-8 right-0 text-sm font-semibold text-amber-600">
              {charCls.levels[charClsLevel + 1]?.name ?? "MAX"}
            </div>

            {/* Thanh nền */}
            <div className="h-4 overflow-hidden rounded-full bg-zinc-200 shadow-inner">
              {/* Thanh tiến độ */}
              <div
                className="h-full rounded-full bg-linear-to-r from-amber-400 to-yellow-500"
                style={{
                  width: percentExp > 100 ? "100%" : `${percentExp}%`,
                }}
              />

              {percentExp >= 100 && (
                <div
                  className="
      absolute -top-8 -right-6 z-10
      animate-pulse
    "
                >
                  <button
                    className="
        rounded-lg bg-linear-to-r
        from-yellow-400 to-amber-500
        px-3 py-1
        text-sm font-bold text-white
        shadow-lg
        border border-yellow-300
        hover:scale-105
        transition-transform
      "
                  >
                    ✦ Đột Phá
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* nhiệm vụ */}
      <div className="flex justify-center py-6 items-center">
        <div className="relative w-[80%]">
          {/* Thanh nhiệm vụ */}
          <div className="h-2 rounded-full bg-zinc-300" />

          {/* tiến độ */}
          <div
            className="absolute inset-0 h-2 rounded-full bg-blue-300"
            style={{
              width: "20%",
            }}
          />

          {/* Các mốc */}
          {milestones.map((point, index) => (
            <div
              key={point}
              className="absolute top-0 -translate-x-1/2"
              style={{
                left: `${((index + 1) / milestones.length) * 100}%`,
              }}
            >
              {/* Gift */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                <div
                  className="rounded-full border-2 border-amber-400 bg-amber-100
                    p-1 shadow"
                >
                  <Gift className="h-5 w-5 text-amber-600" />
                </div>
              </div>

              {/* Chấm mốc */}
              <div
                className="absolute top-1 left-1/2 h-4 w-4
                  -translate-x-1/2 -translate-y-1/2
                  rounded-full border-2 border-amber-400 bg-white"
              />

              {/* Điểm */}
              <div
                className="absolute top-4 left-1/2
                  -translate-x-1/2 text-xs font-semibold text-zinc-700"
              >
                {point}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassMissonTop;

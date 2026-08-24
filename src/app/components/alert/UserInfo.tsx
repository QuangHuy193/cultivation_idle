"use client";
import {
  CLASS_COATING_SM,
  CLASS_X_ALERT,
  RARITY_CSS,
  REALM_CSS,
} from "@/lib/constants/cssConstants";
import { DEFAULT_IMG_CHARACTER } from "@/lib/constants/imageConstants";
import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import { useToggleStore } from "@/lib/useStore/useToggleStore";
import { SquarePen, X } from "lucide-react";
import Image from "next/image";

const UserInfo = () => {
  const { character } = useCharacterStore();
  const { setAalertUserInfo } = useToggleStore();

  const realmStyle =
    REALM_CSS[character.realmId?._id as keyof typeof REALM_CSS];

  const rarityCtyle =
    RARITY_CSS[character.skinId.rarity] ?? RARITY_CSS["common"];

  return (
    <div className={CLASS_COATING_SM}>
      <div
        className="relative w-85 rounded-3xl border-2 border-yellow-700 
      bg-linear-to-b from-amber-100 to-yellow-50 p-5 shadow-2xl"
      >
        {/* nút tắt */}
        <button
          onClick={() => setAalertUserInfo("")}
          className={CLASS_X_ALERT}
        >
          <X className="h-5 w-5 text-red-500" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div
            className={`
            h-22 w-22 overflow-hidden rounded-full border-4 shadow-lg
            ${rarityCtyle.border}
          `}
          >
            <Image
              height={88}
              width={88}
              src={character.skinId.icon || DEFAULT_IMG_CHARACTER}
              alt={character.skinId.name || ""}
              className="h-full w-full"
            />
          </div>

          {/* Thông tin */}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold text-zinc-800">
                {character.name}
              </div>

              <button className="rounded-lg bg-white/70 p-2 transition hover:bg-white">
                <SquarePen className="h-4 w-4 text-zinc-700" />
              </button>
            </div>

            <div
              className={`mt-1 text-sm font-semibold
              ${realmStyle.text}
              ${realmStyle.glow}
            `}
            >
              {character.realmId?.name} - Tầng {character.realmLevel}
            </div>

            <div className="mt-2 text-xs text-zinc-500">Danh hiệu: Tán Tu</div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-yellow-300" />

        {/* Tiến độ */}
        <div className="rounded-2xl border border-yellow-300 bg-white/70 p-3">
          <div className="text-sm font-semibold text-zinc-700">
            Ải chính tuyến
          </div>

          <div className="mt-1 text-lg font-bold text-amber-700">
            {character.currentMap.map.name}
          </div>

          <div className="mt-1 text-sm text-zinc-600">
            Ải {character.currentMap.stage}/{character.currentMap.map.maxStage}
          </div>

          <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-200">
            <div
              className="h-full bg-yellow-500"
              style={{
                width: `${
                  (character.currentMap.stage /
                    character.currentMap.map.maxStage) *
                  100
                }%`,
              }}
            />
          </div>
        </div>

        {/* Chức năng */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            onClick={() => setAalertUserInfo("code")}
            className="rounded-xl bg-linear-to-b from-yellow-400 to-yellow-600 py-2 
            font-semibold text-white shadow-md transition hover:scale-105"
          >
            Đổi Mã
          </button>

          <button
            className="rounded-xl bg-linear-to-b from-blue-400 to-blue-600 py-2 
            font-semibold text-white shadow-md transition hover:scale-105"
          >
            Cài Đặt
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

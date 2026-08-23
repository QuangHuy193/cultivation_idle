"use client";

import { breakthroughAPI } from "@/app/axios/characterAPI";
import { defaultBgCharacter, realmStyles } from "@/lib/constants";
import { CharacterService } from "@/lib/services/character.service";
import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import Image from "next/image";
import { useEffect } from "react";

export default function DongPhuTab() {
  const { character, updateCharacter } = useCharacterStore();

  const realmStyle =
    realmStyles[character.realmId?._id as keyof typeof realmStyles];

  const percent = character?.breakthroughRequired
    ? (character.cultivation / character.breakthroughRequired) * 100
    : 0;

  const breakthroughApi = async () => {
    try {
      const res = await breakthroughAPI(character._id);

      updateCharacter(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(character);
    CharacterService.loadInventory();
  }, []);

  return (
    <section
      className="relative h-full w-full overflow-hidden"
      style={{
        backgroundImage: "url('/bg_home.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Nền nhân vật chồng lên */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('${
            character.skinId?.bg || defaultBgCharacter
          }')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Nội dung */}
      <div className="relative z-10">
        <div className="flex w-fit items-center gap-3 px-3 py-2 rounded-r-2xl">
          <div className="flex flex-col">
            <div className="border-b flex justify-center">
              {character?.name || "Unknown"}
            </div>

            <span
              className={`font-bold ${realmStyle?.text} ${realmStyle?.glow}`}
            >
              {character.realmId?.name} - Tầng {character.realmLevel}
            </span>

            <div className="relative mt-2 h-2 w-full overflow-hidden rounded-full bg-white">
              <div
                className="h-full rounded-full bg-blue-400"
                style={{ width: `${Math.min(percent, 100)}%` }}
              />
            </div>

            {character.canBreakthrough && (
              <div className="flex justify-center">
                <button
                  onClick={breakthroughApi}
                  className="mt-2 w-fit rounded-lg bg-amber-500 px-3 py-2 text-sm text-white"
                >
                  Đột phá
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="fixed top-0 right-0 p-3 rounded-2xl flex items-center gap-2">
          <Image
            src="/linh_thach.webp"
            alt="Linh thạch"
            height={80}
            width={80}
            className="w-8 h-8"
          />
          <span className="text-xl text-cyan-500">
            {character?.spiritStone || "0"}
          </span>
        </div>
      </div>
    </section>
  );
}

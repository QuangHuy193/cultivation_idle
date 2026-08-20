"use client";

import Image from "next/image";

import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import { useMapStore } from "@/lib/useStore/useMapStore";

const BattleTab = () => {
  const { character } = useCharacterStore();
  const { progressMap } = useMapStore();

  const currentMap = progressMap?.maps?.find(
    (map) => map._id === progressMap?.currentMapId,
  );

  const currentMonster = currentMap?.monsters?.[0]?.monsterId;

  return (
    <section className="h-full w-full flex flex-col overflow-hidden">
      <div className="flex h-full flex-col flex-7/12">
        {/* battle area */}
        <div
          className="relative flex items-end h-full"
          style={{
            backgroundImage: `url('${currentMap?.icon}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* map info */}
          <div
            className="
              absolute top-3 left-1/2
              -translate-x-1/2
              rounded-xl
              bg-black/50
              px-4 py-2
              text-center
              text-white
              backdrop-blur-sm
            "
          >
            <div className="font-semibold">{currentMap?.name}</div>

            <div className="text-xs text-zinc-200">
              Tầng {progressMap?.currentStage}/{currentMap?.maxStage}
            </div>
          </div>

          {/* character */}
          <div className="absolute bottom-2 left-4">
            <div className="mb-2 w-32">
              <div className="mb-1 text-xs font-semibold text-white">
                {character.name}
              </div>

              <div className="h-2 overflow-hidden rounded bg-zinc-800">
                <div
                  className="h-full bg-green-500"
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            <Image
              src="/chars/char.webp"
              alt="Nhân vật"
              width={130}
              height={130}
              className="drop-shadow-xl"
            />
          </div>

          {/* monster */}
          <div className="absolute bottom-2 right-4">
            <div className="mb-2 w-32">
              <div className="mb-1 text-right text-xs font-semibold text-white">
                {currentMonster?.name || "Quái vật"}
              </div>

              <div className="h-2 overflow-hidden rounded bg-zinc-800">
                <div className="h-full bg-red-500" style={{ width: "100%" }} />
              </div>
            </div>

            <Image
              src={currentMonster?.icon || ""}
              alt="Monster"
              width={130}
              height={130}
              className="
                scale-x-[-1]
                drop-shadow-xl
              "
            />
          </div>

          {/* speed button */}
          <div
            className="
              absolute right-3 bottom-2"
          >
            <button
              className="
                rounded-lg
                bg-black/60
                px-3 py-2
                text-sm font-bold
                text-white
              "
            >
              x2
            </button>
          </div>
        </div>
      </div>

      {/* bottom panel */}
      <div className="bg-zinc-100 p-3 flex-5/12">
        <div className="mb-2 font-semibold text-zinc-700">Kỹ năng</div>

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
                className="
                    relative
                    aspect-square
                    rounded-xl
                    border-2
                    border-amber-300
                    bg-white
                    p-2
                    shadow-sm
                  "
              >
                {skillData?.skillId?.cooldown ? (
                  <div
                    className="absolute h-full w-full top-0 right-0 rounded-xl bg-black/20
                  flex justify-center items-center text-3xl font-bold text-red-500"
                  >
                    {skillData?.skillId?.cooldown}
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
                      className="
                          h-full
                          w-full
                          object-contain
                        "
                    />

                    <span
                      className="
                          absolute
                          bottom-1
                          right-1
                          rounded
                          bg-black/70
                          px-1
                          text-[10px]
                          text-white
                        "
                    >
                      Lv.{skillData.level}
                    </span>
                  </>
                ) : (
                  <div
                    className="
                        flex
                        h-full
                        items-center
                        justify-center
                        text-xs
                        text-zinc-400
                      "
                  >
                    Trống
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-white max-h-60 rounded-3xl p-4 flex flex-col gap-2 overflow-y-scroll">
          <div className="italic">
            Bạn dùng <span className="text-green-500">Phong Trảm</span> gây{" "}
            <span className="text-red-500">200</span> sát thương cho kẻ địch Yêu
          </div>
          <div className="italic">
            Bạn bị Yêu Thỏ tấn công mất{" "}
            <span className="text-yellow-500">100</span> máu
          </div>
          <div className="italic">
            Bạn dùng <span className="text-green-500">Phong Trảm</span> gây{" "}
            <span className="text-red-500">200</span> sát thương cho kẻ địch Yêu
          </div>
          <div className="italic">
            Bạn bị Yêu Thỏ tấn công mất{" "}
            <span className="text-yellow-500">100</span> máu
          </div>
          <div className="italic">
            Bạn dùng <span className="text-green-500">Phong Trảm</span> gây{" "}
            <span className="text-red-500">200</span> sát thương cho kẻ địch Yêu
          </div>
          <div className="italic">
            Bạn bị Yêu Thỏ tấn công mất{" "}
            <span className="text-yellow-500">100</span> máu
          </div>
          <div className="italic">
            Bạn dùng <span className="text-green-500">Phong Trảm</span> gây{" "}
            <span className="text-red-500">200</span> sát thương cho kẻ địch Yêu
          </div>
          <div className="italic">
            Bạn bị Yêu Thỏ tấn công mất{" "}
            <span className="text-yellow-500">100</span> máu
          </div>
        </div>
      </div>
    </section>
  );
};

export default BattleTab;

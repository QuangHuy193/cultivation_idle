"use client";

import { progressMapAPI } from "@/app/axios/characterAPI";
import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import { useMapStore } from "@/lib/useStore/useMapStore";
import Image from "next/image";
import { useEffect } from "react";

export default function TheGioiTab() {
  const { character } = useCharacterStore();
  const { progressMap, setProgressMap } = useMapStore();

  useEffect(() => {
    const mapProgressApi = async () => {
      try {
        const res = await progressMapAPI(character._id);
        setProgressMap(res);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };

    if (character._id) {
      mapProgressApi();
    }
  }, [character]);
  return (
    <section
      className="h-full w-full"
      style={{
        backgroundImage: "url('/bg_map.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col-reverse justify-between h-full py-30 px-10">
        {progressMap?.maps?.map((map, index) => {
          const isLeft = index % 2 === 0;
          const curMap = map.order === progressMap.currentStage;

          return (
            <div
              key={map._id}
              className={`flex ${isLeft ? "justify-start" : "justify-end"}`}
            >
              <div className="relative h-fit flex justify-center flex-col items-center">
                {curMap && (
                  <Image
                    src="/chars/char.webp"
                    alt="Nhân vật"
                    width={80}
                    height={80}
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                )}
                <Image src={map.icon} alt={map.name} width={120} height={120} />
                <div
                  className="font-semibold text-xl text-yellow-300"
                  style={{
                    textShadow:
                      "0 0 5px #facc15, 0 0 10px #facc15, 0 0 15px #f59e0b",
                  }}
                >
                  {map.order}. {map.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

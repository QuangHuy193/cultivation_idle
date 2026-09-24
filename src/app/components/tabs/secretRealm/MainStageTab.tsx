"use client";

import {} from "@/lib/constants/numberConstants";
import { DEFAULT_IMG_THE_GIOI } from "@/lib/constants/imageConstants";
import { showWarning } from "@/lib/toast";
import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import { useMapStore } from "@/lib/useStore/useMapStore";
import { useToggleStore } from "@/lib/useStore/useToggleStore";
import Image from "next/image";
import Loading from "../../ui/Loading";
import { MapsResponse } from "@/lib/types/mapTypes";
import { useLoadingStore } from "@/lib/useStore/useLoading";
import { useEffect } from "react";
import { mapService } from "@/lib/services/map.service";

export default function MainStageTab() {
  const { character } = useCharacterStore();
  const { maps } = useMapStore();
  const { actionLoadingName } = useLoadingStore();
  const { tabState, setTabState } = useToggleStore();

  const pushBattle = (mapId: string) => {
    const currentCLickMap: any = maps?.find((m) => m._id === mapId);
    //MapsResponse
    if (character.currentMap.map.order < currentCLickMap?.order) {
      showWarning("Bạn chưa hoàn thành bản đồ trước đó");
    } else if (character.realmId?.order < currentCLickMap.requiredRealm.order) {
      showWarning("Cảnh giới của bạn chưa đủ");
    } else {
      setTabState("battle", tabState.activeTab);
    }
  };

  useEffect(() => {
    console.log(maps);
    if (!maps || maps.length === 0) mapService.getMaps();
  }, [maps]);

  return (
    <section
      className="h-full w-full"
      style={{
        backgroundImage: `url("${DEFAULT_IMG_THE_GIOI}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {actionLoadingName === "getMaps" ? (
        <div>
          <Loading message="Đang tải lộ trình thí luyện..." />
        </div>
      ) : (
        <div className="flex flex-col-reverse justify-between h-full py-30 px-10">
          {maps &&
            maps.length > 0 &&
            maps.map((map, index) => {
              const isLeft = index % 2 === 0;
              const curMap = map._id === character.currentMap.map._id;

              return (
                <div
                  key={map._id}
                  className={`flex ${isLeft ? "justify-start" : "justify-end"}`}
                >
                  <div
                    onClick={() => {
                      pushBattle(map._id);
                    }}
                    className="relative h-fit flex justify-center flex-col items-center"
                  >
                    {curMap && (
                      <Image
                        src={character.skinId.icon}
                        alt="Nhân vật"
                        width={80}
                        height={80}
                        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                      />
                    )}
                    <Image
                      src={map.icon}
                      alt={map.name}
                      width={120}
                      height={120}
                    />
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
      )}
    </section>
  );
}

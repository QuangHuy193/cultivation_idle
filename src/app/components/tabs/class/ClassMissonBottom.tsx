"use client";

import { getCharacterClassMisionsAPI } from "@/app/axios/classApi";
import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import { useMisionStore } from "@/lib/useStore/useMissionStore";
import { useEffect } from "react";
import Loading from "../Loading";
import Image from "next/image";
import {  RARITY_CSS } from "@/lib/constants/cssConstants";
import { Check } from "lucide-react";
import { rarityTextMap } from "@/lib/constants";

const ClassMissonBottom = () => {
  const {
    characterClassMission,
    loadingUseMision,
    setLoadingUseMision,
    setCharacterClassMission,
  } = useMisionStore();

  const { character } = useCharacterStore();

  useEffect(() => {
    const getCharacterClassMission = async () => {
      try {
        const res = await getCharacterClassMisionsAPI(character._id);
        setCharacterClassMission(res);
      } catch (error) {
        console.log(error);
      }
    };

    if (character._id) {
      getCharacterClassMission();
    }
  }, []);
  return (
    <div className="h-screen overflow-y-scroll pb-90">
      {characterClassMission ? (
        <div>
          {characterClassMission.map((clsMission) => {
            const itemMission = character.inventory.items.find(
              (it) => it.itemId._id === clsMission.missionId.itemId._id,
            );

            return (
              <div
                key={clsMission._id}
                className={`
      relative overflow-hidden rounded-xl border-2 p-3
      bg-white/90 shadow-sm
      ${RARITY_CSS[clsMission.rarity].border}
    `}
              >
                {/* Overlay đã nhận */}
                {clsMission.status === "claimed" && (
                  <>
                    <div className="absolute inset-0 z-10 bg-black/40" />

                    <div
                      className="
            absolute inset-0 z-20
            flex items-center justify-center
            text-lg font-bold text-white
            backdrop-blur-[1px]
          "
                    >
                      ✓ Đã nhận
                    </div>
                  </>
                )}

                {/* Tên nhiệm vụ */}
                <div className="mb-2 flex items-center justify-between">
                  <div className="font-semibold text-zinc-800">
                    {clsMission.missionId.name}
                  </div>

                  <div
                    className={`
          rounded-full px-2 py-0.5 text-xs font-bold
          ${RARITY_CSS[clsMission.rarity].text}
        `}
                  >
                    {rarityTextMap(clsMission.rarity).toUpperCase()}
                  </div>
                </div>

                {/* Nội dung */}
                <div className="flex items-center gap-3">
                  <Image
                    width={80}
                    height={80}
                    src={clsMission.missionId.itemId.icon}
                    alt={clsMission.missionId.itemId.name}
                    className="
          h-12 w-12 rounded-lg border
          object-contain bg-zinc-100 p-1
        "
                  />

                  <div className="flex-1">
                    <div className="text-sm text-zinc-700">
                      {clsMission.missionId.itemId.name}
                    </div>

                    <div className="mt-1 text-sm font-medium">
                      {itemMission?.quantity ?? 0}/{clsMission.quantity}
                    </div>

                    {/* Thanh tiến độ */}
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-zinc-200">
                      <div
                        className="h-full rounded-full bg-emerald-500"
                        style={{
                          width: `${Math.min(
                            ((itemMission?.quantity ?? 0) /
                              clsMission.quantity) *
                              100,
                            100,
                          )}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Trạng thái */}
                  <div className="flex items-center justify-center">
                    {(itemMission?.quantity ?? 0) < clsMission.quantity &&
                      clsMission.status !== "claimed" && (
                        <div className="text-xs font-semibold text-amber-500">
                          Đang làm
                        </div>
                      )}

                    {(itemMission?.quantity ?? 0) >= clsMission.quantity &&
                      clsMission.status !== "claimed" && (
                        <div
                          className="flex items-center gap-1 rounded-full
              bg-green-100 px-2 py-1
              text-xs font-bold text-green-600
            "
                        >
                          <Check className="h-4 w-4" />
                          Hoàn thành
                        </div>
                      )}

                    {clsMission.status === "claimed" && (
                      <div
                        className="rounded-full bg-zinc-200
              px-2 py-1 text-xs font-bold text-zinc-600
            "
                      >
                        Đã nhận
                      </div>
                    )}
                  </div>
                </div>

                {/* Thưởng */}
                <div className="mt-2 border-t pt-2 text-xs text-purple-600 font-semibold">
                  +{clsMission.rewardExp} EXP hệ phái
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <Loading message="Đang nhận nhiệm vụ..." />{" "}
        </div>
      )}
    </div>
  );
};

export default ClassMissonBottom;

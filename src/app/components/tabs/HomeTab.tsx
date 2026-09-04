"use client";

import { breakthroughAPI } from "@/app/axios/characterAPI";
import { REALM_CSS } from "@/lib/constants/cssConstants";
import {
  DEFAULT_IMG_CHARACTER,
  DEFAULT_IMG_HOME,
  SPIRITSTONE_ICON,
} from "@/lib/constants/imageConstants";
import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import { useToggleStore } from "@/lib/useStore/useToggleStore";
import Image from "next/image";
import UserInfo from "../alert/UserInfo";
import { Menu } from "lucide-react";
import RedeemCodeForm from "../form/RedeemCodeForm";
import OfflineReward from "../ui/OfflineReward";

export default function HomeTab() {
  const { character, updateCharacter } = useCharacterStore();
  const { alertUserInfo, setAalertUserInfo } = useToggleStore();

  const realmStyle =
    REALM_CSS[character.realmId?._id as keyof typeof REALM_CSS];

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

  return (
    <section
      className="relative h-full w-full overflow-hidden"
      style={{
        backgroundImage: `url('${DEFAULT_IMG_HOME}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >     
      {/* Nền nhân vật chồng lên */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('${
            character.skinId?.icon || DEFAULT_IMG_CHARACTER
          }')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <OfflineReward/>

      {/* Nội dung */}
      <div className="relative z-10">
        {/* tên nhân vật */}
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

        {/* linh thạch */}
        <div className="fixed top-0 right-0 p-3 rounded-2xl flex items-center gap-2">
          <Image
            src={SPIRITSTONE_ICON}
            alt="Linh thạch"
            height={80}
            width={80}
            className="w-8 h-8"
          />
          <span className="text-xl text-cyan-500">
            {character?.spiritStone || "0"}
          </span>

          <span onClick={() => setAalertUserInfo("menu")}>
            <Menu />
          </span>
        </div>
      </div>

      {alertUserInfo === "menu" && <UserInfo />}
      {alertUserInfo === "code" && <RedeemCodeForm />}
    </section>
  );
}

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
import UserInfo from "../alert/UserInfo";
import { Menu, Plus } from "lucide-react";
import SingleInputForm from "../form/SingleInputForm";
import OfflineRewardIcon from "../ui/OfflineRewardIcon";
import { useLoadingStore } from "@/lib/useStore/useLoading";
import { showError, showSuccess } from "@/lib/toast";
import Loading from "../ui/Loading";
import SettingAlert from "../alert/SettingAlert";
import ImageIcon from "../ui/ImageIcon";
import { CHANGE_NAME_COST_ONCE } from "@/lib/constants/numberConstants";

export default function HomeTab() {
  const { character, updateCharacter } = useCharacterStore();

  const { alertUserInfo, setAalertUserInfo } = useToggleStore();
  const { actionLoadingName, setActionLoadingName } = useLoadingStore();

  const realmStyle =
    REALM_CSS[character.realmId?._id as keyof typeof REALM_CSS];

  const percent = character?.breakthroughRequired
    ? (character.cultivation / character.breakthroughRequired) * 100
    : 0;

  const breakthroughApi = async () => {
    try {
      setActionLoadingName("break");
      const res = await breakthroughAPI(character._id);

      updateCharacter(res);
      showSuccess("Đột phá thành công");
    } catch (error) {
      console.log(error);
      showError("Đột phá thất bại");
    } finally {
      setActionLoadingName("");
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
      {actionLoadingName === "break" && (
        <Loading message="Đang cảm ngộ đại đạo..." />
      )}

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

      <OfflineRewardIcon />

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
              {character.realmId?.name} -{" "}
              {character.realmId.levels[character.realmLevel - 1].name}
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

        {/* linh thạch, menu */}
        <div
          className="fixed top-2 right-1 z-50 flex items-center gap-3 rounded-2xl border 
          border-amber-200/60 bg-amber-50/95 px-3 py-2 shadow-lg backdrop-blur-sm"
        >
          <div
            className="flex items-center gap-2 rounded-xl border border-cyan-200 
            bg-white/70 px-3 py-1 shadow-sm"
          >
            <ImageIcon src={SPIRITSTONE_ICON} />

            <span className="min-w-fit text-right text-lg font-bold text-cyan-600">
              {(character?.spiritStone || 0).toLocaleString()}
            </span>

            <span>
              <Plus size={20} className="text-green-700" />
            </span>
          </div>

          <button
            onClick={() => setAalertUserInfo("menu")}
            className="flex h-10 w-10 items-center justify-center rounded-xl border 
            border-cyan-200 bg-white/70 text-slate-700 shadow-sm transition-all
            hover:scale-105 active:scale-95"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {alertUserInfo === "menu" && <UserInfo />}
      {alertUserInfo === "code" && (
        <SingleInputForm
          title="NHẬP MÃ QUÀ TẬNG"
          type="redeemCode"
          btnLabel="ĐỔI MÃ"
          placeholderInput="Nhập mã quà tặng..."
        />
      )}
      {alertUserInfo === "changeName" && (
        <SingleInputForm
          title="NHẬP TÊN MỚI"
          type="changeName"
          btnLabel={
            character.countChangeName <= 0 ? (
              `ĐỔI TÊN (Miễn phí x${Math.abs(character.countChangeName) + 1})`
            ) : (
              <div className="flex justify-center items-center gap-2">
                ĐỔI TÊN (
                <div className="flex justify-center items-center">
                  {(Math.abs(character.countChangeName)) * CHANGE_NAME_COST_ONCE}
                  <ImageIcon src={SPIRITSTONE_ICON} />
                </div>)
              </div>
            )
          }
          placeholderInput="Tối đa 30 kí tự"
        />
      )}
      {alertUserInfo === "setting" && <SettingAlert />}
    </section>
  );
}

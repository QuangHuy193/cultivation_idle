"use client";

import { breakthroughAPI } from "@/app/axios/characterAPI";
import { RARITY_CSS, REALM_CSS } from "@/lib/constants/cssConstants";
import {
  DEFAULT_IMG_CHARACTER,
  DEFAULT_IMG_HOME,
  SPIRITSTONE_ICON,
} from "@/lib/constants/imageConstants";
import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import { useToggleStore } from "@/lib/useStore/useToggleStore";
import UserInfo from "../alert/UserInfo";
import { Plus } from "lucide-react";
import SingleInputForm from "../form/SingleInputForm";
import OfflineRewardIcon from "../ui/OfflineRewardIcon";
import { useLoadingStore } from "@/lib/useStore/useLoading";
import { showError, showSuccess } from "@/lib/toast";
import Loading from "../ui/Loading";
import SettingAlert from "../alert/SettingAlert";
import ImageIcon from "../ui/ImageIcon";
import { CHANGE_NAME_COST_ONCE } from "@/lib/constants/numberConstants";
import FeatureListInHome from "../ui/FeatureListInHome";
import MailboxAlert from "../alert/featureInHome/mailbox/MailboxAlert";
import DailyLogin from "../alert/featureInHome/dailyLogin/DailyLogin";
import { displayNumber } from "@/lib/helper";
import Avatar from "../ui/Avatar";

export default function HomeTab() {
  const { character, updateCharacter } = useCharacterStore();

  const { alertUserInfo, setAalertUserInfo, openFeatureListInHome } =
    useToggleStore();
  const { loading, setLoading } = useLoadingStore();

  const realmStyle =
    REALM_CSS[character?.realmId?._id as keyof typeof REALM_CSS];

  const percent = character?.breakthroughRequired
    ? (character.cultivation / character.breakthroughRequired) * 100
    : 0;

  const breakthroughApi = async () => {
    try {
      setLoading("break", true);
      const res = await breakthroughAPI(character?._id ?? "");

      updateCharacter(res);
      showSuccess("Đột phá thành công");
    } catch (error) {
      console.log(error);
      showError("Đột phá thất bại");
    } finally {
      setLoading("break", false);
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
      {/* {actionLoadingName === "break" && (
        <Loading message="Đang cảm ngộ đại đạo..." />
      )} */}

      {/* Nền nhân vật chồng lên */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('${
            character?.skinId?.icon || DEFAULT_IMG_CHARACTER
          }')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Nội dung */}
      <div className="relative z-10">
        {/* ================= NHÂN VẬT ================= */}
        <div
          className="absolute left-1 top-1 flex max-w-[50%] items-center rounded-xl border 
          border-amber-200 bg-amber-50/95 p-0.5 shadow-md backdrop-blur-sm transition-all 
          duration-200 active:scale-[0.98]"
          onClick={() => setAalertUserInfo("menu")}
        >
          {/* Avatar */}
          <div className="shrink-0">
            <Avatar
              icon={character?.skinId.icon ?? DEFAULT_IMG_CHARACTER}
              name={character?.skinId.name || ""}
              border_color={
                RARITY_CSS[character?.skinId?.rarity ?? "common"].text ?? ""
              }
              size="size1"
            />
          </div>

          {/* Thông tin */}
          <div className="min-w-0 flex-1 px-1.5">
            {/* Tên */}
            <div className="max-w-full truncate text-[11px] font-bold text-amber-900 sm:text-sm">
              {character?.name || "Unknown"}
            </div>

            {/* Cảnh giới */}
            <div
              className={`max-w-full truncate text-[10px] font-semibold leading-tight sm:text-xs
                ${realmStyle?.text ?? ""}
                ${realmStyle?.glow ?? ""}`}
            >
              {character?.realmId?.name}
              {" - "}
              {character?.realmId?.levels?.[character.realmLevel - 1]?.name}
            </div>

            {/* Tu vi */}
            <div
              className="mt-1 h-1 w-full min-w-17.5 overflow-hidden rounded-full border 
              border-blue-200 bg-white/80 sm:h-1.5"
            >
              <div
                className="h-full rounded-full bg-linear-to-r from-blue-400 to-cyan-300
                transition-all duration-300"
                style={{
                  width: `${Math.min(percent, 100)}%`,
                }}
              />
              {/* {character?.canBreakthrough && (
                <div className="flex justify-center">
                  <button
                    onClick={breakthroughApi}
                    className="mt-2 w-fit rounded-lg bg-amber-500 px-3 py-2 text-sm 
                    text-white"
                  >                    
                    Đột phá
                  </button>
                </div>
              )} */}
            </div>
          </div>
        </div>

        {/* ================= TÀI NGUYÊN ================= */}
        <div className="absolute right-1 top-1 flex max-w-[47%] flex-col items-end gap-1">
          {/* Linh thạch */}
          <div
            className="w-26 flex items-center gap-1 rounded-lg border border-cyan-200
          bg-white/95 px-1.5 py-1 shadow-sm"
          >
            <ImageIcon src={SPIRITSTONE_ICON} />

            <span
              className="flex-1 text-end min-w-0 truncate text-[11px] font-semibold
            text-cyan-600 sm:text-xs"
            >
              {(character?.spiritStone || 0).toLocaleString()}
            </span>

            <Plus
              size={14}
              className="shrink-0 text-green-700"
              strokeWidth={3}
            />
          </div>

          {/* Vàng */}
          <div
            className="w-26 flex items-center gap-1 rounded-lg border border-yellow-200
          bg-white/95 px-1.5 py-1 shadow-sm"
          >
            <ImageIcon src={SPIRITSTONE_ICON} />

            <span
              className="flex-1 text-end min-w-0 truncate text-[11px] font-semibold
            text-yellow-600 sm:text-xs"
            >
              {displayNumber(character?.gold ?? 0)}
            </span>

            <Plus
              size={14}
              className="shrink-0 text-green-700"
              strokeWidth={3}
            />
          </div>
        </div>
      </div>

      <div className="fixed z-10 top-30 right-2">
        <FeatureListInHome />
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
            (character?.countChangeName ?? 0) <= 0 ? (
              `ĐỔI TÊN (Miễn phí x${Math.abs(character?.countChangeName ?? 0) + 1})`
            ) : (
              <div className="flex justify-center items-center gap-2">
                ĐỔI TÊN (
                <div className="flex justify-center items-center">
                  {Math.abs(character?.countChangeName ?? 0) *
                    CHANGE_NAME_COST_ONCE}
                  <ImageIcon src={SPIRITSTONE_ICON} />
                </div>
                )
              </div>
            )
          }
          placeholderInput="Tối đa 30 kí tự"
        />
      )}
      {alertUserInfo === "setting" && <SettingAlert />}
      {openFeatureListInHome === "mailbox" && <MailboxAlert />}
      {openFeatureListInHome === "dailyLogin" && <DailyLogin />}
      <OfflineRewardIcon />
    </section>
  );
}

"use client";

import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import TippyCustom from "../ui/TippyCustom";
import { calculateCharacterCultivationPerMinute } from "@/lib/helper";
import Image from "next/image";
import { CULTIVATION_ICON } from "@/lib/constants/imageConstants";
import { rewardCultivationOfflineAPI } from "@/app/axios/characterAPI";
import { showSuccess, showWarning } from "@/lib/toast";
import { useLoadingStore } from "@/lib/useStore/useLoading";
import CoatingButton from "../ui/CoatingButton";

interface OfflineRewardAlertProps {
  setIsOpen: (isOpen: boolean) => void;
}

const OfflineRewardAlert = ({ setIsOpen }: OfflineRewardAlertProps) => {
  const { character, updateCharacter } = useCharacterStore();
  const { actionLoadingName, setActionLoadingName } = useLoadingStore();

  const culPerMinute =
    character &&
    calculateCharacterCultivationPerMinute(character.cultivationPerMinute);

  const handleClaimReward = async () => {
    if ((character?.cultivationOffline ?? 0) <= 0) {
      showWarning("Bạn chưa có tu vi ngoại tuyến để nhận!");
    } else {
      try {
        setActionLoadingName("rewardCulOff");
        const res = await rewardCultivationOfflineAPI(character?._id ?? "");
        updateCharacter(res);
        showSuccess("Đã nhận tu vi");
        setIsOpen(false); // Đóng alert sau khi nhận phần thưởng
      } catch (error) {
        console.log(error);
      } finally {
        setActionLoadingName("");
      }
    }
  };
  return (
    <div
      onClick={() => setIsOpen(false)}
      className="fixed inset-0 z-51 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[90%] max-w-sm rounded-2xl border-2 border-yellow-400 bg-linear-to-b 
        from-yellow-50 to-amber-100 p-6 shadow-2xl"
      >
        {/* Tiêu đề */}
        <div className="mb-4 text-center">
          <div className="text-4xl">🎁</div>
          <div className="flex justify-center gap-2 items-end">
            <h1 className="mt-2 text-xl font-bold text-amber-700">
              Thưởng Offline
            </h1>
            <TippyCustom
              content={<div>Nhận thưởng tu vi khi offline tối đa 8h</div>}
            />
          </div>
        </div>

        {/* Nội dung */}
        <div className="rounded-xl bg-white/70 p-4 text-center shadow-inner">
          <div>
            Thời gian đã offline:{" "}
            {Math.floor((character?.timeReawrdOffline ?? 0) / 60)} giờ{" "}
            {(character?.timeReawrdOffline ?? 0) % 60} phút
          </div>

          <div className="text-center">
            <div>Số tu vi nhận theo thời gian: {culPerMinute}/phút</div>
          </div>

          <div className="text-sm text-zinc-500">Tu vi tích lũy</div>
          <div className="flex justify-center items-center my-1">
            <div className="mt-2 text-3xl font-bold text-emerald-600">
              +{character?.cultivationOffline ?? 0}{" "}
            </div>{" "}
            <Image
              alt="ảnh tu vi"
              src={CULTIVATION_ICON}
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        </div>

        {/* Nút */}
        <button
          onClick={handleClaimReward}
          className={`mt-5 w-full rounded-xl bg-linear-to-r from-amber-500 to-yellow-400
          py-3 font-bold text-white shadow-lg transition active:scale-95 relative`}
        >
          Nhận thưởng
          {actionLoadingName === "rewardCulOff" && <CoatingButton />}
        </button>
      </div>
    </div>
  );
};

export default OfflineRewardAlert;

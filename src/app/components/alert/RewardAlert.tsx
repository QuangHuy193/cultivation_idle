"use client";

import { CLASS_COATING_L } from "@/lib/constants/cssConstants";
import {
  CULTIVATION_ICON,
  SPIRITSTONE_ICON,
} from "@/lib/constants/imageConstants";
import { CharacterResponse } from "@/lib/types/characterTypes";
import { useCharacterStore } from "@/lib/useStore/useCharacterStore";

interface RewardAlertProps {
  status: "win" | "lose";
  newCharacter?: CharacterResponse;
  rewards?: any;
  onClose: () => void;
}

const RewardAlert = ({
  status,
  newCharacter,
  rewards,
  onClose,
}: RewardAlertProps) => {
  const { updateCharacter } = useCharacterStore();
  
  const grantReward = () => {
    if (newCharacter) {
      updateCharacter(newCharacter);
    }
    onClose();
  };
  return (
    <div className={`${CLASS_COATING_L} flex items-center justify-center`}>
      <div
        className="min-w-[320px] rounded-2xl border-2 border-yellow-500 
      bg-zinc-900/95 p-6 shadow-2xl"
      >
        {/* Kết quả */}
        <div
          className={`mb-10 text-center text-4xl font-bold tracking-wider ${
            status === "win"
              ? "text-green-500 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]"
              : "text-red-500 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]"
          }`}
        >
          {status === "win" ? "CHIẾN THẮNG" : "THẤT BẠI"}
        </div>

        {/* Tiêu đề thưởng */}
        <div className="mb-4 text-center text-lg font-semibold text-yellow-300">
          Phần thưởng nhận được
        </div>

        {/* Danh sách thưởng */}
        <div className="grid grid-cols-3 gap-4">
          <div
            className="flex h-20 w-20 items-end justify-center rounded-xl border-2 
            border-yellow-500"
            style={{
              backgroundImage: `url("${SPIRITSTONE_ICON}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="text-white text-xl">
              {rewards?.spiritStoneReward}
            </div>
          </div>

          <div
            className="flex h-20 w-20 items-end justify-center rounded-xl border-2 
            border-yellow-500"
            style={{
              backgroundImage: `url("${CULTIVATION_ICON}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="text-white text-xl">{rewards?.realmReward}</div>
          </div>

          {rewards?.equips &&
            rewards?.equips.map((e) => (
              <div
                key={e._id}
                className="flex h-20 w-20 items-end justify-center rounded-xl border-2 
                border-yellow-500"
                style={{
                  backgroundImage: `url("${e.equipId.icon}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            ))}
        </div>

        {/* Nút */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={grantReward}
            className="rounded-xl border border-yellow-400 bg-yellow-500 px-8 
          py-2 font-semibold text-black transition hover:scale-105 hover:bg-yellow-400"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default RewardAlert;

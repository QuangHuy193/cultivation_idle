"use client";

import { useCharacterStore } from "@/lib/useStore/useCharacterStore";

interface OfflineRewardAlertProps {
  setIsOpen: (isOpen: boolean) => void;
}

const OfflineRewardAlert = ({ setIsOpen }: OfflineRewardAlertProps) => {
  const { character } = useCharacterStore();

  const rewardCultivation = Object.values(
    character?.cultivationPerMinute || {},
  ).reduce((acc, curr) => acc + curr, 0);

  const handleClaimReward = () => {
    // Xử lý logic nhận phần thưởng offline ở đây

    setIsOpen(false); // Đóng alert sau khi nhận phần thưởng
  };
  return (
    <div
      onClick={() => setIsOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[90%] max-w-sm rounded-2xl border-2 border-yellow-400 bg-gradient-to-b from-yellow-50 to-amber-100 p-6 shadow-2xl"
      >
        {/* Tiêu đề */}
        <div className="mb-4 text-center">
          <div className="text-4xl">🎁</div>
          <h1 className="mt-2 text-xl font-bold text-amber-700">
            Thưởng Offline
          </h1>
          <p className="text-sm text-zinc-600">Tu vi tích lũy khi bế quan</p>
        </div>

        {/* Nội dung */}
        <div className="rounded-xl bg-white/70 p-4 text-center shadow-inner">
          <div className="text-sm text-zinc-500">Tu vi nhận được</div>

          <div className="mt-2 text-3xl font-bold text-emerald-600">
            +{rewardCultivation ?? 0}
          </div>

          <div className="mt-3 text-sm text-zinc-600">
            ⚡ {rewardCultivation || 0}/phút
          </div>
        </div>

        {/* Nút */}
        <button
          onClick={handleClaimReward}
          className="mt-5 w-full rounded-xl bg-linear-to-r from-amber-500 to-yellow-400
          py-3 font-bold text-white shadow-lg transition active:scale-95"
        >
          Nhận thưởng
        </button>
      </div>
    </div>
  );
};

export default OfflineRewardAlert;

import CoatingButton from "@/app/components/ui/CoatingButton";
import IconItemReward from "@/app/components/ui/IconItemReward";
import { CLASS_COATING_SM } from "@/lib/constants/cssConstants";
import {
  CULTIVATION_ICON,
  SPIRITSTONE_ICON,
} from "@/lib/constants/imageConstants";
import { CharacterService } from "@/lib/services/character.service";
import { showSuccess } from "@/lib/toast";
import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import { useDailyLoginStore } from "@/lib/useStore/useDailyLoginStore";
import { useLoadingStore } from "@/lib/useStore/useLoading";
import { useToggleStore } from "@/lib/useStore/useToggleStore";
import { Gift, X } from "lucide-react";

const DailyLogin = () => {
  const { setOpenFeatureListInHome } = useToggleStore();
  const { dailyLogins } = useDailyLoginStore();
  const { character } = useCharacterStore();
  const { actionLoadingName } = useLoadingStore();

  const totalClaimed = character?.dailyLogin.total ?? 0;
  const todayReward = character?.dailyLogin.rewardDay ?? 0;

  const handleRewarDailyLogin = async () => {
    try {
      await CharacterService.rewarDailyLogin(character?._id ?? "");

      showSuccess("Đã nhận quà điểm danh");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${CLASS_COATING_SM} z-23`}>
      <div
        className="relative flex h-[60%] w-[90%] flex-col gap-3 overflow-hidden rounded-2xl
        border-2 border-amber-500 bg-linear-to-b from-amber-100 to-yellow-100 p-4 
        shadow-2xl"
      >
        {/* close */}
        <button
          onClick={() => setOpenFeatureListInHome("")}
          className="absolute right-1 top-1 z-10 flex h-8 w-8 items-center justify-center 
          rounded-full bg-red-50 text-red-500 shadow-sm transition 
          active:scale-95"
        >
          <X size={20} />
        </button>

        {/* title */}
        <div className="pr-10 text-center">
          <div
            className="flex items-center justify-center gap-2 text-xl font-bold tracking-wide 
            text-amber-800"
          >
            <Gift className="h-6 w-6 text-amber-600" />
            {dailyLogins?.name || "Điểm Danh Hằng Ngày"}
          </div>

          <div
            className="
              mt-1 text-sm font-medium
              text-amber-700
            "
          >
            Đã điểm danh:{" "}
            <span className="font-bold text-red-600">{totalClaimed}</span> ngày
          </div>
        </div>

        {/* rewards */}
        <div className="flex-1 overflow-y-auto pr-1">
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
            {dailyLogins?.days.map((day) => {
              const claimed = day.day < todayReward;

              return (
                <div
                  key={day._id}
                  className={`relative flex min-h-28 flex-col
                    items-center justify-between
                    rounded-xl border p-2 border-cyan-500
                    transition-all`}
                >
                  {/* day */}
                  <div
                    className={`
                      rounded-full px-2 py-0.5
                      text-xs font-bold
                      
                    `}
                  >
                    Ngày {day.day}
                  </div>

                  {/* reward */}
                  <div className="flex flex-wrap items-center justify-center gap-1">
                    {day.reward.spiritStone > 0 && (
                      <IconItemReward
                        claimed={claimed}
                        url={SPIRITSTONE_ICON}
                        number={day.reward.spiritStone}
                        bgColor="bg-amber-200"
                        size="M"
                      />
                    )}

                    {day.reward.cultivation > 0 && (
                      <IconItemReward
                        claimed={claimed}
                        url={CULTIVATION_ICON}
                        number={day.reward.cultivation}
                        bgColor="bg-amber-200"
                        size="M"
                      />
                    )}
                  </div>

                  {/* claimed */}
                  {claimed && (
                    <div
                      className="absolute inset-0 flex items-center justify-center rounded-xl
                      bg-black/10"
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* action */}
        {new Date(character?.dailyLogin.lastClaimAt ?? "").getDate() ===
        new Date().getDate() ? (
          <div className="font-bold text-xl w-full flex justify-center">
            <div
              className="w-fit rounded-2xl border border-amber-400 bg-amber-300 px-4 
            py-2 font-bold text-xl text-amber-700 shadow-inner shadow-amber-700/30 
            opacity-80"
            >
              Đã nhận
            </div>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={handleRewarDailyLogin}
              className="w-full rounded-xl border-2 border-amber-600 bg-linear-to-b 
              from-yellow-400 to-amber-500 py-3 text-sm font-bold tracking-wide 
              text-white shadow-md transition-all hover:shadow-lg active:scale-[0.98]"
            >
              NHẬN THƯỞNG
            </button>
            {actionLoadingName === "rewarDailyLogin" && <CoatingButton />}
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyLogin;

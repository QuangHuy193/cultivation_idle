import {
  CULTIVATION_ICON,
  SPIRITSTONE_ICON,
} from "@/lib/constants/imageConstants";
import { useMailboxStore } from "@/lib/useStore/useMailBox";
import IconItemReward from "../../ui/IconItemReward";
import { checkHasReward } from "@/lib/helper";
import { mailboxService } from "@/lib/services/mailbox.service";
import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import { showSuccess } from "@/lib/toast";
import { useLoadingStore } from "@/lib/useStore/useLoading";
import CoatingButton from "../../ui/CoatingButton";

const MailSelected = () => {
  const { character } = useCharacterStore();
  const { selectedMail } = useMailboxStore();
  const { actionLoadingName, setActionLoadingName } = useLoadingStore();

  const hasReward = selectedMail && checkHasReward(selectedMail.reward);

  const handleReward = async () => {
    try {
      setActionLoadingName("rewardMailbox");
      await mailboxService.rewardMailbox(
        character?._id ?? "",
        selectedMail?._id || "",
      );
      showSuccess("Đã nhận thưởng");
    } catch (error) {
      console.log(error);
    } finally {
      setActionLoadingName("");
    }
  };

  if (!selectedMail) {
    return (
      <div className="flex h-full items-center justify-center text-amber-700 italic">
        Chọn một thư để xem nội dung
      </div>
    );
  }

  return (
    <div
      className="flex h-full flex-col
        rounded-xl
        border-2 border-amber-300
        bg-linear-to-b from-amber-50 to-yellow-50
        p-4
      "
    >
      {/* Tiêu đề */}
      <div className="border-b border-amber-300 pb-2">
        <div className="text-lg font-bold text-amber-900">
          {selectedMail.title}
        </div>

        <div className="text-xs text-amber-600">
          {new Date(selectedMail.createdAt).toLocaleString("vi-VN")}
        </div>
      </div>

      {/* Nội dung */}
      <div className="mt-3 flex-1 overflow-y-auto rounded-lg bg-white/50 p-3">
        <div className="whitespace-pre-wrap text-sm text-amber-900">
          {selectedMail.content || "Không có nội dung"}
        </div>
      </div>

      {/* Phần thưởng */}
      <div className="mt-3">
        {hasReward && (
          <div className="mb-2 text-sm font-bold text-amber-800">
            Phần thưởng
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {selectedMail.reward.spiritStone > 0 && (
            <IconItemReward
              claimed={selectedMail.status === 2}
              url={SPIRITSTONE_ICON}
              number={selectedMail.reward.spiritStone}
              bgColor="bg-amber-200"
            />
          )}

          {selectedMail.reward.cultivation > 0 && (
            <IconItemReward
              claimed={selectedMail.status === 2}
              url={CULTIVATION_ICON}
              number={selectedMail.reward.cultivation}
              bgColor="bg-amber-200"
            />
          )}
        </div>
      </div>

      {/* Nút nhận */}
      {selectedMail.status !== 2 && hasReward && (
        <button
          className="mt-4 rounded-xl bg-linear-to-b from-yellow-400 to-amber-500 py-2
          font-bold text-white shadow active:scale-95 relative"
          onClick={handleReward}
        >
          Nhận thưởng
          {actionLoadingName === "rewardMailbox" && <CoatingButton />}
        </button>
      )}

      {selectedMail.status === 2 && (
        <div className="text-center mt-4 rounded-xl text-yellow-400 py-2 font-bold">
          Đã nhận
        </div>
      )}
    </div>
  );
};

export default MailSelected;

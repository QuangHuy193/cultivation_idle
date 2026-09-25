"use client";
import { CLASS_COATING_SM, CLASS_X_ALERT } from "@/lib/constants/cssConstants";
import { useMailboxStore } from "@/lib/useStore/useMailBox";
import MailboxItem from "./MailboxItem";
import { ArrowBigLeft, Trash, X } from "lucide-react";
import { useToggleStore } from "@/lib/useStore/useToggleStore";
import MailSelected from "./MailSelected";

const MailboxAlert = () => {
  const { mailboxes, selectedMail, setSelectedMail } = useMailboxStore();
  const { setOpenFeatureListInHome } = useToggleStore();

  return (
    <div className={`${CLASS_COATING_SM} z-30`}>
      <div className="relative h-[60%] w-[80%] bg-amber-200 rounded-2xl p-4">
        <X
          className={`${CLASS_X_ALERT} text-red-500`}
          onClick={() => {
            setOpenFeatureListInHome('');
            setSelectedMail(null);
          }}
        />

        {selectedMail !== null && (
          <div
            className="absolute top-0 left-0 active:scale-95"
            onClick={() => setSelectedMail(null)}
          >
            <ArrowBigLeft size={48} className="text-gray-100 fill-gray-200" />
          </div>
        )}

        <div className="text-center pb-2 font-bold text-cyan-300 text-xl">
          HỘP THƯ
        </div>
        {/* content */}
        <div className="bg-amber-100 w-full h-[85%] rounded-2xl overflow-y-scroll">
          {mailboxes !== null ? (
            selectedMail ? (
              <div className="h-full">
                <MailSelected />
              </div>
            ) : mailboxes.length > 0 ? (
              mailboxes.map((m) => (
                <div key={m._id}>
                  <MailboxItem mail={m} />
                </div>
              ))
            ) : (
              <div className="flex h-full w-full justify-center italic pt-2">
                Bạn chưa nhận được thư nào!
              </div>
            )
          ) : (
            <div className="flex h-full w-full justify-center italic pt-2">
              Đang lấy thư...
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <button
            className="bg-linear-to-r from-red-400 to-red-500 px-3 py-2 mt-2 
          rounded-2xl active:scale-95 transition-all text-white font-bold flex items-center
          justify-center gap-1"
          >
            {!selectedMail ? "Xóa thư đã đọc" : "Xóa thư"}{" "}
            <Trash className="fill-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MailboxAlert;

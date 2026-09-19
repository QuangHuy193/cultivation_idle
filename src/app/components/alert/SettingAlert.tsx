import { CLASS_COATING_SM, CLASS_X_ALERT } from "@/lib/constants/cssConstants";
import { useToggleStore } from "@/lib/useStore/useToggleStore";
import { X } from "lucide-react";
import React from "react";

const SettingAlert = () => {
  const { setAalertUserInfo } = useToggleStore();
  return (
    <div className={CLASS_COATING_SM}>
      <div
        className="relative w-85 rounded-3xl border-2 border-yellow-700 
      bg-linear-to-b from-amber-100 to-yellow-50 p-5 shadow-2xl flex justify-center"
      >
        <button onClick={() => setAalertUserInfo("menu")} className={CLASS_X_ALERT}>
          <X className="h-5 w-5 text-red-500" />
        </button>
        <div className="flex flex-col items-center gap-3 w-[60%]">
          <button
            className="rounded-xl bg-linear-to-b from-blue-400 to-blue-600 py-3 w-full 
                font-semibold text-white shadow-md transition "
          >
            Cài Đặt 1
          </button>
          <button
            className="rounded-xl bg-linear-to-b from-blue-400 to-blue-600 py-3 w-full 
                font-semibold text-white shadow-md transition "
          >
            Cài
          </button>
          <button
            className="rounded-xl bg-linear-to-b from-blue-400 to-blue-600 py-3 w-full 
                font-semibold text-white shadow-md transition "
          >
            Cài Đặt 3
          </button>

          <button
            className="rounded-xl bg-linear-to-b from-red-400 to-red-600 py-3 w-full 
                font-semibold text-white shadow-md transition mt-5"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingAlert;

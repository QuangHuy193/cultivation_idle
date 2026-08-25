"use client";

import { redeemCodeAPI } from "@/app/axios/codeAPI";
import { CLASS_COATING_SM, CLASS_X_ALERT } from "@/lib/constants/cssConstants";
import { showError, showSuccess, showWarning } from "@/lib/toast";
import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import { useToggleStore } from "@/lib/useStore/useToggleStore";
import { useUserStore } from "@/lib/useStore/useUserStore";
import { X } from "lucide-react";
import { useState } from "react";

const RedeemCodeForm = () => {
  const [code, setCode] = useState("");
  const { userId } = useUserStore();
  const { setAalertUserInfo } = useToggleStore();
  const { character, setCharacter } = useCharacterStore();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId || !character._id) {
      return;
    }

    if (!code) {
      showWarning("Bạn chưa nhập mã quà tặng");
      return;
    }

    try {
      const res = await redeemCodeAPI(userId, code, character._id);

      if (res.success) {
        showSuccess(res.message);
        setCharacter(res.character);        
      }
    } catch (error) {
      showError(error?.message);
    } finally {
      setCode("");
    }
  };
  return (
    <div className={CLASS_COATING_SM}>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 bg-linear-to-b to-amber-100 from-yellow-50 p-5 
      rounded-2xl relative"
      >
        <button
          onClick={() => setAalertUserInfo("")}
          className={CLASS_X_ALERT}
        >
          <X className="h-5 w-5 text-red-500" />
        </button>

        <div className="text-center">
          <h2 className="text-lg font-bold text-yellow-700">
            Nhập Mã Quà Tặng
          </h2>
        </div>

        <input
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
          }}
          type="text"
          placeholder="Mã quà tặng..."
          className="w-full rounded-xl border-2 border-yellow-300 bg-white px-4 py-3 text-center font-semibold outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300"
        />

        <button
          type="submit"
          className="rounded-xl bg-linear-to-b from-blue-100 to-blue-600 py-3 font-bold text-white shadow-md transition hover:scale-105 active:scale-95"
        >
          Đổi Mã
        </button>
      </form>
    </div>
  );
};

export default RedeemCodeForm;

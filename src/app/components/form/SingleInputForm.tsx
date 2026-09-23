"use client";

import { redeemCodeAPI } from "@/app/axios/codeAPI";
import { CLASS_COATING_SM, CLASS_X_ALERT } from "@/lib/constants/cssConstants";
import { showError, showSuccess, showWarning } from "@/lib/toast";
import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import { useLoadingStore } from "@/lib/useStore/useLoading";
import { useToggleStore } from "@/lib/useStore/useToggleStore";
import { useUserStore } from "@/lib/useStore/useUserStore";
import { X } from "lucide-react";
import React, { useState } from "react";
import CoatingButton from "../ui/CoatingButton";
import { validateName } from "@/lib/helper";
import { CHANGE_NAME_COST_ONCE } from "@/lib/constants/numberConstants";
import { changeNameAPI } from "@/app/axios/characterAPI";
import { useMailboxStore } from "@/lib/useStore/useMailBox";

interface SingleInputFormProps {
  type: "redeemCode" | "changeName";
  title: string;
  btnLabel: string | React.ReactElement;
  placeholderInput: string;
}

const SingleInputForm = ({
  type,
  title,
  btnLabel,
  placeholderInput,
}: SingleInputFormProps) => {
  const [formData, setFormData] = useState("");
  const { userId } = useUserStore();
  const { setAalertUserInfo, setComfirmAlert } = useToggleStore();
  const { character, updateCharacter } = useCharacterStore();
  const { updateMailboxes } = useMailboxStore();
  const { actionLoadingName, setActionLoadingName } = useLoadingStore();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (type === "redeemCode") {
      redeemCode();
    }

    if (type === "changeName") {
      changName();
    }
  };

  const changName = async () => {
    if (!userId || !character._id) {
      return;
    }

    if (!formData) {
      showWarning("Bạn chưa nhập tên mới");
      return;
    }

    if (formData === character.name) {
      showWarning("Bạn chưa đổi tên!");
      return;
    }

    if (!validateName(formData).check) {
      showError(validateName(formData).mess || "");
      return;
    }

    if (character.countChangeName > 0) {
      if (
        (character.countChangeName + 1) * CHANGE_NAME_COST_ONCE >
        character.spiritStone
      ) {
        showError("Bạn không đủ linh thạch!");
      }

      setComfirmAlert({
        isOpen: true,
        onNo: () => {
          setComfirmAlert({ isOpen: false });
        },
        onYes: async () => {
          try {
            const res = await changeNameAPI(character._id, formData);
            updateCharacter(res);
            setAalertUserInfo("menu");
            showSuccess("Đã đổi tên");
            setComfirmAlert({ isOpen: false });
          } catch (error) {
            console.log(error);
          }
        },
        text: "Bạn chắc chắn muốn dùng linh thạch để đổi tên chứ?",
      });
    } else {
      try {
        const res = await changeNameAPI(character._id, formData);
        updateCharacter(res);
        setAalertUserInfo("menu");
        showSuccess("Đã đổi tên");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const redeemCode = async () => {
    if (!userId || !character._id) {
      return;
    }

    if (!formData) {
      showWarning("Bạn chưa nhập mã quà tặng");
      return;
    }

    try {
      setActionLoadingName("redeemCode");
      const res = await redeemCodeAPI(userId, formData, character._id);

      if (res.success) {
        showSuccess("Quà đã được gửi vào thư của bạn");
        updateMailboxes(res.newMailbox);
      }
    } catch (error) {
      showError(error?.message);
    } finally {
      setFormData("");
      setActionLoadingName("");
    }
  };
  return (
    <div className={`${CLASS_COATING_SM} z-50`}>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 bg-linear-to-b to-amber-100 from-yellow-50 p-5 
      rounded-2xl relative w-85"
      >
        <button
          onClick={() => setAalertUserInfo("menu")}
          className={CLASS_X_ALERT}
        >
          <X className="h-5 w-5 text-red-500" />
        </button>

        <div className="text-center">
          <h2 className="text-lg font-bold text-yellow-700">{title}</h2>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium text-amber-800 text-center">
            {placeholderInput}
          </div>
          <input
            value={formData}
            onChange={(e) => {
              setFormData(e.target.value);
            }}
            type="text"
            placeholder={type === "redeemCode" ? placeholderInput : ""}
            className="w-full rounded-xl border-2 border-yellow-300 bg-white px-4 py-3 
            text-center font-semibold outline-none transition focus:border-yellow-500 
            focus:ring-2 focus:ring-yellow-300"
          />
        </div>

        <button
          type="submit"
          className="rounded-xl bg-linear-to-b from-blue-100 to-blue-600 py-3 font-bold 
          text-white shadow-md transition hover:scale-105 active:scale-95 relative"
        >
          {btnLabel}
          {type === "redeemCode" && actionLoadingName === "redeemCode" && (
            <CoatingButton />
          )}
        </button>
      </form>
    </div>
  );
};

export default SingleInputForm;

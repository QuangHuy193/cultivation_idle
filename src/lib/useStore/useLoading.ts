import { create } from "zustand";

export type LoadingKey =
  | ""
  | "signin" // đăng nhập
  | "signup" // đăng kí
  | "getUser" // tải user
  | "unequip" // gỡ trang bị
  | "equip" // trang bị
  | "useItem" // dùng vật phẩm
  | "unequipSkill" // gỡ trang bị skill
  | "equipSkill" // trang bị skill
  | "getMaps" // tải map
  | "break" // đột phá cảnh giới
  | "redeemCode" // đổi code
  | "selectClass" // chọn class
  | "rewardCulOff" // nhận thưởng tu vi khi offline
  |"rewardMailbox"// nhận quà từ mail
  | string; // các trường hợp danh sách dùng id
interface useLoandingState {
  actionLoadingName: LoadingKey;

  setActionLoadingName: (loading: LoadingKey) => void;
}

export const useLoadingStore = create<useLoandingState>()((set) => ({
  actionLoadingName: "",

  setActionLoadingName: (loading) => {
    set((state) => ({
      ...state,
      actionLoadingName: loading,
    }));
  },
}));

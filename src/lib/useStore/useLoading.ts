import { create } from "zustand";

export type LoadingKey =
  | ""
  | "getUser" // tải user
  | "unequip" // gỡ trang bị
  | "equip" // trang bị
  | "useItem" // dùng vật phẩm
  | "unequipSkill" // gỡ trang bị skill
  | "equipSkill" // trang bị skill
  | "getMaps"// tải map
  | "break" // đột phá cảnh giới
  |"equipSkin"// trang bị skin
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

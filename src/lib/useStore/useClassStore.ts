import { create } from "zustand";
import { Class } from "../types/classTypes";

interface useClassState {
  loadingUseClass: boolean;

  classes: Class[] | null;

  setLoadingUseClass: (loading: boolean) => void;

  setClasses: (classes: Class[] | []) => void;
}

export const useClassStore = create<useClassState>()((set) => ({
  loadingUseClass: false,

  classes: null,

  setLoadingUseClass: (loading) => {
    set((state) => ({
      ...state,
      loadingUseClass: loading,
    }));
  },

  setClasses: (classes) => {
    set({ classes });
  },
}));

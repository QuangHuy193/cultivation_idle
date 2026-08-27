import { create } from "zustand";
import { Class } from "../interface";

interface useClassState {
  loadingUseClass: boolean;

  classes: Class[] | [];

  setLoadingUseClass: (loading: boolean) => void;

  setClasses: (classes: Class[] | []) => void;
}

export const useClassStore = create<useClassState>()((set) => ({
  loadingUseClass: false,

  classes: [],

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

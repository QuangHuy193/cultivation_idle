import { ProgressMapResponse } from "./../interface";
import { create } from "zustand";

interface UserMapState {
  loadingUseMap: boolean;

  progressMap: ProgressMapResponse | null;

  setLoadingUseMap: (loading: boolean) => void;

  setProgressMap: (progressMap: ProgressMapResponse) => void;

  updateProgressMap: (data: any) => void;
}

export const useMapStore = create<UserMapState>()((set) => ({
  loadingUseMap: false,

  progressMap: null,

  setLoadingUseMap: (loading) => {
    set((state) => ({
      ...state,
      loadingUseMap: loading,
    }));
  },

  setProgressMap: (progressMap) => {
    set({ progressMap });
  },
  
  updateProgressMap: (data) => {
    set((state) => ({
      progressMap: {
        ...state.progressMap,
        ...data,
      },
    }));
  },
}));

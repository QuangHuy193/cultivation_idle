import { ProgressMapResponse } from "./../interface";
import { create } from "zustand";

interface UserMapState {
  progressMap: ProgressMapResponse | null;

  setProgressMap: (progressMap: ProgressMapResponse) => void;

  updateProgressMap: (data: any) => void;
}

export const useMapStore = create<UserMapState>()((set) => ({
  progressMap: null,

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

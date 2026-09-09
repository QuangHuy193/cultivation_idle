import { create } from "zustand";
import { MapsResponse } from "../types/mapTypes";

interface UserMapState {
  loadingUseMap: boolean;

  maps: MapsResponse[] | [];

  setLoadingUseMap: (loading: boolean) => void;

  setMaps: (maps: MapsResponse[]) => void;

  updateMaps: (data: any) => void;
}

export const useMapStore = create<UserMapState>()((set) => ({
  loadingUseMap: false,

  maps: [],

  setLoadingUseMap: (loading) => {
    set((state) => ({
      ...state,
      loadingUseMap: loading,
    }));
  },

  setMaps: (maps) => {
    set({ maps });
  },

  updateMaps: (data) => {
    set((state) => ({
      progressMap: {
        ...state.progressMap,
        ...data,
      },
    }));
  },
}));

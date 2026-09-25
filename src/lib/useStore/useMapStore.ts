import { create } from "zustand";
import { MapsResponse } from "../types/mapTypes";

interface UserMapState {
  maps: MapsResponse[] | null;

  setMaps: (maps: MapsResponse[]|[]) => void;
}

export const useMapStore = create<UserMapState>()((set) => ({
  maps: null,

  setMaps: (maps) => {
    set({ maps });
  },
}));

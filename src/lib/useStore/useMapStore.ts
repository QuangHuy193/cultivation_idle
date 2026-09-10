import { create } from "zustand";
import { MapsResponse } from "../types/mapTypes";

interface UserMapState {

  maps: MapsResponse[] | [];
  
  setMaps: (maps: MapsResponse[]) => void;

  updateMaps: (data: any) => void;
}

export const useMapStore = create<UserMapState>()((set) => ({
 

  maps: [],

 
  setMaps: (maps) => {
    set({ maps });
  },

  updateMaps: (data) => {
    set((state) => ({
      maps: {
        ...state.maps,
        ...data,
      },
    }));
  },
}));

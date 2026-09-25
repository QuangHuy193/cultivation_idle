import { create } from "zustand";
import { Skin } from "@/lib/types/skinTypes";

interface UserSkinState {
  selectedSkin: Skin | null;

  owner: boolean;

  skins: Skin[];

  setSkins: (data: Skin[]) => void;

  setSelectedSkin: (skin: Skin | null, owner: boolean) => void;
}

export const useSkinStore = create<UserSkinState>()((set) => ({
  selectedSkin: null,

  owner: true,

  skins: [],

  setSkins: (data) => {
    set({ skins: data });
  },

  setSelectedSkin: (skin, owner) => {
    set({ selectedSkin: skin, owner: owner });
  },
}));

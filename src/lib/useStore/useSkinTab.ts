import { create } from "zustand";
import { Skin } from "../interface";

interface UserSkinState {
  selectedSkin: Skin;

  owner: boolean;

  skins: Skin[];

  setSkins: (data: Skin[]) => void;

  setSelectedSkin: (skin: Skin, owner: boolean) => void;
}

const defaultSkin = {
  _id: "",
  name: "",
  icon: "",
  bg: "",
  rarity: "",
  price: {
    number: 0,
    unity: "",
  },
  buffs: {
    attack: 0,
    hp: 0,
    defense: 0,
  },
};

export const useSkinStore = create<UserSkinState>()((set) => ({
  selectedSkin: defaultSkin,

  owner: true,

  skins: [],

  setSkins: (data) => {
    set({ skins: data });
  },

  setSelectedSkin: (skin, owner) => {
    set({ selectedSkin: skin, owner: owner });
  },
}));

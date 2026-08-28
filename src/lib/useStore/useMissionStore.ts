import { create } from "zustand";
import { CharacterClassMission } from "../interface";

interface useMisionState {
  loadingUseMision: boolean;

  characterClassMission: CharacterClassMission[] | [];

  setLoadingUseMision: (loading: boolean) => void;

  setCharacterClassMission: (
    characterClassMission: CharacterClassMission[] | [],
  ) => void;
}

export const useMisionStore = create<useMisionState>()((set) => ({
  loadingUseMision: false,

  characterClassMission: [],

  setLoadingUseMision: (loading) => {
    set((state) => ({
      ...state,
      loadingUseClass: loading,
    }));
  },

  setCharacterClassMission: (characterClassMission) => {
    set({ characterClassMission });
  },
}));

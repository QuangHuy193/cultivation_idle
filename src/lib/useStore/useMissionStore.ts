import { create } from "zustand";
import { CharacterClassMission } from "../types/characterTypes";

interface useMisionState {
  loadingUseMision: boolean;

  characterClassMission: CharacterClassMission[] | null;

  setLoadingUseMision: (loading: boolean) => void;

  setCharacterClassMission: (
    characterClassMission: CharacterClassMission[] | [],
  ) => void;
}

export const useMisionStore = create<useMisionState>()((set) => ({
  loadingUseMision: false,

  characterClassMission: null,

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

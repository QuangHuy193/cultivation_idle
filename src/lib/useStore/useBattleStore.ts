import { create } from "zustand";
import { BattleState } from "../types/battleTypes";

interface UseBattleStore {
  loadingUseBattle: boolean;

  battle: BattleState | null;

  isBattleStart: boolean;

  isBattlePause: boolean;

  setLoadingUseBattle: (loading: boolean) => void;

  setBattle: (battle: BattleState | null) => void;

  updateBattle: (updater: (battle: BattleState) => BattleState) => void;

  setIsBattleStart: (isStart: boolean) => void;

  setIsBattlePause: (isPause: boolean) => void;
}

export const useBattleStore = create<UseBattleStore>()((set) => ({
  loadingUseBattle: false,

  battle: null,

  isBattleStart: false,

  isBattlePause: false,

  setLoadingUseBattle: (loading) => {
    set((state) => ({
      ...state,
      loadingUseBattle: loading,
    }));
  },

  setBattle: (battle) => {
    set({ battle });
  },

  updateBattle: (updater) =>
    set((state) => {
      if (!state.battle) return state;

      return {
        battle: updater(state.battle),
      };
    }),

  setIsBattleStart: (isStart) => {
    set((state) => ({
      ...state,
      isBattleStart: isStart,
    }));
  },

  setIsBattlePause: (isPause) => {
    set((state) => ({
      ...state,
      isBattlePause: isPause,
    }));
  },
}));

import { create } from "zustand";
import { BattleState } from "../interface";

const battleStateDefault = {
  turn: 1,

  playerHp: 1,
  playerMaxHp: 1,

  monster: {
    id: "",
    name: "",
    icon: "",
    hp: 1,
    maxHp: 1,
    attack: 1,
    defense: 1,
  },

  skills: [],

  battleStatus: "fighting",

  logs: [],
};

interface UseBattleStore {
  battle: BattleState;

  setBattle: (battle: BattleState) => void;

  updateBattle: (updater: (battle: BattleState) => BattleState) => void;

  updateBattleStatus: (status: string) => void;

  addLog: (log: string) => void;
}

export const useBattleStore = create<UseBattleStore>()((set) => ({
  battle: battleStateDefault,

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

  updateBattleStatus: (status) =>
    set((state) => {
      if (!state.battle) return state;

      return {
        battle: { ...state.battle, battleStatus: status },
      };
    }),

  addLog: (log) =>
    set((state) => {
      if (!state.battle) return state;

      return {
        battle: {
          ...state.battle,
          logs: [...state.battle.logs, log].slice(-50),
        },
      };
    }),
}));

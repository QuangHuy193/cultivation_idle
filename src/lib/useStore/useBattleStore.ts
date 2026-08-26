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
    atk: 1,
    def: 1,
  },

  skills: [],

  battleStatus: "fighting",

  logs: [
    {
      name: "",
      enemyName: "",
      damge: 0,
      skill: "",
    },
  ],
};

interface UseBattleStore {
  battle: BattleState;

  isBattleStart: boolean;

  isBattlePause: boolean;

  setBattle: (battle: BattleState) => void;

  updateBattle: (updater: (battle: BattleState) => BattleState) => void;

  setIsBattleStart: (isStart: boolean) => void;

  setIsBattlePause: (isPause: boolean) => void;
}

export const useBattleStore = create<UseBattleStore>()((set) => ({
  battle: battleStateDefault,

  isBattleStart: false,

  isBattlePause: false,

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

  setIsBattleStart: (isStart: boolean) => {
    set((state) => ({
      ...state,
      isBattleStart: isStart,
    }));
  },

  setIsBattlePause: (isPause: boolean) => {
    set((state) => ({
      ...state,
      isBattlePause: isPause,
    }));
  },
}));

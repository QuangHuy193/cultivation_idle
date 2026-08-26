import { create } from "zustand";
import { BattleState } from "../interface";

const battleStateDefault = {
  turn: 1,

  playerHp: 1,
  playerMaxHp: 1,

  monster: {
    monsterId: "",
    name: "",
    icon: "",
    hp: 1,
    maxHp: 1,
    atk: 1,
    def: 1,
  },

  mapId: "",

  stage: 1,

  skills: [],

  battleStatus: "fighting",

  lastTurnAt: Date.now().toLocaleString(),

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
  loadingUseBattle: boolean;

  battle: BattleState;

  isBattleStart: boolean;

  isBattlePause: boolean;

  setLoadingUseBattle: (loading: boolean) => void;

  setBattle: (battle: BattleState) => void;

  updateBattle: (updater: (battle: BattleState) => BattleState) => void;

  setIsBattleStart: (isStart: boolean) => void;

  setIsBattlePause: (isPause: boolean) => void;
}

export const useBattleStore = create<UseBattleStore>()((set) => ({
  loadingUseBattle: false,

  battle: battleStateDefault,

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

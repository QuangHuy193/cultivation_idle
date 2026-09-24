import { create } from "zustand";
import type { CharacterResponse } from "@/lib/types/characterTypes";
import { persist } from "zustand/middleware";
import { CharacterState } from "../types/store";

const defaultCharacter: any = {
  _id: "",
  userId: "",
  name: "",
  realmId: "",
  realmLevel: 1,
  cultivation: 0,
  cultivationPerSecond: { base: 1, fromMap: 0, fromItem: 0, fromVip: 0 },
  spiritStone: 0,
  stats: {
    hp: 100,
    attack: 10,
    defense: 10,
  },
  finalStats: { hp: 100, attack: 10, defense: 10 },
  equipments: {},
  inventory: { equips: [], items: [], skills: [] },
  lastOnlineAt: new Date().toISOString(),
};

export const useCharacterStore = create<CharacterState>()(
  persist(
    (set) => ({
      character: defaultCharacter,

      setCharacter: (character) => set({ character }),

      updateCharacter: (updates) =>
        set((state) => ({
          character: {
            ...state.character,
            ...updates,
          },
        })),

      clearCharacter: () =>
        set({
          character: defaultCharacter,
        }),
    }),
    {
      name: "character-storage",
    },
  ),
);

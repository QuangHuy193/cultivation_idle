import { create } from "zustand";
import type { CharacterResponse } from "@/lib/types/characterTypes";
import { persist } from "zustand/middleware";

export interface CharacterState {
  character: CharacterResponse | null;

  setCharacter: (character: CharacterResponse) => void;

  updateCharacter: (updates: Partial<CharacterResponse>) => void;

  clearCharacter: () => void;
}

export const useCharacterStore = create<CharacterState>()(
  persist(
    (set) => ({
      character: null,

      setCharacter: (character) => set({ character }),

      updateCharacter: (updates) =>
        set((state) => {
          if (!state.character) {
            return state;
          }

          return {
            character: {
              ...state.character,
              ...updates,
            },
          };
        }),

      clearCharacter: () =>
        set({
          character: null,
        }),
    }),
    {
      name: "character-storage",
    },
  ),
);

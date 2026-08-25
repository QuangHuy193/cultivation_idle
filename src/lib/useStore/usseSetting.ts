import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserSettingState {
  battleSpeed: number;
  setBattleSpeed: (speed: number) => void;
}

export const useSettingStore = create<UserSettingState>()(
  persist(
    (set) => ({
      battleSpeed: 1,
      setBattleSpeed: (speed) =>
        set({
          battleSpeed: speed,
        }),
    }),
    {
      name: "setting-storage",
      partialize: (state) => ({
        battleSpeed: state.battleSpeed,
      }),
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserSettingState {
  battleSpeed: number;
  featureListInHomeStatus: "open" | "close";

  setBattleSpeed: (speed: number) => void;
  setFeatureListInHomeStatus: (status: "open" | "close") => void;
}

export const useSettingStore = create<UserSettingState>()(
  persist(
    (set) => ({
      battleSpeed: 1,
      featureListInHomeStatus: "open",

      setBattleSpeed: (speed) =>
        set({
          battleSpeed: speed,
        }),
      setFeatureListInHomeStatus: (status) => {
        set({
          featureListInHomeStatus: status,
        });
      },
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

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserAuthState {
  userId: string | null;
  email: string | null;
  token: string | null;
  setAuth: (payload: { email: string; token: string; _id: string }) => void;
  clearAuth: () => void;
}

export const useUserStore = create<UserAuthState>()(
  persist(
    (set) => ({
      userId: null,
      email: null,
      token: null,
      setAuth: (payload) =>
        set({
          email: payload.email,
          token: payload.token,
          userId: payload._id,
        }),
      clearAuth: () => set({ email: null, token: null, userId: null }),
    }),
    {
      name: "user-auth-storage",
      partialize: (state) => ({
        userId: state.userId,
        email: state.email,
        token: state.token,
      }),
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

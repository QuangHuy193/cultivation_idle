import { create } from "zustand";
import { ResponseDailyLogin } from "../types/dailyLoginTypes";

interface useDailyLoginState {
  dailyLogins: ResponseDailyLogin | null;

  setDailyLogins: (daily: ResponseDailyLogin | null) => void;
}

export const useDailyLoginStore = create<useDailyLoginState>()((set) => ({
  dailyLogins: null,

  setDailyLogins: (daily) => {
    set({ dailyLogins: daily });
  },
}));

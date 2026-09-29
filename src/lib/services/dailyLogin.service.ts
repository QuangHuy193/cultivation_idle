import { useDailyLoginStore } from "../useStore/useDailyLoginStore";
import { useLoadingStore } from "../useStore/useLoading";
import { getDailyLoginListAPI } from "@/app/axios/dailyLoginApi";

export const dailyLoginService = {
  async getDailyLogin() {
    try {
      useLoadingStore.getState().setLoading("getDailyLogin", true);

      const response = await getDailyLoginListAPI();

      useDailyLoginStore.getState().setDailyLogins(response);
    } catch (error) {
      console.log("dailyLoginService.getDailyLogin", error);
    } finally {
      useLoadingStore.getState().setLoading("getDailyLogin", false);
    }
  },
};

import { useLoadingStore } from "../useStore/useLoading";
import { getSkinsAPI } from "@/app/axios/skinAPI";
import { useSkinStore } from "../useStore/useSkinTab";

export const skinService = {
  async getSkins() {
    try {
      useLoadingStore.getState().setLoading("getSkins", true);

      const response = await getSkinsAPI();

      useSkinStore.getState().setSkins(response);
    } catch (error) {
      console.log("skinService.getSkins", error);
    } finally {
      useLoadingStore.getState().setLoading("getSkins", false);
    }
  },
};

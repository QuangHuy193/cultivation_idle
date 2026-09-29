import { useLoadingStore } from "../useStore/useLoading";
import { getRealmAPI } from "@/app/axios/realmAPI";
import { useRealmStore } from "../useStore/useRealmStore";

export const realmService = {
  async getRealms() {
    try {
      useLoadingStore.getState().setLoading("getRealms", true);

      const response = await getRealmAPI();

      useRealmStore.getState().setRealms(response);
    } catch (error) {
      console.log("realmService.getRealms", error);
    } finally {
      useLoadingStore.getState().setLoading("getRealms", false);
    }
  },
};

import { progressMapAPI } from "@/app/axios/map";
import { useMapStore } from "../useStore/useMapStore";
import { useLoadingStore } from "../useStore/useLoading";

export const mapService = {
  async getMaps() {
    try {
      useLoadingStore.getState().setActionLoadingName("getMaps");
      
      const response = await progressMapAPI();

      useMapStore.getState().setMaps(response);
    } catch (error) {
      console.log(error);
    } finally {
      useLoadingStore.getState().setActionLoadingName("");
    }
  },
};

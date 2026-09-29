import { useLoadingStore } from "../useStore/useLoading";
import {
  getCharacterClassMisionsAPI,
  getClassesAPI,
} from "@/app/axios/classApi";
import { useClassStore } from "../useStore/useClassStore";
import { useMisionStore } from "../useStore/useMissionStore";

export const classService = {
  async getClasses() {
    try {
      useLoadingStore.getState().setLoading("getClasses", true);

      const response = await getClassesAPI();

      useClassStore.getState().setClasses(response);
    } catch (error) {
      console.log("classService.getClasses", error);
    } finally {
      useLoadingStore.getState().setLoading("getClasses", false);
    }
  },

  async getCharacterClassMisions(characterId: string) {
    try {
      useLoadingStore.getState().setLoading("getCharacterClassMisions", true);

      const response = await getCharacterClassMisionsAPI(characterId);

      useMisionStore.getState().setCharacterClassMission(response);
    } catch (error) {
      console.log("classService.getCharacterClassMisions", error);
    } finally {
      useLoadingStore.getState().setLoading("getCharacterClassMisions", false);
    }
  },
};

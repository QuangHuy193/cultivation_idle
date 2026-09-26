import { rewardailyLoginAPI } from "@/app/axios/characterAPI";
import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import { useLoadingStore } from "../useStore/useLoading";

export const CharacterService = {
  async rewarDailyLogin(characterId: string): Promise<void> {
    try {
      useLoadingStore.getState().setActionLoadingName("rewarDailyLogin");

      const response = await rewardailyLoginAPI(characterId);

      useCharacterStore.getState().updateCharacter(response);
    } finally {
      useLoadingStore.getState().setActionLoadingName("");
    }
  },
};

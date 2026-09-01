import { getCharacterAPI } from "@/app/axios/characterAPI";
import { getCharacterInventoryAPI } from "@/app/axios/characterAPI";

import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import { CharacterResponse } from "../types/characterTypes";

export const CharacterService = {
  async loadCharacter(
    userId: string,
  ): Promise<CharacterResponse> {
    const response =
      await getCharacterAPI(userId);

    useCharacterStore
      .getState()
      .setCharacter(response);

    return response;
  },

  async loadInventory(): Promise<void> {
    const character =
      useCharacterStore.getState().character;

    if (!character?._id) {
      return;
    }

    const response =
      await getCharacterInventoryAPI(
        character._id,
      );

    useCharacterStore
      .getState()
      .updateCharacter(response);
  },

  getCharacter(): CharacterResponse | null {
    return useCharacterStore
      .getState()
      .character;
  },
};
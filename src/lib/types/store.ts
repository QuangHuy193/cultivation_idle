import { CharacterResponse } from "./characterTypes";


export interface CharacterState {
  character: CharacterResponse;

  setCharacter: (character: CharacterResponse) => void;

  updateCharacter: (updates: Partial<CharacterResponse>) => void;

  clearCharacter: () => void;
}

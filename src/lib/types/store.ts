import { CharacterResponse } from "./characterTypes";


export interface CharacterState {
  character: CharacterResponse|any;

  setCharacter: (character: CharacterResponse) => void;

  updateCharacter: (updates: Partial<CharacterResponse>) => void;

  clearCharacter: () => void;
}

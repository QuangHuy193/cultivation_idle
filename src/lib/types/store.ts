import { CharacterResponse } from "@/lib/interface";

export interface CharacterState {
  character: CharacterResponse;

  setCharacter: (character: CharacterResponse) => void;

  updateCharacter: (updates: Partial<CharacterResponse>) => void;

  clearCharacter: () => void;
}

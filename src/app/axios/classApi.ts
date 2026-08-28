import { CharacterClassMission } from "@/lib/interface";
import api from "./axios";

export async function getClassesAPI() {
  const res = await api.get(`/api/classes`);
  return res.data.classes;
}

export async function getCharacterClassMisionsAPI(characterId: string) {
  const res = await api.get(`/api/classes/mission/${characterId}`);
  return res.data.missions as [CharacterClassMission];
}

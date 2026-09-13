import {
  CharacterStats,
  CharacterClass,
  CharacterClassMission,
} from "@/lib/types/characterTypes";
import api from "./axios";

export async function getClassesAPI() {
  const res = await api.get(`/api/classes`);
  return res.data.classes;
}

export async function getCharacterClassMisionsAPI(characterId: string) {
  const res = await api.get(`/api/classes/mission/${characterId}`);
  return res.data.missions as [CharacterClassMission];
}

export async function selectClassAPI(
  characterId: string,
  classId: string,
): Promise<{
  finalStats: CharacterStats;
  class: CharacterClass;
}> {
  const res = await api.post(
    `/api/character/${characterId}/class/${classId}/select`,
  );
  return res.data;
}

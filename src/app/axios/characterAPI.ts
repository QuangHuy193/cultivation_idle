import api from "./axios";
import type { CharacterResponse } from "@/lib/interface";

export async function getCharacterAPI(
  userId: string,
): Promise<CharacterResponse> {
  const res = await api.post("/api/character", { userId });
  return res.data.character as CharacterResponse;
}

export async function getCharacterInventoryAPI(
  characterId: string,
): Promise<CharacterResponse> {
  const res = await api.get(`/api/character/${characterId}/inventory`);
  return res.data as CharacterResponse;
}

// gỡ trang bị
export async function unequipAPI(
  characterId: string,
  slot: string,
): Promise<CharacterResponse> {
  const res = await api.post(`/api/character/${characterId}/unequip`, { slot });
  return res.data as CharacterResponse;
}

// trang bị
export async function equipAPI(
  characterId: string,
  slot: string,
  equipId: string,
): Promise<CharacterResponse> {
  const res = await api.post(`/api/character/${characterId}/equip`, {
    slot,
    equipId,
  });
  return res.data as CharacterResponse;
}

// sử dụng vật phẩm
export async function takeItemAPI(
  characterId: string,
  itemId: string,
): Promise<CharacterResponse> {
  const res = await api.post(`/api/character/${characterId}/use-item`, {
    itemId,
  });
  return res.data as CharacterResponse;
}

// đột phá cảnh giới
export async function breakthroughAPI(
  characterId: string,
): Promise<CharacterResponse> {
  const res = await api.post(`/api/character/${characterId}/breakthrough`);
  return res.data as CharacterResponse;
}

// trang bị kỹ năng
export async function equipSkillAPI(
  characterId: string,
  skillId: string,
  slot: number,
): Promise<CharacterResponse> {
  const res = await api.post(`/api/character/${characterId}/skill/equip`, {
    skillId,
    slot,
  });
  return res.data as CharacterResponse;
}

// gỡ trang bị kỹ năng
export async function unequipSkillAPI(
  characterId: string,
  skillId: string,
): Promise<CharacterResponse> {
  const res = await api.post(`/api/character/${characterId}/skill/unequip`, {
    skillId,
  });
  return res.data as CharacterResponse;
}

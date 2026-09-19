import {
  CharacterInventoryItem,
  CharacterResponse,
  CharacterStats,
} from "@/lib/types/characterTypes";
import api from "./axios";
import { Skin } from "@/lib/types/skinTypes";

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

// trang bị skin
export async function equipSkinAPI(
  characterId: string,
  skinId: string,
): Promise<Skin> {
  const res = await api.post(
    `/api/character/${characterId}/skin/${skinId}/equip`,
  );
  return res.data.skinId;
}

// mua skin
export async function buySkinAPI(
  characterId: string,
  skinId: string,
): Promise<{
  inventory: CharacterInventoryItem;
  spiritStone: number;
  finalStats: CharacterStats;
}> {
  const res = await api.post(
    `/api/character/${characterId}/skin/${skinId}/buy`,
  );

  return res.data;
}

// cập nhật thưởng tu vi off
export async function updateCulOffAPI(characterId: string): Promise<{
  cultivationOffline: number;
  timeReawrdOffline: number;
}> {
  const res = await api.post(`/api/character/${characterId}/online`);

  return res.data;
}

// cập nhật time online
export async function updateTimeCharacterOnlineAPI(
  characterId: string,
): Promise<string> {
  const res = await api.post(`/api/character/${characterId}/online/refresh`);

  return res.data.message;
}

// nhận tu vi offline
export async function rewardCultivationOfflineAPI(characterId: string) {
  const res = await api.post(
    `/api/character/${characterId}/online/rewardCultivation`,
  );

  return res.data;
}

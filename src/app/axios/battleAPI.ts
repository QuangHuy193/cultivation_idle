import api from "./axios";
import type { BattleState } from "@/lib/interface";

export async function createBattleAPI(
  characterId: string,
): Promise<BattleState> {
  const res = await api.post(`/api/battle/create/${characterId}`);
  return res.data.battle as BattleState;
}

export async function fightBattleAPI(battleId: string) {
  const res = await api.post(`/api/battle/${battleId}/fight`);
  
  return res.data;
}

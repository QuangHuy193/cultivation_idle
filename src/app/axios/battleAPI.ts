import api from "./axios";
import type { BattleState } from "@/lib/interface";

export async function createBattleAPI(
  characterId: string,
): Promise<BattleState> {
  const res = await api.post(`/api/battle/start/${characterId}`);
  return res.data.battle as BattleState;
}

import { BattleState } from "@/lib/types/battleTypes";
import api from "./axios";

export async function createBattleAPI(
  characterId: string,
  battleType: string,
): Promise<BattleState> {
  const res = await api.post(`/api/battle/create/${characterId}`, {
    battleType,
  });
  return res.data.battle as BattleState;
}

export async function fightBattleAPI(battleId: string, battleType: string) {
  const res = await api.post(`/api/battle/${battleId}/fight`, { battleType });

  return res.data;
}

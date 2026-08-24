import api from "./axios";

export async function redeemCodeAPI(
  userId: string,
  code: string,
  characterId: string,
) {
  const res = await api.post(`/api/code/redeem/${userId}`, {
    code,
    characterId,
  });
  return res.data;
}

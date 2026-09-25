import api from "./axios";

export async function getDailyLoginListAPI() {
  const res = await api.get(`/api/dailyLogin`);
  
  return res.data.dailyLogins[0];
}

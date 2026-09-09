import { MapsResponse } from "@/lib/types/mapTypes";
import api from "./axios";

// lấy tiến trình map
export async function progressMapAPI(): Promise<[MapsResponse]> {
  const res = await api.get(`/api/map`);
  return res.data.maps as [MapsResponse];
}

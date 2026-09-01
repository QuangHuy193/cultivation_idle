 
import { Skin } from "@/lib/types/skinTypes";
import api from "./axios";

export async function getSkinsAPI(): Promise<Skin[]> {
  const res = await api.get("/api/skins");
  return res.data.skins as Skin[];
}

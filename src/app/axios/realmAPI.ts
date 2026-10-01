import { Realm } from "@/lib/types/realmTypes";
import api from "./axios";

export async function getRealmAPI(): Promise<[Realm]> {
  const res = await api.get(`/api/realm`);

  return res.data.realms;
}

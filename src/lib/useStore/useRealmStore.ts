import { create } from "zustand";
import { Realm } from "../types/realmTypes";

interface UserRealmState {
  realms: Realm[] | null;

  setRealms: (realms: Realm[] | []) => void;
}

export const useRealmStore = create<UserRealmState>()((set) => ({
  realms: null,

  setRealms: (realms) => {
    set({ realms });
  },
}));

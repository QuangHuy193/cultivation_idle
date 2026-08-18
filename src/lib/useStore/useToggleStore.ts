import { create } from "zustand";
import { Equip, Item, Skill } from "../interface";

interface UserToggleState {
  itemInfoToggle: {
    open: boolean;
    state: "item" | "equip" | "unequip" | "";
    item: Equip | Item | Skill | null;
    levelSKill?: number;
    shardSKill?: number;
  };
  setItemInfoToggle: (payload: {
    open: boolean;
    state: "item" | "equip" | "unequip" | "";
    item: Equip | Item | Skill | null;
    levelSKill?: number;
    shardSKill?: number;
  }) => void;
}

export const useToggleStore = create<UserToggleState>()((set) => ({
  itemInfoToggle: {
    open: false,
    state: "",
    item: null,
  },
  setItemInfoToggle: (payload) =>
    set({
      itemInfoToggle: {
        ...payload,
      },
    }),
}));

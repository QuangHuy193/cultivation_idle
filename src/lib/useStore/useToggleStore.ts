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
  equipSkillSelect: {
    active: boolean;
    skillId: string;
  };
  setItemInfoToggle: (payload: {
    open: boolean;
    state: "item" | "equip" | "unequip" | "";
    item: Equip | Item | Skill | null;
    levelSKill?: number;
    shardSKill?: number;
  }) => void;
  setEquipSkillSelect: (data: { active: boolean; skillId: string }) => void;
}

export const useToggleStore = create<UserToggleState>()((set) => ({
  // quản lý các alert thông tin skill, equip, item
  itemInfoToggle: {
    open: false,
    state: "",
    item: null,
  },
  // quản lý hiện các slot khi trang bị skill
  equipSkillSelect: {
    active: false,
    skillId: "",
  },
  setItemInfoToggle: (payload) =>
    set({
      itemInfoToggle: {
        ...payload,
      },
    }),
  setEquipSkillSelect: (data) => set({ equipSkillSelect: { ...data } }),
}));

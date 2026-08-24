import { create } from "zustand";
import { Equip, Item, Skill } from "../interface";
import { TabType } from "../constants";

interface UserToggleState {
  // quản lý các alert thông tin skill, equip, item
  itemInfoToggle: {
    open: boolean;
    state: "item" | "equip" | "unequip" | "";
    item: Equip | Item | Skill | null;
    levelSKill?: number;
    shardSKill?: number;
  };
  // quản lý hiện các slot khi trang bị skill
  equipSkillSelect: {
    active: boolean;
    skillId: string;
  };
  // quản lý tab hiển thị
  tabState: {
    activeTab: TabType;
    prevousTab: TabType;
  };
  // quản lý alert pause
  isOpenPause: boolean;
  // quản lý alert user info
  isOpenUserInfo: boolean;

  setItemInfoToggle: (payload: {
    open: boolean;
    state: "item" | "equip" | "unequip" | "";
    item: Equip | Item | Skill | null;
    levelSKill?: number;
    shardSKill?: number;
  }) => void;
  setEquipSkillSelect: (data: { active: boolean; skillId: string }) => void;
  setTabState: (activeTab: TabType, prevousTab: TabType) => void;
  setIsOpenPause: (open: boolean) => void;
  setIsOpenUserInfo: (open: boolean) => void;
}

export const useToggleStore = create<UserToggleState>()((set) => ({
  itemInfoToggle: {
    open: false,
    state: "",
    item: null,
  },

  equipSkillSelect: {
    active: false,
    skillId: "",
  },

  tabState: {
    activeTab: "dongphu",
    prevousTab: "dongphu",
  },

  isOpenPause: false,

  isOpenUserInfo: false,

  setItemInfoToggle: (payload) =>
    set({
      itemInfoToggle: {
        ...payload,
      },
    }),

  setEquipSkillSelect: (data) => set({ equipSkillSelect: { ...data } }),

  setTabState: (activeTab, prevousTab) => {
    set({ tabState: { activeTab, prevousTab } });
  },

  setIsOpenPause: (open) => {
    set({ isOpenPause: open });
  },

  setIsOpenUserInfo: (open) => {
    set({ isOpenUserInfo: open });
  },
}));

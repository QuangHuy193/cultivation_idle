import { create } from "zustand";

import { Equip } from "../types/equipTypes";
import { Item } from "../types/itemTypes";
import { Skill } from "../types/skillTypes";
import { TabType } from "../constants/objConstants";

interface UserToggleState {
  // quản lý auth form
  formOpen: "" | "signin" | "signup";
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
  // quản lý alert user. code, setting,...
  alertUserInfo: "" | "menu" | "code" | "setting" | "changeName";
  // quản lý hộp thoại xác nhận
  comfirmAlert: {
    isOpen: boolean;
    text: string;
    onYes: () => void;
    onNo: () => void;
  };
  // quản lý hộp thư
  isOpenMailbox: boolean;

  setFormOpen: (name: "" | "signin" | "signup") => void;
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
  setAalertUserInfo: (
    alert: "" | "menu" | "code" | "setting" | "changeName",
  ) => void;
  setComfirmAlert: (alert: {
    isOpen?: boolean;
    text?: string;
    onYes?: () => void;
    onNo?: () => void;
  }) => void;
  setIsOpenMailbox: (open: boolean) => void;
}

export const useToggleStore = create<UserToggleState>()((set) => ({
  formOpen: "",

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
    activeTab: "home",
    prevousTab: "home",
  },

  isOpenPause: false,

  alertUserInfo: "",

  comfirmAlert: {
    isOpen: false,
    text: "",
    onYes: () => {},
    onNo: () => {},
  },

  isOpenMailbox: false,

  setFormOpen: (open) => {
    set({ formOpen: open });
  },

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

  setAalertUserInfo: (alert) => {
    set({ alertUserInfo: alert });
  },

  setComfirmAlert: (alert) => {
    set((state) => ({
      comfirmAlert: { ...state.comfirmAlert, ...alert },
    }));
  },

  setIsOpenMailbox: (open) => {
    set({ isOpenMailbox: open });
  },
}));

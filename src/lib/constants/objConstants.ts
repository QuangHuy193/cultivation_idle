export const MAIN_TABS_LABEL = {
  character: "character",
  skill: "skill",
  home: "home",
  class: "class",
  secretRealm: "secretRealm",
  mainStage: "mainStage",
  battle: "battle",
  skin: "skin",
  wildMap: "wildMap",
} as const;

export type TabType = (typeof MAIN_TABS_LABEL)[keyof typeof MAIN_TABS_LABEL];

export interface SecretRealmTabType {
  key: TabType;
  name: string;
  bg: string;
  description: string;
}

export interface CharacterTabType {
  key: TabType;
  label: string;
  icon: React.ReactNode;
  accent: string;
  display: boolean;
}

export const MAIN_TABS = [
  {
    key: "character",
    label: "Nhân vật",
    icon: "🧘",
    accent: "from-rose-500 to-pink-400",
    display: true,
  },
  {
    key: "skill",
    label: "Kỹ năng",
    icon: "📕",
    accent: "from-sky-500 to-cyan-400",
    display: true,
  },
  {
    key: "home",
    label: "Động phủ",
    icon: "🏡",
    accent: "from-amber-500 to-orange-400",
    display: true,
  },
  {
    key: "class",
    label: "Trường phái",
    icon: "☯️",
    accent: "from-violet-500 to-fuchsia-400",
    display: true,
  },
  {
    key: "secretRealm",
    label: "Bí cảnh",
    icon: "🌍",
    accent: "from-emerald-500 to-lime-400",
    display: true,
  },
  {
    key: "battle",
    label: "",
    icon: "",
    accent: "",
    display: false,
  },
  {
    key: "mainStage",
    label: "",
    icon: "",
    accent: "",
    display: false,
  },
] as const;

export const EQUIPMENT_SLOTS = [
  {
    key: "weapon",
    label: "Vũ khí",
  },
  {
    key: "ring",
    label: "Nhẫn",
  },
  {
    key: "boots",
    label: "Giày",
  },
  {
    key: "helmet",
    label: "Mũ",
  },
  {
    key: "armor",
    label: "Giáp",
  },

  {
    key: "necklace",
    label: "Dây chuyền",
  },
] as const;

export const EQUIPMENT_SLOTS_LABEL = [
  "weapon",
  "helmet",
  "armor",
  "ring",
  "necklace",
  "boots",
];

export const SECRET_REALM_TABS: SecretRealmTabType[] = [
  {
    key: "mainStage",
    name: "Ải Chính Tuyến",
    bg: "/bgs/main_stage.webp",
    description: "Vượt ải để tăng cảnh giới và mở khóa nội dung mới",
  },
  {
    key: "wildMap",
    name: "Bản Đồ Dã Ngoại",
    bg: "/bgs/wild_map.webp",
    description: "Nơi săn yêu thú và thu thập nguyên liệu",
  },
];

export const REALM_NAME_LIST = [
  {
    _id: "luyenkhi",
    name: "Luyện Khí",
    order: 1,
  },
  {
    _id: "trucco",
    name: "Trúc Cơ",
    order: 2,
  },
  {
    _id: "nguyenanh",
    name: "Nguyên Anh",
    order: 3,
  },
  {
    _id: "kimdan",
    name: "Kim Đan",
    order: 4,
  },
  {
    _id: "hoathan",
    name: "Hóa Thần",
    order: 5,
  },
];

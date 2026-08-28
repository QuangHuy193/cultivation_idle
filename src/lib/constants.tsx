import BattleTab from "@/app/components/tabs/battle/BattleTab";
import CharacterTab from "@/app/components/tabs/character/CharacterTab";
import ClassTab from "@/app/components/tabs/class/ClassTab";
import HomeTab from "@/app/components/tabs/HomeTab";
import SecretRealmTab from "@/app/components/tabs/secretRealm/SecretRealmTab";
import SkillTab from "@/app/components/tabs/SkillTab";
import SkinTab from "@/app/components/tabs/skin/SkinTab";
import { Shirt } from "lucide-react";
import { DEFAULT_IMG_HOME } from "./constants/imageConstants";
import MainStageTab from "@/app/components/tabs/secretRealm/MainStageTab";
import WildMapTab from "@/app/components/tabs/secretRealm/WildMapTab";

export const TABSLABEL = {
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

export type TabType = (typeof TABSLABEL)[keyof typeof TABSLABEL];

export const MAINTABS = [
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

export const CHARACTERTABS = [
  {
    key: "skin",
    label: "Trang phục",
    icon: <Shirt className="w-6 h-6" />,
    accent: "from-rose-500 to-pink-400",
    display: true,
  },
] as const;

export const renderContent = (activeTab: string) => {
  switch (activeTab) {
    case "home":
      return <HomeTab />;
    case "secretRealm":
      return <SecretRealmTab />;
    case "skill":
      return <SkillTab />;
    case "class":
      return <ClassTab />;
    case "character":
      return <CharacterTab />;
    case "battle":
      return <BattleTab />;
    case "skin":
      return <SkinTab />;
    case "mainStage":
      return <MainStageTab />;
    case "wildMap":
      return <WildMapTab />;
    default:
      return <HomeTab />;
  }
};

export const equipmentSlots = [
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

export const MAX_ITEM_SLOTS = 25;

export const VALID_SLOTS = [
  "weapon",
  "helmet",
  "armor",
  "ring",
  "necklace",
  "boots",
];

export const rarityTextMap = (rarity: string) => {
  switch (rarity) {
    case "common":
      return "Thường";
    case "uncommon":
      return "Hiếm";
    case "rare":
      return "Đặc biệt";
    case "epic":
      return "Cực phẩm";
    case "legendary":
      return "Huyền thoại";
    default:
      return "Thường";
  }
};

export const swapTypeSkill = (type: string) => {
  switch (type) {
    case "sword":
      return "Kiếm";
    case "pill":
      return "Đan dược";
    case "formation":
      return "Trận pháp";
    default:
      return "Không";
  }
};

export const SECRET_REAML = [
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


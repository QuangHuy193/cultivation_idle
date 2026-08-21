import BiCanhTab from "@/app/game/components/BiCanhTab";
import DongPhuTab from "@/app/game/components/DongPhuTab";
import NhanVatTab from "@/app/game/components/NhanVatTab";
import TheGioiTab from "@/app/game/components/TheGioiTab";
import KyNangTab from "@/app/game/components/KyNangTab";

export const defaultCharacter = "/chars/char.webp";
export const defaultBgCharacter = "/bg_chars/bg_kiem_tien.webp";

export const TABS = [
  {
    key: "nhanvat",
    label: "Nhân vật",
    icon: "🧘",
    accent: "from-rose-500 to-pink-400",
    display: true,
  },
  {
    key: "kynang",
    label: "Kỹ năng",
    icon: "📕",
    accent: "from-sky-500 to-cyan-400",
    display: true,
  },
  {
    key: "dongphu",
    label: "Động phủ",
    icon: "🏡",
    accent: "from-amber-500 to-orange-400",
    display: true,
  },
  {
    key: "bicanh",
    label: "Bí cảnh",
    icon: "🌀",
    accent: "from-violet-500 to-fuchsia-400",
    display: true,
  },
  {
    key: "thegioi",
    label: "Thế giới",
    icon: "🌍",
    accent: "from-emerald-500 to-lime-400",
    display: true,
  },
  // {
  //   key: "chiendau",
  //   label: "Thế giới",
  //   icon: "xxx",
  //   accent: "from-emerald-500 to-lime-400",
  // },
] as const;

export const renderContent = (activeTab: string) => {
  switch (activeTab) {
    case "dongphu":
      return <DongPhuTab />;
    case "thegioi":
      return <TheGioiTab />;
    case "bicanh":
      return <BiCanhTab />;
    case "kynang":
      return <KyNangTab />;
    case "nhanvat":
      return <NhanVatTab />;
    // case "chiendau":
    //   return <BattleTab />;
    default:
      return <DongPhuTab />;
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

export const rarityColorText: Record<string, string> = {
  common: "text-gray-500",
  uncommon: "text-green-600",
  rare: "text-blue-600",
  epic: "text-purple-600",
  legendary: "text-orange-500",
};

export const rarityColorBg: Record<string, string> = {
  common: "bg-gray-300",
  uncommon: "bg-green-600",
  rare: "bg-blue-600",
  epic: "bg-purple-600",
  legendary: "bg-orange-500",
};

export const rarityText = [
  {
    key: "common",
    label: "Thường",
  },
  {
    key: "uncommon",
    label: "Hiếm",
  },
  {
    key: "rare",
    label: "Đặc biệt",
  },
  {
    key: "epic",
    label: "Cực phẩm",
  },
  {
    key: "legendary",
    label: "Huyền thoại",
  },
];

export const rarityTextMap = (rarity: string) => {
  return rarityText.find((r) => r.key === rarity)?.label;
};

export const realmStyles = {
  luyenkhi: {
    text: "text-slate-300",
    border: "border-slate-400",
    glow: "",
  },

  trucco: {
    text: "text-emerald-400",
    border: "border-emerald-500",
    glow: "drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]",
  },

  kimdan: {
    text: "text-yellow-400",
    border: "border-yellow-500",
    glow: "drop-shadow-[0_0_12px_rgba(250,204,21,0.9)]",
  },

  nguyenanh: {
    text: "text-purple-400",
    border: "border-purple-500",
    glow: "drop-shadow-[0_0_15px_rgba(168,85,247,1)] animate-pulse",
  },

  hoathan: {
    text: "text-orange-400",
    border: "border-orange-500",
    glow: "drop-shadow-[0_0_20px_rgba(251,146,60,1)] animate-realm-fire",
  },
} as const;

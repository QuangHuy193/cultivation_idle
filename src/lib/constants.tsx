import BiCanhTab from "@/app/components/tabs/BiCanhTab";
import DongPhuTab from "@/app/components/tabs/DongPhuTab";
import NhanVatTab from "@/app/components/tabs/nhan_vat/NhanVatTab";
import TheGioiTab from "@/app/components/tabs/TheGioiTab";
import KyNangTab from "@/app/components/tabs/KyNangTab";
import BattleTab from "@/app/components/tabs/battle/BattleTab";
import { Shirt } from "lucide-react";
import SkinTab from "@/app/components/tabs/skin/SkinTab";

export const TABSLABEL = {
  nhanvat: "nhanvat",
  kynang: "kynang",
  dongphu: "dongphu",
  bicanh: "bicanh",
  thegioi: "thegioi",
  chiendau: "chiendau",
  trangphuc: "trangphuc",
} as const;

export type TabType = (typeof TABSLABEL)[keyof typeof TABSLABEL];

export const MAINTABS = [
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
  {
    key: "chiendau",
    label: "",
    icon: "",
    accent: "",
    display: false,
  },
] as const;

export const CHARACTERTABS = [
  {
    key: "trangphuc",
    label: "Trang phục",
    icon: <Shirt className="w-6 h-6" />,
    accent: "from-rose-500 to-pink-400",
    display: true,
  },
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
    case "chiendau":
      return <BattleTab />;
    case "trangphuc":
      return <SkinTab />;
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

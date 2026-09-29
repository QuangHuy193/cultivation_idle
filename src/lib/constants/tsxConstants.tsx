import BattleTab from "@/app/components/tabs/battle/BattleTab";
import CharacterTab from "@/app/components/tabs/character/CharacterTab";
import ClassTab from "@/app/components/tabs/class/ClassTab";
import HomeTab from "@/app/components/tabs/HomeTab";
import MainStageTab from "@/app/components/tabs/secretRealm/MainStageTab";
import SecretRealmTab from "@/app/components/tabs/secretRealm/SecretRealmTab";
import WildMapTab from "@/app/components/tabs/secretRealm/WildMapTab";
import SkillTab from "@/app/components/tabs/SkillTab";
import SkinTab from "@/app/components/tabs/skin/SkinTab";
import { Orbit, Shirt, Sprout, Star } from "lucide-react";
import { CharacterTabType } from "./objConstants";
import SpiritualRootsTab from "@/app/components/tabs/SpiritualRootsTab";
import RealmTab from "@/app/components/tabs/realm/RealmTab";

export const RENDER_CONTENT = (activeTab: string) => {
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
    case "spiritualRoots":
      return <SpiritualRootsTab />;
    case "realm":
      return <RealmTab />;
    default:
      return <HomeTab />;
  }
};

export const CHARACTER_TABS: CharacterTabType[] = [
  {
    key: "skin",
    label: "Trang phục",
    icon: <Shirt className="h-5 w-5 text-pink-600 fill-pink-200" />,
    accent: "bg-pink-100 border-pink-200",
    text: "text-pink-300",
    display: true,
  },
  {
    key: "spiritualRoots",
    label: "Linh căn",
    icon: <Sprout className="h-5 w-5 text-green-600 fill-green-300" />,
    accent: "bg-green-100 border-green-200",
    text: "text-green-300",
    display: true,
  },
  {
    key: "realm",
    label: "Cảnh giới",
    icon: <Orbit className="h-5 w-5 text-blue-600 fill-blue-300" />,
    accent: "bg-blue-50 border-blue-200",
    text: "text-blue-300",
    display: true,
  },
];

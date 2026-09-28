import BattleTab from "@/app/components/tabs/battle/BattleTab";
import CharacterTab from "@/app/components/tabs/character/CharacterTab";
import ClassTab from "@/app/components/tabs/class/ClassTab";
import HomeTab from "@/app/components/tabs/HomeTab";
import MainStageTab from "@/app/components/tabs/secretRealm/MainStageTab";
import SecretRealmTab from "@/app/components/tabs/secretRealm/SecretRealmTab";
import WildMapTab from "@/app/components/tabs/secretRealm/WildMapTab";
import SkillTab from "@/app/components/tabs/SkillTab";
import SkinTab from "@/app/components/tabs/skin/SkinTab";
import { Shirt, Star } from "lucide-react";
import { CharacterTabType } from "./objConstants";
import TalentTab from "@/app/components/tabs/TalentTab";

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
    case "talent":
      return <TalentTab />;
    default:
      return <HomeTab />;
  }
};

export const CHARACTER_TABS: CharacterTabType[] = [
  {
    key: "skin",
    label: "Trang phục",
    icon: <Shirt className="h-6 w-6 text-pink-600 fill-pink-200" />,
    accent: "bg-pink-50 border-pink-200",
    display: true,
  },
  {
    key: "talent",
    label: "Thiên phú",
    icon: <Star className="h-6 w-6 text-yellow-600 fill-yellow-300" />,
    accent: "bg-yellow-50 border-yellow-200",
    display: true,
  },
];

import BattleTab from "@/app/components/tabs/battle/BattleTab";
import CharacterTab from "@/app/components/tabs/character/CharacterTab";
import ClassTab from "@/app/components/tabs/class/ClassTab";
import HomeTab from "@/app/components/tabs/HomeTab";
import MainStageTab from "@/app/components/tabs/secretRealm/MainStageTab";
import SecretRealmTab from "@/app/components/tabs/secretRealm/SecretRealmTab";
import WildMapTab from "@/app/components/tabs/secretRealm/WildMapTab";
import SkillTab from "@/app/components/tabs/SkillTab";
import SkinTab from "@/app/components/tabs/skin/SkinTab";
import { Shirt } from "lucide-react";

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
    default:
      return <HomeTab />;
  }
};

export const CHARACTER_TABS = [
  {
    key: "skin",
    label: "Trang phục",
    icon: <Shirt className="w-6 h-6" />,
    accent: "from-rose-500 to-pink-400",
    display: true,
  },
];

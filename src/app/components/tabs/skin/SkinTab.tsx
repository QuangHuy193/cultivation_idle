"use client";

import { getSkinsAPI } from "@/app/axios/skinAPI";
import { useEffect } from "react";
import SplitLayout from "../../layout/SplitLayout";
import SkinTabTop from "./SkinTabTop";
import SkinTabBottom from "./SkinTabBottom";
import { useSkinStore } from "@/lib/useStore/useSkinTab";

const SkinTab = () => {
  const { skins } = useSkinStore();

  return (
    <SplitLayout
      top={<SkinTabTop />}
      bottom={<SkinTabBottom skins={skins} />}
      percentTop="flex-3/12"
      percentBottom="flex-9/12"
    />
  );
};

export default SkinTab;

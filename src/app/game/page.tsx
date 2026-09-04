"use client";

import { useToggleStore } from "@/lib/useStore/useToggleStore";
import MainTabsBar from "@/app/components/navbar/mainTabsBar";
import { RENDER_CONTENT } from "@/lib/constants/tsxConstants";
import { useEffect } from "react";
import { init } from "@/lib/services";
import { useSkinStore } from "@/lib/useStore/useSkinTab";
import { useClassStore } from "@/lib/useStore/useClassStore";
import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import { useMisionStore } from "@/lib/useStore/useMissionStore";
import { useMapStore } from "@/lib/useStore/useMapStore";

export default function GamePage() {
  const { tabState } = useToggleStore();
  const { character } = useCharacterStore();
  const { setSkins } = useSkinStore();
  const { setClasses, setLoadingUseClass } = useClassStore();
  const { setCharacterClassMission } = useMisionStore();
  const { setProgressMap, setLoadingUseMap } = useMapStore();

  useEffect(() => {
    // const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    //   event.preventDefault();
    //   event.returnValue = ""; // This is required for some browsers
    // };

    // window.addEventListener("beforeunload", handleBeforeUnload);

    // return () => {
    //   window.removeEventListener("beforeunload", handleBeforeUnload);
    // };
    if (character._id) {
      init(
        character._id,
        setSkins,
        setLoadingUseClass,
        setClasses,
        setCharacterClassMission,
        setLoadingUseMap,
        setProgressMap
      );
    }
  }, [character._id]);

  return (
    <main className="h-screen min-h-screen overflow-hidden text-zinc-800 sm:min-h-screen">
      <MainTabsBar />
      <div
        className="mx-auto flex h-full w-full flex-col backdrop-blur-sm
      shadow-[0_20px_50px_rgba(120,53,15,0.12)]"
      >
        <div className="flex-1">{RENDER_CONTENT(tabState.activeTab)}</div>
      </div>
    </main>
  );
}

"use client";

import { useToggleStore } from "@/lib/useStore/useToggleStore";
import MainTabsBar from "@/app/components/navbar/MainTabsBar";
import { RENDER_CONTENT } from "@/lib/constants/tsxConstants";
import { useEffect } from "react";
import { init } from "@/lib/services";
import { useSkinStore } from "@/lib/useStore/useSkinTab";
import { useClassStore } from "@/lib/useStore/useClassStore";
import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import { useMisionStore } from "@/lib/useStore/useMissionStore";
import { useMapStore } from "@/lib/useStore/useMapStore";
import ComfirmAlert from "../components/alert/ComfirmAlert";
import { updateTimeCharacterOnlineAPI } from "../axios/characterAPI";
import { useMailboxStore } from "@/lib/useStore/useMailBox";
import { useDailyLoginStore } from "@/lib/useStore/useDailyLoginStore";

export default function GamePage() {
  const { tabState } = useToggleStore();
  const { character } = useCharacterStore();
  const { setSkins } = useSkinStore();
  const { setClasses } = useClassStore();
  const { setCharacterClassMission } = useMisionStore();
  const { setMaps } = useMapStore();
  const { comfirmAlert } = useToggleStore();
  const { setMailboxes } = useMailboxStore();
  const { setDailyLogins } = useDailyLoginStore();
  useEffect(() => {
    // const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    //   event.preventDefault();
    //   event.returnValue = ""; // This is required for some browsers
    // };

    // window.addEventListener("beforeunload", handleBeforeUnload);

    // return () => {
    //   window.removeEventListener("beforeunload", handleBeforeUnload);
    // };
    if (character?._id) {
      init(
        character._id,
        setSkins,
        setClasses,
        setCharacterClassMission,
        setMaps,
        setMailboxes,
        setDailyLogins,
      );
    }
  }, [character?._id]);

  useEffect(() => {
    if (!character?._id) return;

    const refreshOnline = async () => {
      try {
        await updateTimeCharacterOnlineAPI(character._id);
        console.log("online");
      } catch (error) {
        console.log(error);
      }
    };

    // cập nhật ngay khi đã có character
    refreshOnline();

    // sau đó mỗi 1 phút
    const timer = setInterval(refreshOnline, 60 * 1000);

    return () => {
      clearInterval(timer);
    };
  }, [character?._id]);

  return (
    <main className="h-screen min-h-screen overflow-hidden text-zinc-800 sm:min-h-screen">
      <MainTabsBar />
      <div
        className="mx-auto flex h-full w-full flex-col backdrop-blur-sm
      shadow-[0_20px_50px_rgba(120,53,15,0.12)]"
      >
        {comfirmAlert.isOpen && (
          <ComfirmAlert
            text={comfirmAlert.text}
            onYes={comfirmAlert.onYes}
            onNo={comfirmAlert.onNo}
          />
        )}
        <div className="flex-1">{RENDER_CONTENT(tabState.activeTab)}</div>
      </div>
    </main>
  );
}

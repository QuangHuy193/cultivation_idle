"use client";


import { useToggleStore } from "@/lib/useStore/useToggleStore";
import MainTabsBar from "@/app/components/navbar/mainTabsBar";
import { RENDER_CONTENT } from "@/lib/constants/tsxConstants";

export default function GamePage() {
  const { tabState } = useToggleStore();

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

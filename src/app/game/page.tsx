"use client";

import { renderContent } from "@/lib/constants";
import { useToggleStore } from "@/lib/useStore/useToggleStore";
import MainTabsBar from "@/app/components/navbar/mainTabsBar";

export default function GamePage() {
  const { tabState } = useToggleStore();

  return (
    <main className="h-screen overflow-hidden text-zinc-800 sm:min-h-screen sm:py-8">
      <MainTabsBar />
      <div
        className="mx-auto flex h-full w-full max-w-5xl flex-col 
      shadow-[0_20px_50px_rgba(120,53,15,0.12)] backdrop-blur sm:h-auto"
      >
        <div className="flex-1">{renderContent(tabState.activeTab)}</div>
      </div>
    </main>
  );
}

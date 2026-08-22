"use client";

import { renderContent, TABS } from "@/lib/constants";
import { useToggleStore } from "@/lib/useStore/useToggleStore";

export default function GamePage() {
  const { tabState, setTabState } = useToggleStore();

  return (
    <main className="h-screen overflow-hidden text-zinc-800 sm:min-h-screen sm:py-8">
      <div
        className="mx-auto flex h-full w-full max-w-5xl flex-col 
      shadow-[0_20px_50px_rgba(120,53,15,0.12)] backdrop-blur sm:h-auto"
      >
        <div
          className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-between gap-2 
        border-t border-amber-200 bg-white/90 p-2 shadow-lg shadow-zinc-300/60 sm:hidden"
        >
          {TABS.map((tab) => {
            const isActive = tabState.activeTab === tab.key;
            return tab.display ? (
              <button
                key={tab.key}
                onClick={() => {
                  setTabState(tab.key, tabState.activeTab);
                }}
                className={`flex h-12 w-12 items-center justify-center rounded-full text-lg transition ${
                  isActive
                    ? `bg-linear-to-r ${tab.accent} text-white shadow-md`
                    : "bg-zinc-100 text-zinc-700"
                }`}
                title={tab.label}
              >
                {tab.icon}
              </button>
            ) : (
              ""
            );
          })}
        </div>

        <div className="flex-1">{renderContent(tabState.activeTab)}</div>
      </div>
    </main>
  );
}

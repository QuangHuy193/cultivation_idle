"use client";

import { renderContent, TABS } from "@/lib/constants";

import { useState } from "react";

export default function GamePage() {
  const [activeTab, setActiveTab] = useState("dongphu");

  return (
    <main className="h-screen overflow-hidden text-zinc-800 sm:min-h-screen sm:py-8">
      <div className="mx-auto flex h-full w-full max-w-5xl flex-col shadow-[0_20px_50px_rgba(120,53,15,0.12)] backdrop-blur sm:h-auto sm:min-h-[80vh] md:p-6">
        <div className="fixed bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-zinc-200 bg-white/90 p-2 shadow-lg shadow-zinc-300/60 sm:hidden">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex h-12 w-12 items-center justify-center rounded-full text-lg transition ${
                  isActive
                    ? `bg-linear-to-r ${tab.accent} text-white shadow-md`
                    : "bg-zinc-100 text-zinc-700"
                }`}
                title={tab.label}
              >
                {tab.icon}
              </button>
            );
          })}
        </div>

        <div className="flex-1">{renderContent(activeTab)}</div>
      </div>
    </main>
  );
}

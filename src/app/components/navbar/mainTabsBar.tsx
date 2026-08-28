import { MAINTABS } from "@/lib/constants";
import { showWarning } from "@/lib/toast";
import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import { useToggleStore } from "@/lib/useStore/useToggleStore";
import { Lock } from "lucide-react";

const MainTabsBar = () => {
  const { tabState, setTabState } = useToggleStore();
  const { character } = useCharacterStore();

  return (
    <div
      className="fixed h-16 bottom-0 left-0 right-0 z-20 flex items-center justify-between gap-2 
        border-t border-amber-200 bg-white/90 p-2 shadow-lg shadow-zinc-300/60 sm:hidden"
    >
      {MAINTABS.map((tab) => {
        const isActive = tabState.activeTab === tab.key;
        const isLock =
          tab.key === "class" && (character.realmId?.order ?? 1) < 2;
        return tab.display ? (
          <div
            key={tab.key}
            className={`relative flex h-full w-full items-center justify-center rounded-xl text-3xl 
                transition ${
                  isActive
                    ? `bg-linear-to-r ${tab.accent} text-white shadow-md`
                    : "bg-zinc-100 text-zinc-700"
                }`}
          >
            {isLock && (
              <div
                onClick={() => {
                  showWarning(
                    "Cần đạt tối thiểu cảnh giới trúc cơ để mở hệ phái tu luyện!",
                  );
                }}
                className={`absolute flex justify-center items-center inset-0 
              rounded-xl`}
              >
                <Lock className="w-8 h-8" />
              </div>
            )}
            <button
              onClick={() => {
                setTabState(tab.key, tabState.activeTab);
              }}
              title={tab.label}
            >
              {!isLock ? tab.icon : ""}
            </button>
          </div>
        ) : (
          ""
        );
      })}
    </div>
  );
};

export default MainTabsBar;

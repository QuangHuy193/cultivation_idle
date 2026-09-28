import { CHARACTER_TABS } from "@/lib/constants/tsxConstants";
import { useToggleStore } from "@/lib/useStore/useToggleStore";

const CharacterTabsBar = () => {
  const { tabState, setTabState } = useToggleStore();
  return (
    <div className="my-2 flex justify-center">
      <div
        className="flex items-center space-x-5 rounded-2xl border border-amber-200 bg-linear-to-b 
        from-amber-50 to-amber-100 px-5 py-1.5 shadow-md"
      >
        {CHARACTER_TABS.map((tab) => {
          if (!tab.display) return null;

          const isActive = tabState.activeTab === tab.key;

          return (
            <button
              key={tab.key}
              title={tab.label}
              onClick={() => setTabState(tab.key, tabState.activeTab)}
              className={`relative flex h-10 w-10 items-center justify-center rounded-xl
              border transition-all duration-200 active:scale-95
              ${tab.accent}
              ${isActive ? "shadow-md ring-2 ring-amber-400" : "shadow-sm"}
            `}
            >
              {tab.icon}

              {/* chấm sáng khi active */}
              {isActive && (
                <span
                  className="absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-amber-500"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterTabsBar;

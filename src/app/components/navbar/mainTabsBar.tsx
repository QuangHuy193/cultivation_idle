import { MAINTABS } from "@/lib/constants";
import { useToggleStore } from "@/lib/useStore/useToggleStore";

const MainTabsBar = () => {
  const { tabState, setTabState } = useToggleStore();

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-between gap-2 
        border-t border-amber-200 bg-white/90 p-2 shadow-lg shadow-zinc-300/60 sm:hidden"
    >
      {MAINTABS.map((tab) => {
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
  );
};

export default MainTabsBar;

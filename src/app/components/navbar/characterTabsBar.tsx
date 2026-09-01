
import { CHARACTER_TABS } from "@/lib/constants/tsxConstants";
import { useToggleStore } from "@/lib/useStore/useToggleStore";

const CharacterTabsBar = () => {
  const { tabState, setTabState } = useToggleStore();
  return (
    <div className="flex justify-center">
      {CHARACTER_TABS.map((tab, ind) => {
        if (tab.display)
          return (
            <div
              onClick={() => {
                setTabState(tab.key, tabState.activeTab);
              }}
              key={ind}
            >
              {tab.icon}
            </div>
          );
      })}
    </div>
  );
};

export default CharacterTabsBar;

import { CHARACTER_TABS } from "@/lib/constants/tsxConstants";
import { useToggleStore } from "@/lib/useStore/useToggleStore";
import DotCustom from "../ui/DotCustom";
import { useCharacterStore } from "@/lib/useStore/useCharacterStore";

const CharacterTabsBar = () => {
  const { tabState, setTabState } = useToggleStore();
  const { character } = useCharacterStore();
  return (
    <div className="my-2 flex justify-center">
      <div
        className="flex items-center space-x-5
        px-5 py-1.5 w-full justify-center"
      >
        {CHARACTER_TABS.map((tab) => {
          if (!tab.display) return null;

          return (
            <div key={tab.key} className="flex flex-col items-center">
              <button
                title={tab.label}
                onClick={() => setTabState(tab.key, tabState.activeTab)}
                className={`relative flex h-10 w-10 items-center justify-center rounded-xl
                  transition-all duration-200 active:scale-95
                ${tab.accent}             
              `}
              >
                {tab.icon}
                {tab.key === "realm" && character?.canBreakthrough && (
                  <DotCustom absolute="absolute" position="-top-1 -right-1" />
                )}
              </button>
              <label className={`text-sm italic ${tab.text}`}>
                {tab.label}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterTabsBar;

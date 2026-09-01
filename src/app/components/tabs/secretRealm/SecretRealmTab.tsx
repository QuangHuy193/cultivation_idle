"use client";
import { SECRET_REALM_TABS } from "@/lib/constants/objConstants";
import { useToggleStore } from "@/lib/useStore/useToggleStore";

const SecretRealmTab = () => {
  const { tabState, setTabState } = useToggleStore();

  return (
    <div
      className="h-full w-full overflow-y-auto p-4"
      style={{
        backgroundImage: `url("/bgs/secret_realm.webp")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col gap-4">
        {SECRET_REALM_TABS.map((map) => (
          <div
            key={map.key}
            onClick={() => {
              setTabState(map.key, tabState.activeTab);
            }}
            className="overflow-hidden rounded-2xl border border-amber-300/50
            bg-black/40 backdrop-blur-sm transition-all duration-300"
          >
            <div
              className="relative h-28 overflow-hidden rounded-2xl border 
              border-amber-300/50 cursor-pointer"
              style={{
                backgroundImage: `url(${map.bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/50" />

              <div className="relative z-10 flex h-full flex-col justify-center p-4">
                <div className="text-xl font-bold text-amber-300">
                  {map.name}
                </div>

                <div className="mt-1 text-sm text-zinc-100">
                  {map.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecretRealmTab;

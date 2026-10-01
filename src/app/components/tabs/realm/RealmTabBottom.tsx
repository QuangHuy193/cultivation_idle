"use client";

import { realmService } from "@/lib/services/realm.service";
import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import { useLoadingStore } from "@/lib/useStore/useLoading";
import { useRealmStore } from "@/lib/useStore/useRealmStore";
import { useEffect } from "react";
import Loading from "../../ui/Loading";
import { REALM_CSS } from "@/lib/constants/cssConstants";
import { displayStatLabel } from "@/lib/helper";
import { ArrowUpIcon } from "lucide-react";
import { showError, showSuccess } from "@/lib/toast";
import { breakthroughAPI } from "@/app/axios/characterAPI";

const RealmTabBottom = () => {
  const { realms } = useRealmStore();
  const { character, updateCharacter } = useCharacterStore();
  const { loading, setLoading } = useLoadingStore();

  useEffect(() => {
    if (realms === null && !loading.getRealms) {
      realmService.getRealms();
    }
  }, [realms, loading.getRealms]);

  // Chưa có character
  if (!character) {
    return (
      <div>
        <Loading message="Đang tải nhân vật..." />
      </div>
    );
  }

  const currentRealm = character.realmId;
  const getNextRealm = () => {
    let nextRealm;
    if (character.realmLevel === currentRealm.maxLevel) {
      nextRealm =
        realms?.find((r) => r.order === currentRealm.order + 1) ?? null;
    } else {
      nextRealm = currentRealm;
    }
    return nextRealm;
  };

  const nextRealm = getNextRealm();

  const nextRealmLevel =
    nextRealm !== currentRealm
      ? nextRealm?.levels[0]
      : nextRealm.levels[character.realmLevel];

  const breakthroughApi = async () => {
    try {
      setLoading("break", true);
      const res = await breakthroughAPI(character?._id ?? "");

      updateCharacter(res);
      showSuccess("Đột phá thành công");
    } catch (error) {
      console.log(error);
      showError("Đột phá thất bại");
    } finally {
      setLoading("break", false);
    }
  };
  return (
    <div className={`h-full min-h-0 absolute inset-0 `}>
      {loading.break && <Loading message="Đang cảm ngộ đại đạo..." />}

      <div className={`h-full min-h-0 overflow-y-auto px-4 py-3 pb-22`}>
        {/* TÊN CẢNH GIỚI */}
        <div
          className={`mb-3 text-center text-lg font-bold
          drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]
          ${REALM_CSS[currentRealm._id]?.text ?? "text-purple-700"}
        `}
        >
          {currentRealm.name} -{" "}
          {currentRealm.levels[character.realmLevel - 1]?.name}
        </div>

        {/* CURRENT / NEXT */}
        <div
          className="rounded-xl border border-amber-200/70 bg-white/60 px-4 py-3 
        shadow-md backdrop-blur-sm"
        >
          <div className="flex items-center justify-between gap-4">
            {/* HIỆN TẠI */}
            <div className="min-w-0 flex-1 text-center">
              <div
                className={`
                mt-1 truncate text-sm font-bold sm:text-base
                ${REALM_CSS[currentRealm._id]?.text ?? "text-purple-700"}
              `}
              >
                {currentRealm.name} -{" "}
                {currentRealm.levels[character.realmLevel - 1]?.name}
              </div>
            </div>

            {/* MŨI TÊN */}
            <div className="shrink-0 text-lg font-bold text-amber-500">➜</div>

            {/* TIẾP THEO */}
            <div className="min-w-0 flex-1 text-center">
              <div
                className={`
                mt-1 truncate text-sm font-bold sm:text-base
                ${REALM_CSS[nextRealm?._id ?? ""]?.text ?? "text-purple-700"}
              `}
              >
                {nextRealm?.name ?? "—"} - {nextRealmLevel?.name ?? "—"}
              </div>
            </div>
          </div>

          {/* THANH TU VI */}
          <div className="mt-4">
            <div className="mb-1 flex justify-between text-xs">
              <span className="font-medium text-slate-500">Tu vi</span>

              <span
                className={`font-semibold 
                  ${
                    character.cultivation >
                    (nextRealmLevel?.cultivationRequired ?? 0)
                      ? "text-green-500"
                      : "text-slate-700"
                  }`}
              >
                {character.cultivation.toLocaleString()}
                {" / "}
                {(nextRealmLevel?.cultivationRequired ?? 0).toLocaleString()}
              </span>
            </div>

            <div
              className={`relative h-3 w-full overflow-hidden rounded-full
              border-2 ${REALM_CSS[currentRealm._id]?.border ?? "border-purple-300"}
              bg-slate-100 shadow-inner`}
            >
              <div
                className={`
                h-full rounded-full
                ${REALM_CSS[currentRealm._id]?.bg ?? "bg-purple-400"}
                transition-all duration-500
              `}
                style={{
                  width:
                    (character?.cultivation /
                      (nextRealmLevel?.cultivationRequired ?? 1)) *
                      100 +
                    "%",
                }}
              />

              {/* ánh sáng */}
              <div
                className="pointer-events-none absolute inset-0 bg-linear-to-b 
              from-white/40 to-transparent"
              />
            </div>
          </div>

          {/* NÚT ĐỘT PHÁ */}
          {character?.canBreakthrough && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={breakthroughApi}
                className="rounded-lg border border-amber-300 bg-linear-to-b from-amber-300 
                to-amber-500 px-5 py-2 text-sm font-bold text-white shadow-md
                transition active:translate-y-0"
              >
                ✦ Đột phá ✦
              </button>
            </div>
          )}
        </div>

        {/* TIÊU ĐỀ BUFF */}
        <div className="my-3 flex items-center gap-2">
          <div
            className="h-px flex-1 bg-linear-to-r from-transparent via-amber-300 
          to-transparent"
          />

          <div className="text-xs font-bold text-amber-600">
            CẢNH GIỚI & TĂNG ÍCH
          </div>

          <div
            className="h-px flex-1 bg-linear-to-r from-transparent via-amber-300 
          to-transparent"
          />
        </div>

        {/* BUFF */}
        <div
          className="overflow-hidden rounded-xl border border-amber-200/70 
        bg-white/60 shadow-md backdrop-blur-sm"
        >
          <div
            className="grid grid-cols-[1fr_60px_25px_60px_55px] items-center border-b 
          border-amber-100 bg-amber-50/70 px-3 py-2 text-[11px] font-semibold 
          text-slate-500"
          >
            <div>Thuộc tính</div>
            <div className="text-right">Hiện tại</div>
            <div />
            <div className="text-right">Tiếp theo</div>
            <div className="text-right"></div>
          </div>

          <div className="divide-y divide-amber-100">
            {Object.entries(
              currentRealm.levels[character.realmLevel - 1]?.buffs ?? {},
            ).map(([key, value]) => {
              const nextValue =
                nextRealmLevel?.buffs[
                  key as keyof typeof nextRealmLevel.buffs
                ] ?? 0;

              const increase = nextValue - value;

              return (
                <div
                  key={key}
                  className="grid grid-cols-[1fr_60px_25px_60px_55px]
                  items-center px-1 py-2.5 text-sm transition-colors"
                >
                  <div className="font-medium text-slate-600">
                    {displayStatLabel(key)}
                  </div>

                  <div className="text-center font-semibold text-slate-700">
                    +{value}
                  </div>

                  <div className="text-center text-slate-300">→</div>

                  <div
                    className={`
                    text-center font-semibold
                    ${increase > 0 ? "text-emerald-600" : "text-slate-500"}
                  `}
                  >
                    +{nextValue}
                  </div>

                  <div className="flex justify-center">
                    {increase > 0 && (
                      <span
                        className="flex items-center gap-0.5 text-xs font-bold 
                      text-emerald-600"
                      >
                        (
                        <ArrowUpIcon
                          className="h-3.5 w-3.5"
                          strokeWidth={1.8}
                        />
                        {increase} )
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealmTabBottom;

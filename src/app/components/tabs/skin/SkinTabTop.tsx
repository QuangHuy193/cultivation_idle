import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import { useSkinStore } from "@/lib/useStore/useSkinTab";
import React, { useEffect } from "react";
import SkinImage from "./SkinImage";
import { RARITY_CSS } from "@/lib/constants/cssConstants";
import { rarityTextMap } from "@/lib/constants";
import CornerBadge from "../../badges/CornerBadge";

const SkinTabTop = () => {
  const { character } = useCharacterStore();
  const { owner, selectedSkin, setSelectedSkin } = useSkinStore();

  const rarityCss = RARITY_CSS[selectedSkin.rarity] ?? RARITY_CSS.common;

  useEffect(() => {
    if (character) {
      setSelectedSkin(character.skinId, true);
    }
  }, [character]);
  return (
    <div className="flex gap-2">
      <div className="flex-1">        
        <SkinImage skin={selectedSkin} isHas={owner} />
      </div>

      <div className="flex-1 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        {/* Độ hiếm */}
        <div className="mb-4 flex items-center justify-between border-b border-zinc-200 pb-3">
          <span className="font-medium text-zinc-500">Độ hiếm</span>

          <span
            className={`
        rounded-full px-3 py-1 text-sm font-bold
        ${rarityCss.text}
      `}
          >
            {rarityTextMap(selectedSkin.rarity).toUpperCase()}
          </span>
        </div>

        {/* Thuộc tính */}
        <div>
          <div className="mb-3 text-lg font-bold text-zinc-700">
            Thuộc tính khi sở hữu
          </div>

          <div className="space-y-2">
            {selectedSkin.buffs.attack > 0 && (
              <div
                className="
            flex items-center justify-between
            rounded-lg bg-red-50 px-3 py-2
          "
              >
                <span className="font-semibold text-red-500">
                  ⚔️ +{selectedSkin.buffs.attack}
                </span>
              </div>
            )}

            {selectedSkin.buffs.hp > 0 && (
              <div
                className="
            flex items-center justify-between
            rounded-lg bg-green-50 px-3 py-2
          "
              >
                <span className="font-semibold text-green-500">
                  ❤️ +{selectedSkin.buffs.hp}
                </span>
              </div>
            )}

            {selectedSkin.buffs.defense > 0 && (
              <div
                className="
            flex items-center justify-between
            rounded-lg bg-blue-50 px-3 py-2
          "
              >
                <span className="font-semibold text-blue-500">
                  🛡️ +{selectedSkin.buffs.defense}
                </span>
              </div>
            )}

            {selectedSkin.buffs.attack === 0 &&
              selectedSkin.buffs.hp === 0 &&
              selectedSkin.buffs.defense === 0 && (
                <div className="italic text-zinc-500">không</div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkinTabTop;

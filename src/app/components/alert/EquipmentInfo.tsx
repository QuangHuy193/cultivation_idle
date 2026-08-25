"use client";

import { equipAPI, unequipAPI } from "@/app/axios/characterAPI";
import {  rarityTextMap } from "@/lib/constants";
import { RARITY_CSS } from "@/lib/constants/cssConstants";
import { Equip } from "@/lib/interface";
import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import Image from "next/image";

interface EquipmentInfoProps {
  equip: Equip;
  isEquipped?: boolean;
  onClose?: () => void;
}

const EquipmentInfo = ({ equip, isEquipped, onClose }: EquipmentInfoProps) => {
  const { character, updateCharacter } = useCharacterStore();

  const unequipApi = async (slot: string) => {
    try {
      const res = await unequipAPI(character._id, slot);
      updateCharacter(res);
      if (onClose) onClose();
    } catch (error) {
      console.log("lỗi", error);
    }
  };

  const equipApi = async (equipId: string) => {
    try {
      const res = await equipAPI(character._id, equip.type, equipId);
      updateCharacter(res);
      if (onClose) onClose();
    } catch (error) {
      console.log("lỗi", error);
    }
  };

  return (
    <div>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-50"
        onClick={onClose}
      />

      <div
        className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[320px] rounded-2xl border-2 border-amber-700 bg-linear-to-b from-stone-100 
        to-amber-50 shadow-[0_0_30px_rgba(251,191,36,0.35)] overflow-hidden"
      >
        {/* Header */}
        <div
          className={`px-4 py-3 text-center text-lg font-bold ${RARITY_CSS[equip.rarity].text}`}
        >
          {equip.name} - {rarityTextMap(equip.rarity)}
        </div>

        {/* Body */}
        <div className="p-4">
          <div className="flex justify-center mb-4">
            <Image
              src={equip.icon}
              alt={equip.name}
              width={80}
              height={80}
              className="w-20 h-20 object-contain"
            />
          </div>

          <div
            className="rounded-xl border border-amber-200bg-white/70 p-3 space-y-2"
          >
            <div className="flex justify-between">
              <span className="text-zinc-600">⚔️ Công kích</span>
              <span className="font-semibold text-red-600">
                +{equip.stats.atk}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-600">❤️ Sinh lực</span>
              <span className="font-semibold text-green-600">
                +{equip.stats.hp}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-600">🛡️ Phòng thủ</span>
              <span className="font-semibold text-blue-600">
                +{equip.stats.def}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-5">
            <button
              className="flex-1 py-2 rounded-xl border border-red-300 bg-red-50 
              hover:bg-red-100 transition font-medium"
            >
              Bán
            </button>

            {isEquipped ? (
              <button
                onClick={() => unequipApi(equip.type)}
                className="flex-1 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 
                text-white transition font-medium"
              >
                Gỡ
              </button>
            ) : (
              <button
                onClick={() => equipApi(equip._id)}
                className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700
                text-white transition font-medium"
              >
                Trang bị
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentInfo;

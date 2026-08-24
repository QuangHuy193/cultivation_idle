"use client";
import { takeItemAPI } from "@/app/axios/characterAPI";
import {  rarityTextMap } from "@/lib/constants";
import { RARITY_CSS } from "@/lib/constants/cssConstants";
import { Item } from "@/lib/interface";
import { showSuccess } from "@/lib/toast";
import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import Image from "next/image";

interface ItemInfoProps {
  item: Item;
  onClose?: () => void;
}

const ItemInfo = ({ item, onClose }: ItemInfoProps) => {
  const { character, updateCharacter } = useCharacterStore();

  const useItemApi = async () => {
    try {
      const res = await takeItemAPI(character._id, item._id);
      updateCharacter(res);
      if (onClose) {
        onClose();
      }
      showSuccess(`Đã dùng ${item.name}`)
    } catch (error) {
      console.log(error);
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
          className={`px-4 py-3 text-center text-lg font-bold ${RARITY_CSS[item.rarity].text}`}
        >
          {item.name} - {rarityTextMap(item.rarity)}
        </div>

        {/* Body */}
        <div className="p-4">
          <div className="flex justify-center mb-4">
            <Image
              src={item.icon}
              alt={item.name}
              width={80}
              height={80}
              className="w-20 h-20 object-contain"
            />
          </div>

          <div
            className="rounded-xl border border-amber-200 bg-white/70 p-3 min-h-25"
          >
            <div className="text-zinc-700 leading-relaxed text-sm">
              {item.description}
            </div>
          </div>

          <div className="flex justify-around mt-5 gap-5">
            <button
              className="border border-red-300 bg-red-50 hover:bg-red-100 transition
              font-medium px-8 py-2 rounded-xl shadow-md flex-1"
            >
              Bán
            </button>

            <button
              onClick={useItemApi}
              className="flex-1 px-8 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700
              text-white font-medium transition shadow-md"
            >
              Sử dụng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemInfo;

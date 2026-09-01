"use client";

import { useState } from "react";
import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import { MAX_ITEM_SLOTS } from "@/lib/constants/numberConstants";
import Image from "next/image";
import { useToggleStore } from "@/lib/useStore/useToggleStore";
import ItemInfo from "../../alert/ItemInfo";

export default function Inventory() {
  const { itemInfoToggle, setItemInfoToggle } = useToggleStore();
  const [activeTab, setActiveTab] = useState<"equipment" | "items">(
    "equipment",
  );
  const { character } = useCharacterStore();

  const equipmentSlots = Array.from(
    { length: MAX_ITEM_SLOTS },
    (_, index) => character.inventory.equips?.[index] ?? null,
  );

  const itemSlots = Array.from(
    { length: MAX_ITEM_SLOTS },
    (_, index) => character.inventory.items?.[index] ?? null,
  );

  return (
    <section
      className="absolute top-0 bottom-16.25 inset-0 rounded-3xl border 
    border-zinc-200 bg-zinc-50 p-5 overflow-y-hidden"
    >
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-4 border-b border-zinc-200">
        <button
          onClick={() => setActiveTab("equipment")}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === "equipment"
              ? "text-blue-600 border-b-2 border-blue-600 -mb-[2px]"
              : "text-zinc-600 hover:text-zinc-900"
          }`}
        >
          Trang bị
        </button>
        <button
          onClick={() => setActiveTab("items")}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === "items"
              ? "text-blue-600 border-b-2 border-blue-600 -mb-[2px]"
              : "text-zinc-600 hover:text-zinc-900"
          }`}
        >
          Vật phẩm
        </button>
      </div>

      {/* Content */}
      <div className="overflow-y-scroll pr-1 h-full pb-10">
        {/* Equipment Tab */}
        {activeTab === "equipment" && (
          <div className="grid grid-cols-5 gap-3">
            {equipmentSlots.map((equip, index) => (
              <div
                key={equip?.equipId._id || index}
                className="aspect-square rounded-lg border border-zinc-300 bg-white shadow-sm overflow-hidden"
              >
                {equip ? (
                  <>
                    <Image
                      src={equip.equipId.icon || "/sword_1.png"}
                      alt={equip.equipId.name}
                      width={64}
                      height={64}
                      className="h-full w-full object-contain p-1"
                      onClick={() => {
                        setItemInfoToggle({
                          open: true,
                          state: "unequip",
                          item: equip.equipId,
                        });
                      }}
                    />
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-zinc-400"></div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Items Tab */}
        {activeTab === "items" && (
          <div className="grid grid-cols-5 gap-3">
            {itemSlots.map((item, index) => (
              <div
                key={item?.itemId._id || index}
                className="z-1 relative aspect-square rounded-lg border border-zinc-300 bg-white shadow-sm overflow-hidden"
              >
                {item ? (
                  <>
                    <Image
                      src={item.itemId.icon || "/sword_1.png"}
                      alt={item.itemId.name}
                      width={64}
                      height={64}
                      className="h-full w-full object-contain p-1"
                      onClick={() => {
                        setItemInfoToggle({
                          open: true,
                          state: "item",
                          item: item.itemId,
                        });
                      }}
                    />

                    {/* số lượng */}
                    <div className="absolute bottom-1 right-1 rounded bg-black/70 px-1 text-[10px] text-white">
                      {item.quantity}
                    </div>
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-zinc-400"></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {itemInfoToggle.open && itemInfoToggle.state === "item" && (
        <ItemInfo
          item={itemInfoToggle.item}
          onClose={() =>
            setItemInfoToggle({ open: false, state: "", item: null })
          }
        />
      )}
    </section>
  );
}

"use client";

import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import TuiDoTab from "./TuiDoTab";
import Image from "next/image";
import { equipmentSlots, rarityColorBg, realmStyles } from "@/lib/constants";
import EquipmentInfo from "./alert/EquipmentInfo";
import { useToggleStore } from "@/lib/useStore/useToggleStore";

export default function NhanVatTab() {
  const { itemInfoToggle, setItemInfoToggle } = useToggleStore();
  const { character } = useCharacterStore();

  const realmStyle =
    realmStyles[character.realmId?._id as keyof typeof realmStyles];

  return (
    <div className="space-y-2">
      {/* Phần trên: Nhân vật và trang bị */}
      <section className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
        <div className="mb-4 text-center">
          <span
            className={`font-bold ${realmStyle?.text} ${realmStyle?.glow}`}
          >
            {character.realmId?.name} - Tầng {character.realmLevel}
          </span>          
        </div>

        <div className="flex items-center justify-center gap-1">
          {/* Trang bị bên trái (3 ô) */}
          <div className="flex flex-col gap-1">
            {equipmentSlots.slice(0, 3).map((slot) => {
              const equip = character.equipments?.[slot.key];

              return (
                <div
                  key={slot.key}
                  className={`w-14 h-14 rounded-lg 
                    transition-colors flex items-center
                    justify-center overflow-hidden ${equip ? rarityColorBg[equip.rarity] : "bg-zinc-100"}`}
                >
                  {equip ? (
                    <Image
                      height={48}
                      width={48}
                      onClick={() => {
                        setItemInfoToggle({
                          open: true,
                          item: equip,
                          state: "equip",
                        });
                      }}
                      src={equip.icon}
                      alt={equip.name}
                      className="w-12 h-12 object-contain"
                    />
                  ) : (
                    <span className="text-xs text-zinc-400">{slot.label}</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Ảnh nhân vật ở giữa */}
          <div className="shrink-0">
            <Image
              height={50}
              width={50}
              src="/chars/char.webp"
              alt="Nhân vật"
              className="w-60 h-70 object-contain rounded-lg"
            />
            <div className="flex justify-between mt-1">
              <div className="text-red-400">
                ⚔️ {character.finalStats?.attack || character.stats.attack}
              </div>
              <div className="text-green-400">
                ❤️ {character.finalStats?.hp || character.stats.hp}
              </div>
              <div className="text-blue-400">
                🛡️ {character.finalStats?.defense || character.stats.defense}
              </div>
            </div>
          </div>

          {/* Trang bị bên phải (3 ô) */}
          <div className="flex flex-col gap-1">
            {equipmentSlots.slice(3, 6).map((slot) => {
              const equip = character.equipments?.[slot.key];

              return (
                <div
                  key={slot.key}
                  className={`w-14 h-14 rounded-lg 
                    transition-colors flex items-center
                    justify-center overflow-hidden 
                    ${equip ? rarityColorBg[equip.rarity] : "bg-zinc-100"}`}
                >
                  {equip ? (
                    <Image
                      height={48}
                      width={48}
                      src={equip.icon}
                      alt={equip.name}
                      className="w-12 h-12 object-contain"
                      onClick={() => {
                        setItemInfoToggle({
                          open: true,
                          item: equip,
                          state: "equip",
                        });
                      }}
                    />
                  ) : (
                    <span className="text-xs items-center text-zinc-400">
                      {slot.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {itemInfoToggle.open &&
        itemInfoToggle.state !== "item" &&
        itemInfoToggle.item && (
          <EquipmentInfo
            equip={itemInfoToggle.item}
            isEquipped={itemInfoToggle.state === "equip"}
            onClose={() =>
              setItemInfoToggle({ open: false, item: null, state: "" })
            }
          />
        )}

      {/* Phần dưới: Túi đồ */}
      <TuiDoTab />
    </div>
  );
}

"use client";
import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import Image from "next/image";
import { equipmentSlots } from "@/lib/constants";
import EquipmentInfo from "../../alert/EquipmentInfo";
import { useToggleStore } from "@/lib/useStore/useToggleStore";
import CharacterTabsBar from "../../navbar/CharacterTabsBar";
import { RARITY_CSS, REALM_CSS } from "@/lib/constants/cssConstants";
import { DEFAULT_IMG_CHARACTER } from "@/lib/constants/imageConstants";

const NhanVat = () => {
  const { itemInfoToggle, setItemInfoToggle } = useToggleStore();
  const { character } = useCharacterStore();
  
  const realmStyle =
    REALM_CSS[character.realmId?._id as keyof typeof REALM_CSS];

  return (
    <section className="flex flex-col w-full h-full">
      <div className="flex h-full flex-col justify-center">
        <div className="mb-4 text-center">
          <span className={`font-bold ${realmStyle?.text} ${realmStyle?.glow}`}>
            {character.realmId?.name} - Tầng {character.realmLevel}
          </span>
        </div>

        <div className="flex items-center justify-between">
          {/* Trang bị bên trái (3 ô) */}
          <div className="flex flex-col gap-5">
            {equipmentSlots.slice(0, 3).map((slot) => {
              const equip = character.equipments?.[slot.key];

              return (
                <div
                  key={slot.key}
                  className={`w-16 h-16 rounded-lg 
                      transition-colors flex items-center
                      justify-center overflow-hidden ${equip ? RARITY_CSS[equip.rarity].bg : "bg-zinc-100"}`}
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
                      className="w-14 h-14 object-contain"
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
              src={character.skinId.icon || DEFAULT_IMG_CHARACTER}
              alt="Nhân vật"
              className="h-full w-full object-contain rounded-lg"
            />
            <div className="flex mt-2 justify-between gap-4">
              <div className="text-red-400">
                ⚔️ {character.finalStats?.atk || character.stats.base.atk}
              </div>
              <div className="text-green-400">
                ❤️ {character.finalStats?.hp || character.stats.base.hp}
              </div>
              <div className="text-blue-400">
                🛡️ {character.finalStats?.def || character.stats.base.def}
              </div>
            </div>
          </div>

          {/* Trang bị bên phải (3 ô) */}
          <div className="flex flex-col gap-5">
            {equipmentSlots.slice(3, 6).map((slot) => {
              const equip = character.equipments?.[slot.key];

              return (
                <div
                  key={slot.key}
                  className={`w-16 h-16 rounded-lg 
                      transition-colors flex items-center
                      justify-center overflow-hidden 
                      ${equip ? RARITY_CSS[equip.rarity].bg : "bg-zinc-100"}`}
                >
                  {equip ? (
                    <Image
                      height={48}
                      width={48}
                      src={equip.icon}
                      alt={equip.name}
                      className="w-14 h-14 object-contain"
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
      </div>

      <div>
        <CharacterTabsBar />
      </div>

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
    </section>
  );
};

export default NhanVat;

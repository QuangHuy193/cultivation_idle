import { RARITY_CSS } from "@/lib/constants/cssConstants";
import { SPIRITSTONE_ICON } from "@/lib/constants/imageConstants";
import { Skin } from "@/lib/types/skinTypes";
import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import { useSkinStore } from "@/lib/useStore/useSkinTab";
import Image from "next/image";

interface SkinImageProps {
  skin: Skin;
  isHas: boolean;
}

const SkinImage = ({ skin, isHas }: SkinImageProps) => {
  const { setSelectedSkin } = useSkinStore();
  const { character } = useCharacterStore();

  const isEQ = character.skinId._id === skin._id ? true : false;

  const rarityCSS = RARITY_CSS[skin.rarity] ?? RARITY_CSS.common;
  return (
    <div
      className={`flex w-full flex-col items-center rounded-2xl border-2 p-3 bg-white 
        shadow-md ${rarityCSS.border}`}
    >
      <div
        className={`flex items-center justify-center rounded-xl border-2 bg-zinc-50
         ${rarityCSS.border}`}
      >
        <Image
          onClick={() => {
            setSelectedSkin(skin, isHas);
          }}
          height={80}
          width={80}
          src={skin.icon}
          alt={skin.name}
          className="h-full w-full object-contain"
        />
      </div>

      <div className={`mt-2 text-center text-sm font-bold ${rarityCSS.text}`}>
        {skin.name}
      </div>

      <button
        className={`mt-3 w-full rounded-xl px-3 py-2 text-sm font-semibold text-white
          transition-all
          ${!isHas ? "bg-yellow-400" : isEQ ? "bg-zinc-500" : "bg-blue-300"}
        `}
      >
        {!isHas ? (
          <div className="flex justify-center gap-2 items-center">
            {skin.price.number}
            <Image
              height={80}
              width={80}
              alt="linhthach"
              src={SPIRITSTONE_ICON}
              className="w-5 h-5"
            />
          </div>
        ) : isEQ ? (
          "Đã trang bị"
        ) : (
          "Trang bị"
        )}
      </button>
    </div>
  );
};

export default SkinImage;

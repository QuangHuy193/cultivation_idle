import { Skin } from "@/lib/types/skinTypes";
import SkinImage from "./SkinImage";
import { useCharacterStore } from "@/lib/useStore/useCharacterStore";
import { SkinItemInInventory } from "@/lib/types/characterTypes";

interface SkinTabBottomProps {
  skins: Skin[];
}

const SkinTabBottom = ({ skins }: SkinTabBottomProps) => {
  const { character } = useCharacterStore();

  return (
    <div
      className="absolute inset-x-0 top-0 bottom-18.25 grid grid-cols-3 gap-2 
    overflow-y-scroll "
    >
      {skins &&
        skins.length > 0 &&
        skins.map((skin: Skin) => {          
          const isHas = character?.inventory?.skins.find(
            (s: SkinItemInInventory) => {
              return skin._id === s.skinId._id;
            },
          );

          return (
            <div key={skin._id}>
              <SkinImage skin={skin} isHas={isHas ? true : false} />
            </div>
          );
        })}
    </div>
  );
};

export default SkinTabBottom;

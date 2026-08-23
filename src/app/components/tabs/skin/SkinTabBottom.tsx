import { Skin } from "@/lib/interface";
import SkinImage from "./SkinImage";
import { useCharacterStore } from "@/lib/useStore/useCharacterStore";

interface SkinTabBottomProps {
  skins: Skin[];
}

const SkinTabBottom = ({ skins }: SkinTabBottomProps) => {
  const { character } = useCharacterStore();

  return (
    <div className="grid grid-cols-3 gap-2">
      {skins &&
        skins.length > 0 &&
        skins.map((skin: Skin) => {
          const isHas = character?.inventory?.skins?.find((s) => {
            return skin._id === s.skinId._id;
          });
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

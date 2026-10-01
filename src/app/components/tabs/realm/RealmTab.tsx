import SplitLayout from "../../layout/SplitLayout";
import Image from "next/image";
import { DEFAULT_BG_REALM_TAB } from "@/lib/constants/imageConstants";
import RealmTabBottom from "./RealmTabBottom";

const RealmTab = () => {
  return (
    <SplitLayout
      top={
        <Image
          width={88}
          height={88}
          src={DEFAULT_BG_REALM_TAB}
          alt="Ảnh nền"
          className="w-full h-120 object-cover"
        />
      }
      bottom={<RealmTabBottom />}
    />
  );
};

export default RealmTab;

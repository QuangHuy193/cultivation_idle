import { useSettingStore } from "@/lib/useStore/useSetting";
import {
  CalendarDays,
  CalendarHeart,
  ChevronDown,
  ChevronUp,
  Mail,
} from "lucide-react";

const wrapperIconCss = `relative
  rounded-full
  h-12 w-12
  flex justify-center items-center
  cursor-pointer
  border-2 border-amber-700/50
  bg-gradient-to-b from-yellow-100 to-amber-300
  shadow-[0_2px_8px_rgba(0,0,0,0.25)]
  hover:scale-105
  active:scale-95
  transition-all
`;

const iconCss = `
  h-6 w-6
  text-amber-900
  drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]
`;

const FeatureListInHome = () => {
  const { featureListInHomeStatus, setFeatureListInHomeStatus } =
    useSettingStore();

  const handleToggle = () => {
    if (featureListInHomeStatus === "open") {
      setFeatureListInHomeStatus("close");
    } else if (featureListInHomeStatus === "close") {
      setFeatureListInHomeStatus("open");
    }
  };
  return (
    <div
      className="flex flex-col gap-3 rounded-full bg-linear-to-b from-amber-100 
    to-amber-300 p-2 border border-amber-500 shadow-lg"
    >
      <div className={`${wrapperIconCss}`}>
        <Mail className={`${iconCss} text-red-700`} />
      </div>

      {featureListInHomeStatus === "open" && (
        <div className="flex flex-col gap-3">
          <div className={`${wrapperIconCss}`}>
            <CalendarDays className={`${iconCss} text-cyan-700`} />
          </div>

          <div className={`${wrapperIconCss}`}>
            <CalendarHeart className={`${iconCss} text-purple-700`} />
          </div>
        </div>
      )}

      <div
        className={`${wrapperIconCss} ${featureListInHomeStatus === "open" ? "mt-10" : ""}`}
        onClick={() => {
          handleToggle();
        }}
      >
        {featureListInHomeStatus === "open" && <ChevronUp />}
        {featureListInHomeStatus === "close" && <ChevronDown />}
      </div>
    </div>
  );
};

export default FeatureListInHome;

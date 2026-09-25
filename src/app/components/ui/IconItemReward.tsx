import { Check, CircleCheck } from "lucide-react";

const SIZE = {
  M: "w-16 h-16",
  L: "w-20 h-20",
};

interface IconItemRewardProps {
  url: string;
  number?: number;
  claimed: boolean;
  size?: "M" | "L";
  textColor?: string;
  bgColor?: string;
}

const IconItemReward = ({
  url,
  number = 1,
  size = "L",
  bgColor = "bg-white",
  claimed,
}: IconItemRewardProps) => {
  return (
    <div
      className={`flex items-end justify-end rounded-xl border-2 relative
                border-yellow-500 font-bold ${SIZE[size]} ${bgColor}`}
      style={{
        backgroundImage: `url("${url}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={`text-white text-[14px] bg-black/70 px-1 rounded-full`}>
        {number}
      </div>
      {claimed && (
        <div
          className={`absolute inset-0 z-40 border border-green-400 rounded-xl 
            flex justify-center items-center`}
        >
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500
            text-white shadow-lg"
          >
            <Check size={30} strokeWidth={3} />
          </div>
        </div>
      )}
    </div>
  );
};

export default IconItemReward;

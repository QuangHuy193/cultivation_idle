import { CLASS_COATING_XS } from "@/lib/constants/cssConstants";

interface ComfirmAlertProps {
  text: string;
  onYes: () => void;
  onNo: () => void;
}

const btnCss =
  "w-24 py-2 rounded-lg font-semibold transition-all duration-200 active:scale-95";

const ComfirmAlert = ({ text, onYes, onNo }: ComfirmAlertProps) => {
  return (
    <div className={CLASS_COATING_XS}>
      <div
        className="z-999
          w-80 overflow-hidden rounded-2xl
          border-2 border-yellow-600
          bg-linear-to-b from-amber-200 to-amber-400
          shadow-[0_0_25px_rgba(234,179,8,0.35)]
        "
      >
        {/* title */}
        <div
          className="
            border-b border-yellow-700/40
            bg-linear-to-r from-yellow-700 to-amber-600
            py-3 text-center text-lg font-bold tracking-wider
            text-yellow-100
          "
        >
          THÔNG BÁO
        </div>

        {/* text */}
        <div
          className="m-3 rounded-xl border border-yellow-700/20 bg-amber-50/80
          p-4 text-center text-zinc-800 min-h-24 flex items-center justify-center"
        >
          {text}
        </div>

        {/* action */}
        <div className="flex justify-center gap-4 p-4">
          <button
            className={`${btnCss}
              border border-green-700
              bg-green-500 text-white
              hover:bg-green-600
              hover:shadow-[0_0_12px_rgba(34,197,94,0.5)]
            `}
            onClick={onYes}
          >
            Có
          </button>

          <button
            className={`${btnCss}
              border border-red-700
              bg-red-500 text-white
              hover:bg-red-600
              hover:shadow-[0_0_12px_rgba(239,68,68,0.5)]
            `}
            onClick={onNo}
          >
            Không
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComfirmAlert;

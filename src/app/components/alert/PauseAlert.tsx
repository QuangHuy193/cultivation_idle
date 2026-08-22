import { LogOut, RefreshCw, Play } from "lucide-react";

interface PauseAlertProp {
  onContinue: () => void;
  onExit: () => void;
  onRestart: () => void;
}

const PauseAlert = ({ onContinue, onExit, onRestart }: PauseAlertProp) => {
  return (
    <div
      className="
      fixed inset-0 z-50
      bg-black/40 backdrop-blur-sm
      flex items-center justify-center"
    >
      <div
        className="
        flex gap-6
        rounded-2xl
        border border-yellow-500/30
        bg-zinc-700
        px-8 py-10
        shadow-[0_0_30px_rgba(255,215,0,0.15)]
      "
      >
        {/* Thoát */}
        <button
          onClick={onExit}
          className="
          group
          flex flex-col items-center gap-2
          transition-all duration-300
          hover:scale-110
        "
        >
          <div
            className="
            p-4 rounded-full
            bg-red-500/20
            text-red-400
            border border-red-500/30
            group-hover:bg-red-500/30
          "
          >
            <LogOut size={32} />
          </div>
          <span className="text-sm text-gray-300">Thoát</span>
        </button>
        {/* Chơi lại */}
        <button
          onClick={onRestart}
          className="
          group
          flex flex-col items-center gap-2
          transition-all duration-300
          hover:scale-110
        "
        >
          <div
            className="
            p-4 rounded-full
            bg-blue-500/20
            text-blue-400
            border border-blue-500/30
            group-hover:bg-blue-500/30
          "
          >
            <RefreshCw size={32} />
          </div>
          <span className="text-sm text-gray-300">Làm mới</span>
        </button>

        {/* Tiếp tục */}
        <button
          onClick={onContinue}
          className="
          group
          flex flex-col items-center gap-2
          transition-all duration-300
          hover:scale-110
        "
        >
          <div
            className="
            p-4 rounded-full
            bg-green-500/20
            text-green-400
            border border-green-500/30
            group-hover:bg-green-500/30
          "
          >
            <Play size={32} />
          </div>
          <span className="text-sm text-gray-300">Tiếp tục</span>
        </button>
      </div>
    </div>
  );
};

export default PauseAlert;

interface LoadingProps {
  message?: string;
}

const Loading = ({ message = "Đang tải..." }: LoadingProps) => {
  return (
    <div
      className="fixed inset-0 z-999 flex items-center 
    justify-center bg-black/20 backdrop-blur-sm"
    >
      <div
        className="flex items-center gap-3 w-full justify-center
      border border-white/20 bg-white/90 px-5 py-4 shadow-xl"
      >
        <div className="relative h-7 w-7">
          <div className="absolute inset-0 animate-spin rounded-full border-4 
          border-emerald-200 border-t-emerald-500" />
        </div>
        <span className="text-sm font-medium text-slate-700">{message}</span>
      </div>
    </div>
  );
};

export default Loading;

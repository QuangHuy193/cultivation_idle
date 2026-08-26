interface LoadingProps {
  message?: string;
}

const Loading = ({ message = "Đang tải..." }: LoadingProps) => {
  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center
      bg-black/40 backdrop-blur-sm"
    >
      <div
        className="flex items-center gap-4 rounded-2xl border-2
        border-amber-300 bg-stone-900/90 px-6 py-4
        shadow-[0_0_20px_rgba(251,191,36,0.35)]"
      >
        <div className="relative h-8 w-8">
          <div
            className="absolute inset-0 animate-spin rounded-full border-4
            border-amber-200/30 border-t-amber-400"
          />
        </div>

        <span
          className="font-semibold tracking-wide
          text-amber-100"
        >
          {message}
        </span>
      </div>
    </div>
  );
};

export default Loading;

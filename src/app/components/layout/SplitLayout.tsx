import React from "react";

interface SplitLayoutProps {
  top: React.ReactNode;
  bottom: React.ReactNode;
}

// trên cố định dưới phần còn lại
const SplitLayout = ({ top, bottom }: SplitLayoutProps) => {
  return (
    <div className="gap-1 flex flex-col w-full h-full">
      <div className={`bg-zinc-50`}>{top}</div>

      <div className={`relative bg-zinc-50 flex-1 overflow-hidden min-h-0`}>{bottom}</div>
    </div>
  );
};

export default SplitLayout;

import React from "react";

interface SplitLayoutProps {
  top: React.ReactNode;
  percentTop?: string;
  bottom: React.ReactNode;
  percentBottom?: string;
}

const SplitLayout = ({
  top,
  bottom,
  percentTop = `flex-6/12`,
  percentBottom = `flex-6/12`,
}: SplitLayoutProps) => {
  return (
    <div className="gap-1 flex flex-col w-full h-full">
      <div className={`bg-zinc-50 ${percentTop}`}>{top}</div>

      <div className={`relative bg-zinc-50 ${percentBottom} overflow-hidden`}>{bottom}</div>
    </div>
  );
};

export default SplitLayout;

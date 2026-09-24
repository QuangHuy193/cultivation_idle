const SIZE = {
  size1: "w-1 h-1",
  size2: "w-2 h-2",
  size3: "w-3 h-3",
  size4: "w-4 h-4",
  size5: "w-5 h-5",
};

interface DotProps {
  absolute?: "" | "absolute";
  position?: string;
  size?: "size1" | "size2" | "size3" | "size4" | "size5";
  bgColor?: string;
}

const DotCustom = ({
  absolute = "",
  position = "",
  size = "size3",
  bgColor = "bg-red-500",
}: DotProps) => {
  return (
    <div
      className={`${SIZE[size]} rounded-full ${bgColor} animate-pulse ${absolute} ${position}`}
    />
  );
};

export default DotCustom;

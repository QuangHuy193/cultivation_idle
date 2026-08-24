interface CornerBadgeProps {  
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size?: "s" | "m" | "l";
  text:string
}

const CornerBadge = ({
  position = "top-left",
  size = "s",
  text=""
}: CornerBadgeProps) => {

  const positionClass = {
    "top-left": "top-1 left-1",
    "top-right": "top-1 right-1",
    "bottom-left": "bottom-1 left-1",
    "bottom-right": "bottom-1 right-1",
  };

  const sizeClass = {
    s: "px-1 py-0 text-[10px]",
    m: "px-1.5 py-0.5 text-xs",
    l: "px-2 py-1 text-sm",
  };

  return (
    <div
      className={`absolute
        ${positionClass[position]} ${sizeClass[size]}
        rounded bg-green-600 font-bold text-white shadow z-10`}
    >
      {text}
    </div>
  );
};

export default CornerBadge;

import Image from "next/image";
import React from "react";

const SIZE = {
  size1: "w-16 h-16",
  size2: "w-18 h-18",
  size3: "w-20 h-20",
  size4: "w-22 h-22",
  size5: "w-24 h-24",
};

type sizeType = keyof typeof SIZE;

interface AvatarProps {
  border_color: string;
  icon: string;
  name: string;
  size?: sizeType;
}

const Avatar = ({ border_color, icon, name, size = "size3" }: AvatarProps) => {
  return (
    <div
      className={`${SIZE[size]} overflow-hidden rounded-full border-4 shadow-lg
        ${border_color}`}
    >
      <Image
        height={88}
        width={88}
        src={icon}
        alt={name}
        className="h-full w-full"
      />
    </div>
  );
};

export default Avatar;

import Image from "next/image";
import React from "react";

interface ImageIconProps {
  src: string;
  alt?: string;
  className?: string;
}

const ImageIcon = ({
  src,
  alt = "icon",
  className = "h-8 w-8 drop-shadow-sm",
}: ImageIconProps) => {
  return (
    <Image src={src} alt={alt} height={80} width={80} className={className} />
  );
};

export default ImageIcon;

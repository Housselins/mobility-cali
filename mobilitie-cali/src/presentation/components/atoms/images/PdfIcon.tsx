import Image, { ImageProps } from "next/image";
import { FC, HTMLAttributes } from "react";
type PdfIconProps = {
  className?: HTMLAttributes<ImageProps>["className"];
  width?: number;
  height?: number;
};

export const PdfIcon: FC<PdfIconProps> = ({ className, width, height }) => {
  return (
    <Image
      className={className}
      src="/pdf-file.svg"
      alt="pdf"
      width={width ?? 100}
      height={height ?? 100}
    />
  );
};

import React from "react";

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  loading?: "lazy" | "eager";
  quality?: number;
  className?: string;
  style?: React.CSSProperties;
  sizes?: string;
  fill?: boolean;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  unoptimized?: boolean;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  style,
  fill,
  ...props
}) => {
  const imgStyle = {
    ...style,
    ...(fill
      ? {
          position: "absolute",
          height: "100%",
          width: "100%",
          inset: "0px",
          objectFit: "cover",
        }
      : {}),
  };

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={imgStyle}
      {...props}
    />
  );
};

export default Image;

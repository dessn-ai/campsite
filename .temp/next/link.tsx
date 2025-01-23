import React from "react";

interface LinkProps {
  href: string;
  as?: string;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  prefetch?: boolean;
  locale?: string | false;
  legacyBehavior?: boolean;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const Link: React.FC<LinkProps> = ({
  href,
  children,
  className,
  style,
  onClick,
  ...props
}) => {
  return (
    <a
      href={href}
      className={className}
      style={style}
      onClick={onClick}
      {...props}
    >
      {children}
    </a>
  );
};

export default Link;

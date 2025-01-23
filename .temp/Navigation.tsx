import React from "react";

interface NavigationProps {
  navigate: (to: string) => void;
  links: Array<{
    path: string;
    label: string;
  }>;
}

export const Navigation: React.FC<NavigationProps> = ({ navigate, links }) => (
  <div className="nav" style={{ display: "flex", flexDirection: "column" }}>
    {links.map(({ path, label }) => (
      <a
        key={path}
        href="#"
        onClick={(e) => {
          e.preventDefault();
          navigate(path);
        }}
      >
        {label}
      </a>
    ))}
  </div>
);

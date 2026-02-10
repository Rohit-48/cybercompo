"use client";

import { ReactNode } from "react";

interface CyberCardProps {
  children: ReactNode;
  variant?: "default" | "elevated" | "bordered";
  clipCorner?: "tr" | "br" | "both" | "none";
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function CyberCard({
  children,
  variant = "default",
  clipCorner = "tr",
  hover = true,
  className = "",
  onClick,
}: CyberCardProps) {
  const clipStyles = {
    tr: "clip-tr",
    br: "clip-br",
    both: "clip-both",
    none: "",
  };

  const variantStyles = {
    default: "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
    elevated: "bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)]",
    bordered: "bg-white border border-border",
  };

  const hoverStyles = hover
    ? "hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,214,10,0.3)] cursor-pointer"
    : "";

  return (
    <div
      onClick={onClick}
      className={`transition-all duration-200 ${clipStyles[clipCorner]} ${variantStyles[variant]} ${hoverStyles} ${className}`}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}

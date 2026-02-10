"use client";

import { ReactNode } from "react";

interface CyberBadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "cyan";
  size?: "sm" | "md";
  className?: string;
}

export default function CyberBadge({
  children,
  variant = "default",
  size = "sm",
  className = "",
}: CyberBadgeProps) {
  const variants = {
    default: "bg-gray-100 text-text-primary border border-border",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border border-amber-200",
    error: "bg-red-50 text-red-700 border border-red-200",
    cyan: "bg-cyan-hover text-cyan-glow border border-cyan-border",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span
      className={`inline-flex items-center font-medium clip-btn ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
}

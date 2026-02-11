"use client";

import Image from "next/image";

interface CyberAvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function CyberAvatar({
  src,
  alt = "Avatar",
  initials,
  size = "md",
  className = "",
}: CyberAvatarProps) {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
  };
  const imageSizes = {
    sm: "32px",
    md: "40px",
    lg: "56px",
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center bg-gray-200 text-text-muted font-semibold overflow-hidden clip-btn ${sizes[size]} ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={imageSizes[size]}
          className="object-cover"
        />
      ) : (
        <span>{initials || "?"}</span>
      )}
    </div>
  );
}

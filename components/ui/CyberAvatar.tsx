"use client";

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

  return (
    <div
      className={`relative inline-flex items-center justify-center bg-gray-200 text-text-muted font-semibold overflow-hidden clip-btn ${sizes[size]} ${className}`}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span>{initials || "?"}</span>
      )}
    </div>
  );
}

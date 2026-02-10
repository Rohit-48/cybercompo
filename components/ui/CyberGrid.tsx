"use client";

interface CyberGridProps {
  color?: string;
  animated?: boolean;
  className?: string;
}

export default function CyberGrid({
  color = "#ffd60a",
  animated = true,
  className = "",
}: CyberGridProps) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(${color}15 1px, transparent 1px),
            linear-gradient(90deg, ${color}15 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          animation: animated ? "gridScroll 20s linear infinite" : "none",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2"
        style={{
          background: `linear-gradient(to top, ${color}08, transparent)`,
        }}
      />
      <style jsx>{`
        @keyframes gridScroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(40px);
          }
        }
      `}</style>
    </div>
  );
}

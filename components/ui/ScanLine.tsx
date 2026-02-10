"use client";

interface ScanLineProps {
  speed?: "slow" | "normal" | "fast";
  opacity?: number;
}

export default function ScanLine({
  speed = "normal",
  opacity = 0.1,
}: ScanLineProps) {
  const speeds = {
    slow: "8s",
    normal: "4s",
    fast: "2s",
  };

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden z-10"
      aria-hidden="true"
    >
      <div
        className="absolute left-0 right-0 h-[2px] bg-cyan-glow"
        style={{
          opacity,
          animation: `scanline ${speeds[speed]} linear infinite`,
        }}
      />
      <style jsx>{`
        @keyframes scanline {
          0% {
            top: -2px;
          }
          100% {
            top: 100%;
          }
        }
      `}</style>
    </div>
  );
}

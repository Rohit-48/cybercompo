"use client";

interface GlitchTextProps {
  text: string;
  intensity?: "low" | "medium" | "high";
  className?: string;
}

export default function GlitchText({
  text,
  intensity = "medium",
  className = "",
}: GlitchTextProps) {
  const intensityValues = {
    low: { offset: "1px", duration: "3s" },
    medium: { offset: "2px", duration: "2s" },
    high: { offset: "4px", duration: "1s" },
  };

  const { offset, duration } = intensityValues[intensity];

  return (
    <span
      className={`relative inline-block font-mono font-bold ${className}`}
      style={{
        animationDuration: duration,
      }}
    >
      <span className="relative z-10">{text}</span>
      <span
        className="absolute top-0 left-0 text-cyan-glow opacity-70 animate-pulse"
        style={{
          clipPath: "inset(0 0 50% 0)",
          transform: `translate(${offset}, -${offset})`,
        }}
        aria-hidden="true"
      >
        {text}
      </span>
      <span
        className="absolute top-0 left-0 text-red-400 opacity-50 animate-pulse"
        style={{
          clipPath: "inset(50% 0 0 0)",
          transform: `translate(-${offset}, ${offset})`,
          animationDelay: "0.1s",
        }}
        aria-hidden="true"
      >
        {text}
      </span>
    </span>
  );
}

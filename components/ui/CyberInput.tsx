"use client";

import { forwardRef, InputHTMLAttributes } from "react";

interface CyberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const CyberInput = forwardRef<HTMLInputElement, CyberInputProps>(
  ({ label, error, helperText, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-text-primary">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full bg-white border px-4 py-2.5 text-sm clip-btn transition-all placeholder:text-text-muted/50 focus:outline-none ${
            error
              ? "border-red-400 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]"
              : "border-border focus:border-cyan-border focus:shadow-[0_0_0_3px_rgba(255,214,10,0.1)]"
          } ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
        {helperText && !error && (
          <p className="text-xs text-text-muted">{helperText}</p>
        )}
      </div>
    );
  },
);

CyberInput.displayName = "CyberInput";
export default CyberInput;

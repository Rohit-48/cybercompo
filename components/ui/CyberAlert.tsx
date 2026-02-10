"use client";

import { ReactNode } from "react";
import { Info, AlertTriangle, CheckCircle, XCircle, X } from "lucide-react";

interface CyberAlertProps {
  children: ReactNode;
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const icons = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};

const variantStyles = {
  info: "bg-blue-50 border-blue-200 text-blue-900",
  success: "bg-emerald-50 border-emerald-200 text-emerald-900",
  warning: "bg-amber-50 border-amber-200 text-amber-900",
  error: "bg-red-50 border-red-200 text-red-900",
};

export default function CyberAlert({
  children,
  variant = "info",
  title,
  dismissible = false,
  onDismiss,
  className = "",
}: CyberAlertProps) {
  const Icon = icons[variant];

  return (
    <div
      className={`flex gap-3 p-4 border clip-btn ${variantStyles[variant]} ${className}`}
      role="alert"
    >
      <Icon size={20} className="shrink-0 mt-0.5" />
      <div className="flex-1">
        {title && <p className="font-semibold text-sm mb-1">{title}</p>}
        <div className="text-sm opacity-90">{children}</div>
      </div>
      {dismissible && (
        <button
          onClick={onDismiss}
          className="shrink-0 w-6 h-6 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
          aria-label="Dismiss alert"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

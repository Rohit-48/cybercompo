export type ComponentPreviewId =
  | "button"
  | "card"
  | "input"
  | "badge"
  | "toggle"
  | "modal"
  | "tabs"
  | "avatar"
  | "tooltip"
  | "progress"
  | "alert"
  | "select"
  | "glitch-text"
  | "scan-line"
  | "cyber-grid";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ComponentPreviewProps {
  id: ComponentPreviewId | string;
  compact?: boolean;
  variant?: string;
  props?: Record<string, unknown>;
}

export interface ResolvedButtonPreviewProps {
  variant: ButtonVariant;
  size: ButtonSize;
  disabled: boolean;
  loading: boolean;
}

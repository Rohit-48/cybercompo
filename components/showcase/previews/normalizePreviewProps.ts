import type { ButtonSize, ButtonVariant, ResolvedButtonPreviewProps } from "./types";

function isButtonVariant(value: unknown): value is ButtonVariant {
  return value === "primary" || value === "secondary" || value === "ghost";
}

function isButtonSize(value: unknown): value is ButtonSize {
  return value === "sm" || value === "md" || value === "lg";
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

export function resolveButtonPreviewProps(
  variant: string | undefined,
  customProps: Record<string, unknown>,
): ResolvedButtonPreviewProps {
  return {
    variant: isButtonVariant(variant) ? variant : "primary",
    size: isButtonSize(customProps.size) ? customProps.size : "md",
    disabled: isBoolean(customProps.disabled) ? customProps.disabled : false,
    loading: isBoolean(customProps.loading) ? customProps.loading : false,
  };
}

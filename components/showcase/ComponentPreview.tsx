"use client";

import { useState } from "react";
import { getComponentPreviews } from "@/components/showcase/previews/getComponentPreviews";
import { resolveButtonPreviewProps } from "@/components/showcase/previews/normalizePreviewProps";
import type { ComponentPreviewId, ComponentPreviewProps } from "@/components/showcase/previews/types";

export default function ComponentPreview({
  id,
  compact = false,
  variant,
  props: customProps = {},
}: ComponentPreviewProps) {
  const [toggleState, setToggleState] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const previews = getComponentPreviews({
    compact,
    toggleState,
    setToggleState,
    modalOpen,
    setModalOpen,
    buttonProps: resolveButtonPreviewProps(variant, customProps),
  });

  return (
    previews[id as ComponentPreviewId] || (
      <p className="text-sm text-text-muted">Preview not available</p>
    )
  );
}

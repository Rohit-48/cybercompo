"use client";

import { useState } from "react";
import CyberButton from "@/components/ui/CyberButton";
import CyberCard from "@/components/ui/CyberCard";
import CyberInput from "@/components/ui/CyberInput";
import CyberBadge from "@/components/ui/CyberBadge";
import CyberToggle from "@/components/ui/CyberToggle";
import CyberModal from "@/components/ui/CyberModal";
import CyberTabs from "@/components/ui/CyberTabs";
import CyberAvatar from "@/components/ui/CyberAvatar";
import CyberTooltip from "@/components/ui/CyberTooltip";
import CyberProgress from "@/components/ui/CyberProgress";
import CyberAlert from "@/components/ui/CyberAlert";
import CyberSelect from "@/components/ui/CyberSelect";
import GlitchText from "@/components/ui/GlitchText";
import ScanLine from "@/components/ui/ScanLine";
import CyberGrid from "@/components/ui/CyberGrid";

interface ComponentPreviewProps {
  id: string;
  compact?: boolean;
  variant?: string;
  props?: Record<string, unknown>;
}

export default function ComponentPreview({
  id,
  compact = false,
  variant,
  props: customProps = {},
}: ComponentPreviewProps) {
  const [toggleState, setToggleState] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const previews: Record<string, React.ReactNode> = {
    button: compact ? (
      <div className="flex gap-2 flex-wrap">
        <CyberButton
          variant={(variant as "primary" | "secondary" | "ghost") || "primary"}
          size={(customProps.size as "sm" | "md" | "lg") || "md"}
          disabled={customProps.disabled as boolean}
          loading={customProps.loading as boolean}
        >
          Primary
        </CyberButton>
        <CyberButton variant="secondary" size="md">
          Secondary
        </CyberButton>
      </div>
    ) : (
      <div className="flex flex-col gap-4">
        <div className="flex gap-3 flex-wrap">
          <CyberButton
            variant={(variant as "primary" | "secondary" | "ghost") || "primary"}
            size={(customProps.size as "sm" | "md" | "lg") || "md"}
            disabled={customProps.disabled as boolean}
            loading={customProps.loading as boolean}
          >
            Primary
          </CyberButton>
          <CyberButton variant="secondary">Secondary</CyberButton>
          <CyberButton variant="ghost">Ghost</CyberButton>
        </div>
        <div className="flex gap-3 flex-wrap">
          <CyberButton variant="primary" size="sm">
            Small
          </CyberButton>
          <CyberButton variant="primary" size="md">
            Medium
          </CyberButton>
          <CyberButton variant="primary" size="lg">
            Large
          </CyberButton>
        </div>
        <div className="flex gap-3">
          <CyberButton loading>Loading</CyberButton>
          <CyberButton disabled>Disabled</CyberButton>
        </div>
      </div>
    ),

    card: compact ? (
      <CyberCard variant="bordered" hover={false} className="max-w-[200px]">
        <div className="p-4">
          <p className="text-sm font-semibold">Card Title</p>
          <p className="text-xs text-text-muted mt-1">Description</p>
        </div>
      </CyberCard>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        <CyberCard variant="default" hover={false}>
          <div className="p-5">
            <p className="font-semibold">Default</p>
            <p className="text-sm text-text-muted mt-1">Shadow card</p>
          </div>
        </CyberCard>
        <CyberCard variant="elevated" hover={false}>
          <div className="p-5">
            <p className="font-semibold">Elevated</p>
            <p className="text-sm text-text-muted mt-1">Heavy shadow</p>
          </div>
        </CyberCard>
        <CyberCard variant="bordered" hover={false}>
          <div className="p-5">
            <p className="font-semibold">Bordered</p>
            <p className="text-sm text-text-muted mt-1">Border style</p>
          </div>
        </CyberCard>
      </div>
    ),

    input: compact ? (
      <div className="w-full max-w-[200px]">
        <CyberInput placeholder="Type here..." />
      </div>
    ) : (
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <CyberInput label="Username" placeholder="Enter username" />
        <CyberInput
          label="Email"
          placeholder="user@example.com"
          helperText="We'll never share your email"
        />
        <CyberInput
          label="Password"
          type="password"
          error="Password is too short"
        />
      </div>
    ),

    badge: compact ? (
      <div className="flex gap-2 flex-wrap">
        <CyberBadge variant="default">Default</CyberBadge>
        <CyberBadge variant="cyan">Cyber</CyberBadge>
      </div>
    ) : (
      <div className="flex flex-col gap-3">
        <div className="flex gap-2 flex-wrap">
          <CyberBadge variant="default">Default</CyberBadge>
          <CyberBadge variant="success">Success</CyberBadge>
          <CyberBadge variant="warning">Warning</CyberBadge>
          <CyberBadge variant="error">Error</CyberBadge>
          <CyberBadge variant="cyan">Cyber</CyberBadge>
        </div>
        <div className="flex gap-2 flex-wrap">
          <CyberBadge variant="cyan" size="md">
            Large Cyan
          </CyberBadge>
          <CyberBadge variant="success" size="md">
            Large Success
          </CyberBadge>
        </div>
      </div>
    ),

    toggle: compact ? (
      <CyberToggle
        checked={toggleState}
        onChange={setToggleState}
        label="Enable"
      />
    ) : (
      <div className="flex flex-col gap-4">
        <CyberToggle
          checked={toggleState}
          onChange={setToggleState}
          label="Enable feature"
        />
        <CyberToggle checked={false} onChange={() => {}} label="Disabled" disabled />
        <CyberToggle checked={true} onChange={() => {}} label="Always on" disabled />
      </div>
    ),

    modal: compact ? (
      <CyberButton
        variant="secondary"
        size="sm"
        onClick={() => setModalOpen(true)}
      >
        Open Modal
      </CyberButton>
    ) : (
      <div>
        <CyberButton onClick={() => setModalOpen(true)}>
          Open Modal
        </CyberButton>
        <CyberModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Modal Dialog"
        >
          <p className="text-sm text-text-muted">
            This is a modal dialog with animated entrance and exit. Press Escape
            or click the backdrop to close.
          </p>
          <div className="flex gap-3 mt-6">
            <CyberButton
              variant="primary"
              size="sm"
              onClick={() => setModalOpen(false)}
            >
              Confirm
            </CyberButton>
            <CyberButton
              variant="secondary"
              size="sm"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </CyberButton>
          </div>
        </CyberModal>
      </div>
    ),

    tabs: compact ? (
      <div className="w-full max-w-[200px] text-xs">
        <CyberTabs
          tabs={[
            { id: "1", label: "Tab 1", content: <p className="p-2 text-xs">Content 1</p> },
            { id: "2", label: "Tab 2", content: <p className="p-2 text-xs">Content 2</p> },
          ]}
        />
      </div>
    ) : (
      <div className="w-full max-w-md">
        <CyberTabs
          tabs={[
            {
              id: "overview",
              label: "Overview",
              content: (
                <div className="p-4">
                  <p className="text-sm">Overview content goes here.</p>
                </div>
              ),
            },
            {
              id: "settings",
              label: "Settings",
              content: (
                <div className="p-4">
                  <p className="text-sm">Settings content goes here.</p>
                </div>
              ),
            },
            {
              id: "logs",
              label: "Logs",
              content: (
                <div className="p-4">
                  <p className="text-sm font-mono">
                    [2026-02-10] System initialized
                  </p>
                </div>
              ),
            },
          ]}
        />
      </div>
    ),

    avatar: compact ? (
      <div className="flex gap-2 items-center">
        <CyberAvatar initials="CY" size="sm" />
        <CyberAvatar initials="UI" size="md" />
      </div>
    ) : (
      <div className="flex gap-4 items-end">
        <CyberAvatar initials="SM" size="sm" />
        <CyberAvatar initials="MD" size="md" />
        <CyberAvatar initials="LG" size="lg" />
      </div>
    ),

    tooltip: compact ? (
      <CyberTooltip content="Tooltip!">
        <CyberButton variant="secondary" size="sm">
          Hover
        </CyberButton>
      </CyberTooltip>
    ) : (
      <div className="flex gap-4 flex-wrap">
        <CyberTooltip content="Top tooltip" position="top">
          <CyberButton variant="secondary" size="sm">
            Top
          </CyberButton>
        </CyberTooltip>
        <CyberTooltip content="Bottom tooltip" position="bottom">
          <CyberButton variant="secondary" size="sm">
            Bottom
          </CyberButton>
        </CyberTooltip>
        <CyberTooltip content="Left tooltip" position="left">
          <CyberButton variant="secondary" size="sm">
            Left
          </CyberButton>
        </CyberTooltip>
        <CyberTooltip content="Right tooltip" position="right">
          <CyberButton variant="secondary" size="sm">
            Right
          </CyberButton>
        </CyberTooltip>
      </div>
    ),

    progress: compact ? (
      <div className="w-full max-w-[200px]">
        <CyberProgress value={72} />
      </div>
    ) : (
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <CyberProgress value={72} label="Upload" />
        <CyberProgress value={30} label="Processing" />
        <CyberProgress value={100} label="Complete" />
      </div>
    ),

    alert: compact ? (
      <div className="w-full max-w-[240px]">
        <CyberAlert variant="info">Info alert</CyberAlert>
      </div>
    ) : (
      <div className="flex flex-col gap-3 w-full">
        <CyberAlert variant="info" title="Information">
          This is an informational message.
        </CyberAlert>
        <CyberAlert variant="success" title="Success">
          Operation completed successfully.
        </CyberAlert>
        <CyberAlert variant="warning" title="Warning">
          Please review before proceeding.
        </CyberAlert>
        <CyberAlert variant="error" title="Error">
          Something went wrong.
        </CyberAlert>
      </div>
    ),

    select: compact ? (
      <div className="w-full max-w-[200px]">
        <CyberSelect
          options={[
            { value: "react", label: "React" },
            { value: "vue", label: "Vue" },
          ]}
        />
      </div>
    ) : (
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <CyberSelect
          label="Framework"
          options={[
            { value: "react", label: "React" },
            { value: "vue", label: "Vue" },
            { value: "svelte", label: "Svelte" },
            { value: "angular", label: "Angular" },
          ]}
        />
        <CyberSelect
          label="With Error"
          error="Please select an option"
          options={[
            { value: "", label: "Select..." },
            { value: "a", label: "Option A" },
          ]}
        />
      </div>
    ),

    "glitch-text": compact ? (
      <GlitchText text="CYBER" className="text-xl" />
    ) : (
      <div className="flex flex-col gap-4 items-start">
        <GlitchText text="LOW INTENSITY" intensity="low" className="text-2xl" />
        <GlitchText text="MEDIUM GLITCH" intensity="medium" className="text-2xl" />
        <GlitchText text="HIGH CHAOS" intensity="high" className="text-2xl" />
      </div>
    ),

    "scan-line": compact ? (
      <div className="relative w-full h-16 bg-gray-100 flex items-center justify-center overflow-hidden">
        <ScanLine speed="fast" opacity={0.15} />
        <span className="text-xs font-mono z-20">SCANNING...</span>
      </div>
    ) : (
      <div className="relative w-full h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
        <ScanLine speed="normal" opacity={0.15} />
        <span className="text-lg font-mono z-20 font-bold">SCAN ACTIVE</span>
      </div>
    ),

    "cyber-grid": compact ? (
      <div className="relative w-full h-20 bg-gray-900 overflow-hidden rounded-sm">
        <CyberGrid />
        <div className="relative z-10 h-full flex items-center justify-center">
          <span className="text-xs font-mono text-cyan-glow">GRID</span>
        </div>
      </div>
    ) : (
      <div className="relative w-full h-48 bg-gray-900 overflow-hidden">
        <CyberGrid />
        <div className="relative z-10 h-full flex items-center justify-center">
          <span className="text-2xl font-mono font-bold text-cyan-glow">
            CYBER GRID
          </span>
        </div>
      </div>
    ),
  };

  return previews[id] || <p className="text-sm text-text-muted">Preview not available</p>;
}

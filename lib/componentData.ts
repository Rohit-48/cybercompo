export interface ComponentProp {
  name: string;
  type: string;
  default: string;
  description: string;
}

export interface ComponentData {
  id: string;
  name: string;
  category: "usable" | "experimental";
  subcategory: string;
  description: string;
  variants?: string[];
  props: ComponentProp[];
  code: string;
  usage: string;
  fullCode: string;
}

export const components: ComponentData[] = [
  {
    id: "button",
    name: "Button",
    category: "usable",
    subcategory: "buttons",
    description: "Versatile button component with multiple variants, sizes, and loading state.",
    variants: ["primary", "secondary", "ghost"],
    props: [
      { name: "variant", type: '"primary" | "secondary" | "ghost"', default: '"primary"', description: "Visual style variant" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Button size" },
      { name: "loading", type: "boolean", default: "false", description: "Show loading spinner" },
      { name: "disabled", type: "boolean", default: "false", description: "Disable the button" },
    ],
    code: `<CyberButton variant="primary">Click me</CyberButton>
<CyberButton variant="secondary">Secondary</CyberButton>
<CyberButton variant="ghost">Ghost</CyberButton>`,
    usage: `import CyberButton from '@/components/ui/CyberButton'

export default function MyComponent() {
  return (
    <CyberButton variant="primary" size="md">
      Click me
    </CyberButton>
  )
}`,
    fullCode: `"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";

interface CyberButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const CyberButton = forwardRef<HTMLButtonElement, CyberButtonProps>(
  ({ variant = "primary", size = "md", loading = false, disabled, className = "", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 clip-btn active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary: "bg-text-primary text-white hover:shadow-[0_0_20px_rgba(255,214,10,0.3)] hover:-translate-y-0.5",
      secondary: "bg-white text-text-primary border border-text-primary hover:bg-cyan-hover hover:-translate-y-0.5",
      ghost: "bg-transparent text-text-primary hover:bg-gray-100 hover:-translate-y-0.5",
    };

    const sizes = {
      sm: "px-4 py-1.5 text-sm",
      md: "px-6 py-2.5 text-sm",
      lg: "px-8 py-3 text-base",
    };

    return (
      <button ref={ref} disabled={disabled || loading} className={\`\${baseStyles} \${variants[variant]} \${sizes[size]} \${className}\`} {...props}>
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

CyberButton.displayName = "CyberButton";
export default CyberButton;`,
  },
  {
    id: "card",
    name: "Card",
    category: "usable",
    subcategory: "cards",
    description: "Flexible card component with clipped corners and hover effects.",
    variants: ["default", "elevated", "bordered"],
    props: [
      { name: "variant", type: '"default" | "elevated" | "bordered"', default: '"default"', description: "Card style variant" },
      { name: "clipCorner", type: '"tr" | "br" | "both" | "none"', default: '"tr"', description: "Which corners to clip" },
      { name: "hover", type: "boolean", default: "true", description: "Enable hover effects" },
    ],
    code: `<CyberCard variant="default">
  <div className="p-6">
    <h3 className="text-lg font-semibold">Card Title</h3>
    <p className="text-sm text-text-muted mt-2">Card description goes here.</p>
  </div>
</CyberCard>`,
    usage: `import CyberCard from '@/components/ui/CyberCard'

export default function MyComponent() {
  return (
    <CyberCard variant="default" clipCorner="tr">
      <div className="p-6">
        <h3>Card Title</h3>
        <p>Content goes here.</p>
      </div>
    </CyberCard>
  )
}`,
    fullCode: `"use client";

import { ReactNode } from "react";

interface CyberCardProps {
  children: ReactNode;
  variant?: "default" | "elevated" | "bordered";
  clipCorner?: "tr" | "br" | "both" | "none";
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function CyberCard({ children, variant = "default", clipCorner = "tr", hover = true, className = "", onClick }: CyberCardProps) {
  const clipStyles = { tr: "clip-tr", br: "clip-br", both: "clip-both", none: "" };
  const variantStyles = {
    default: "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
    elevated: "bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)]",
    bordered: "bg-white border border-border",
  };
  const hoverStyles = hover ? "hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,214,10,0.3)] cursor-pointer" : "";

  return (
    <div onClick={onClick} className={\`transition-all duration-200 \${clipStyles[clipCorner]} \${variantStyles[variant]} \${hoverStyles} \${className}\`}>
      {children}
    </div>
  );
}`,
  },
  {
    id: "input",
    name: "Input",
    category: "usable",
    subcategory: "inputs",
    description: "Styled input component with labels, validation, and helper text.",
    props: [
      { name: "label", type: "string", default: "undefined", description: "Input label" },
      { name: "error", type: "string", default: "undefined", description: "Error message" },
      { name: "helperText", type: "string", default: "undefined", description: "Helper text below input" },
      { name: "placeholder", type: "string", default: "undefined", description: "Placeholder text" },
    ],
    code: `<CyberInput label="Username" placeholder="Enter your username" />
<CyberInput label="Email" error="Invalid email address" />`,
    usage: `import CyberInput from '@/components/ui/CyberInput'

export default function MyComponent() {
  return (
    <CyberInput
      label="Username"
      placeholder="Enter your username"
      helperText="Choose a unique username"
    />
  )
}`,
    fullCode: `"use client";

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
        {label && <label className="text-sm font-medium text-text-primary">{label}</label>}
        <input ref={ref} className={\`w-full bg-white border px-4 py-2.5 text-sm clip-btn transition-all placeholder:text-text-muted/50 focus:outline-none \${error ? "border-red-400" : "border-border focus:border-cyan-border focus:shadow-[0_0_0_3px_rgba(255,214,10,0.1)]"} \${className}\`} {...props} />
        {error && <p className="text-xs text-red-500">{error}</p>}
        {helperText && !error && <p className="text-xs text-text-muted">{helperText}</p>}
      </div>
    );
  }
);

CyberInput.displayName = "CyberInput";
export default CyberInput;`,
  },
  {
    id: "badge",
    name: "Badge",
    category: "usable",
    subcategory: "buttons",
    description: "Small label component for status indicators and tags.",
    variants: ["default", "success", "warning", "error", "cyan"],
    props: [
      { name: "variant", type: '"default" | "success" | "warning" | "error" | "cyan"', default: '"default"', description: "Badge color variant" },
      { name: "size", type: '"sm" | "md"', default: '"sm"', description: "Badge size" },
    ],
    code: `<CyberBadge variant="default">Default</CyberBadge>
<CyberBadge variant="success">Success</CyberBadge>
<CyberBadge variant="cyan">Cyber</CyberBadge>`,
    usage: `import CyberBadge from '@/components/ui/CyberBadge'

export default function MyComponent() {
  return <CyberBadge variant="cyan">New</CyberBadge>
}`,
    fullCode: `"use client";

import { ReactNode } from "react";

interface CyberBadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "cyan";
  size?: "sm" | "md";
}

export default function CyberBadge({ children, variant = "default", size = "sm" }: CyberBadgeProps) {
  const variants = {
    default: "bg-gray-100 text-text-primary border border-border",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border border-amber-200",
    error: "bg-red-50 text-red-700 border border-red-200",
    cyan: "bg-cyan-hover text-cyan-glow border border-cyan-border",
  };
  const sizes = { sm: "px-2 py-0.5 text-xs", md: "px-3 py-1 text-sm" };

  return <span className={\`inline-flex items-center font-medium clip-btn \${variants[variant]} \${sizes[size]}\`}>{children}</span>;
}`,
  },
  {
    id: "toggle",
    name: "Toggle",
    category: "usable",
    subcategory: "inputs",
    description: "iOS-style toggle switch with smooth animation.",
    props: [
      { name: "checked", type: "boolean", default: "false", description: "Toggle state" },
      { name: "onChange", type: "(checked: boolean) => void", default: "-", description: "Change handler" },
      { name: "label", type: "string", default: "undefined", description: "Label text" },
      { name: "disabled", type: "boolean", default: "false", description: "Disable toggle" },
    ],
    code: `<CyberToggle checked={true} onChange={() => {}} label="Enable feature" />
<CyberToggle checked={false} onChange={() => {}} label="Disabled" disabled />`,
    usage: `import CyberToggle from '@/components/ui/CyberToggle'
import { useState } from 'react'

export default function MyComponent() {
  const [enabled, setEnabled] = useState(false)
  return <CyberToggle checked={enabled} onChange={setEnabled} label="Dark Mode" />
}`,
    fullCode: `"use client";

interface CyberToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export default function CyberToggle({ checked, onChange, label, disabled = false }: CyberToggleProps) {
  return (
    <label className={\`inline-flex items-center gap-3 \${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}\`}>
      <button role="switch" aria-checked={checked} disabled={disabled} onClick={() => !disabled && onChange(!checked)}
        className={\`relative w-11 h-6 rounded-full transition-colors duration-200 \${checked ? "bg-cyan-glow" : "bg-gray-300"}\`}>
        <span className={\`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200 \${checked ? "translate-x-5" : "translate-x-0"}\`} />
      </button>
      {label && <span className="text-sm text-text-primary">{label}</span>}
    </label>
  );
}`,
  },
  {
    id: "modal",
    name: "Modal",
    category: "usable",
    subcategory: "navigation",
    description: "Animated modal dialog with backdrop and keyboard support.",
    variants: ["sm", "md", "lg"],
    props: [
      { name: "isOpen", type: "boolean", default: "false", description: "Control modal visibility" },
      { name: "onClose", type: "() => void", default: "-", description: "Close handler" },
      { name: "title", type: "string", default: "undefined", description: "Modal title" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Modal width" },
    ],
    code: `<CyberButton onClick={() => setOpen(true)}>Open Modal</CyberButton>
<CyberModal isOpen={open} onClose={() => setOpen(false)} title="Dialog">
  <p>Modal content goes here.</p>
</CyberModal>`,
    usage: `import CyberModal from '@/components/ui/CyberModal'
import { useState } from 'react'

export default function MyComponent() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <CyberModal isOpen={open} onClose={() => setOpen(false)} title="Title">
        <p>Content</p>
      </CyberModal>
    </>
  )
}`,
    fullCode: `// See CyberModal.tsx for full implementation`,
  },
  {
    id: "tabs",
    name: "Tabs",
    category: "usable",
    subcategory: "navigation",
    description: "Tabbed content switcher with cyberpunk styling.",
    props: [
      { name: "tabs", type: "Tab[]", default: "[]", description: "Array of tab objects with id, label, content" },
      { name: "defaultTab", type: "string", default: "first tab id", description: "Initially active tab" },
    ],
    code: `<CyberTabs tabs={[
  { id: "tab1", label: "First", content: <p>First tab content</p> },
  { id: "tab2", label: "Second", content: <p>Second tab content</p> },
]} />`,
    usage: `import CyberTabs from '@/components/ui/CyberTabs'

export default function MyComponent() {
  return (
    <CyberTabs tabs={[
      { id: "code", label: "Code", content: <pre>code here</pre> },
      { id: "preview", label: "Preview", content: <div>preview</div> },
    ]} />
  )
}`,
    fullCode: `// See CyberTabs.tsx for full implementation`,
  },
  {
    id: "avatar",
    name: "Avatar",
    category: "usable",
    subcategory: "media",
    description: "User avatar with image support and initials fallback.",
    props: [
      { name: "src", type: "string", default: "undefined", description: "Image source URL" },
      { name: "initials", type: "string", default: "undefined", description: "Fallback initials" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Avatar size" },
      { name: "alt", type: "string", default: '"Avatar"', description: "Alt text" },
    ],
    code: `<CyberAvatar initials="CY" size="sm" />
<CyberAvatar initials="CP" size="md" />
<CyberAvatar initials="UI" size="lg" />`,
    usage: `import CyberAvatar from '@/components/ui/CyberAvatar'

export default function MyComponent() {
  return <CyberAvatar src="/avatar.png" alt="User" size="md" />
}`,
    fullCode: `// See CyberAvatar.tsx for full implementation`,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    category: "usable",
    subcategory: "navigation",
    description: "Hover tooltip with multiple positioning options.",
    props: [
      { name: "content", type: "string", default: '""', description: "Tooltip text" },
      { name: "position", type: '"top" | "bottom" | "left" | "right"', default: '"top"', description: "Tooltip position" },
    ],
    code: `<CyberTooltip content="This is a tooltip">
  <CyberButton variant="secondary">Hover me</CyberButton>
</CyberTooltip>`,
    usage: `import CyberTooltip from '@/components/ui/CyberTooltip'

export default function MyComponent() {
  return (
    <CyberTooltip content="Help text" position="top">
      <button>?</button>
    </CyberTooltip>
  )
}`,
    fullCode: `// See CyberTooltip.tsx for full implementation`,
  },
  {
    id: "progress",
    name: "Progress",
    category: "usable",
    subcategory: "media",
    description: "Progress bar with label and value display.",
    props: [
      { name: "value", type: "number", default: "0", description: "Current value" },
      { name: "max", type: "number", default: "100", description: "Maximum value" },
      { name: "label", type: "string", default: "undefined", description: "Label text" },
      { name: "showValue", type: "boolean", default: "true", description: "Show percentage" },
    ],
    code: `<CyberProgress value={72} label="Upload progress" />
<CyberProgress value={30} max={100} label="Loading" />`,
    usage: `import CyberProgress from '@/components/ui/CyberProgress'

export default function MyComponent() {
  return <CyberProgress value={72} label="Progress" />
}`,
    fullCode: `// See CyberProgress.tsx for full implementation`,
  },
  {
    id: "alert",
    name: "Alert",
    category: "usable",
    subcategory: "cards",
    description: "Alert banner for info, success, warning, and error messages.",
    variants: ["info", "success", "warning", "error"],
    props: [
      { name: "variant", type: '"info" | "success" | "warning" | "error"', default: '"info"', description: "Alert type" },
      { name: "title", type: "string", default: "undefined", description: "Alert title" },
      { name: "dismissible", type: "boolean", default: "false", description: "Show dismiss button" },
    ],
    code: `<CyberAlert variant="info" title="Information">
  This is an info alert message.
</CyberAlert>
<CyberAlert variant="success" title="Success">
  Operation completed successfully.
</CyberAlert>`,
    usage: `import CyberAlert from '@/components/ui/CyberAlert'

export default function MyComponent() {
  return (
    <CyberAlert variant="success" title="Saved!" dismissible>
      Your changes have been saved.
    </CyberAlert>
  )
}`,
    fullCode: `// See CyberAlert.tsx for full implementation`,
  },
  {
    id: "select",
    name: "Select",
    category: "usable",
    subcategory: "inputs",
    description: "Dropdown select with cyberpunk styling and custom arrow.",
    props: [
      { name: "label", type: "string", default: "undefined", description: "Select label" },
      { name: "options", type: "{ value: string; label: string }[]", default: "[]", description: "Select options" },
      { name: "error", type: "string", default: "undefined", description: "Error message" },
    ],
    code: `<CyberSelect
  label="Framework"
  options={[
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "svelte", label: "Svelte" },
  ]}
/>`,
    usage: `import CyberSelect from '@/components/ui/CyberSelect'

export default function MyComponent() {
  return (
    <CyberSelect
      label="Theme"
      options={[
        { value: "light", label: "Light" },
        { value: "dark", label: "Dark" },
      ]}
    />
  )
}`,
    fullCode: `// See CyberSelect.tsx for full implementation`,
  },
  {
    id: "glitch-text",
    name: "Glitch Text",
    category: "experimental",
    subcategory: "text-effects",
    description: "Animated text with a cyberpunk glitch distortion effect.",
    props: [
      { name: "text", type: "string", default: '""', description: "Text to display" },
      { name: "intensity", type: '"low" | "medium" | "high"', default: '"medium"', description: "Glitch intensity" },
    ],
    code: `<GlitchText text="CYBERPUNK" intensity="medium" />`,
    usage: `import GlitchText from '@/components/ui/GlitchText'

export default function MyComponent() {
  return <GlitchText text="SYSTEM ERROR" intensity="high" />
}`,
    fullCode: `// See GlitchText.tsx for full implementation`,
  },
  {
    id: "scan-line",
    name: "Scan Line",
    category: "experimental",
    subcategory: "backgrounds",
    description: "Animated scan line overlay effect for containers.",
    props: [
      { name: "speed", type: '"slow" | "normal" | "fast"', default: '"normal"', description: "Animation speed" },
      { name: "opacity", type: "number", default: "0.1", description: "Line opacity" },
    ],
    code: `<ScanLine speed="normal" opacity={0.1} />`,
    usage: `import ScanLine from '@/components/ui/ScanLine'

export default function MyComponent() {
  return (
    <div className="relative">
      <ScanLine />
      <p>Content with scan lines</p>
    </div>
  )
}`,
    fullCode: `// See ScanLine.tsx for full implementation`,
  },
  {
    id: "cyber-grid",
    name: "Cyber Grid",
    category: "experimental",
    subcategory: "backgrounds",
    description: "Animated perspective grid background with glow effects.",
    props: [
      { name: "color", type: "string", default: '"#ffd60a"', description: "Grid line color" },
      { name: "animated", type: "boolean", default: "true", description: "Enable animation" },
    ],
    code: `<CyberGrid color="#ffd60a" animated />`,
    usage: `import CyberGrid from '@/components/ui/CyberGrid'

export default function MyComponent() {
  return (
    <div className="relative h-64">
      <CyberGrid />
      <div className="relative z-10">Content</div>
    </div>
  )
}`,
    fullCode: `// See CyberGrid.tsx for full implementation`,
  },
];

export const categories = [
  {
    name: "All",
    slug: "all",
    count: components.length,
  },
  {
    name: "Usable",
    slug: "usable",
    count: components.filter((c) => c.category === "usable").length,
    subcategories: [
      { name: "Buttons", slug: "buttons" },
      { name: "Inputs", slug: "inputs" },
      { name: "Cards", slug: "cards" },
      { name: "Navigation", slug: "navigation" },
      { name: "Media", slug: "media" },
    ],
  },
  {
    name: "Experimental",
    slug: "experimental",
    count: components.filter((c) => c.category === "experimental").length,
    subcategories: [
      { name: "Text Effects", slug: "text-effects" },
      { name: "Backgrounds", slug: "backgrounds" },
    ],
  },
];

export function getComponent(id: string): ComponentData | undefined {
  return components.find((c) => c.id === id);
}

export function filterComponents(
  category: string,
  search: string,
): ComponentData[] {
  return components.filter((c) => {
    const matchesCategory =
      category === "all" ||
      c.category === category ||
      c.subcategory === category;
    const matchesSearch =
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CodeBlock from "@/components/showcase/CodeBlock";

const sections = [
  { id: "getting-started", label: "Getting Started" },
  { id: "installation", label: "Installation" },
  { id: "quick-start", label: "Quick Start" },
  { id: "components", label: "Components" },
  { id: "customization", label: "Customization" },
  { id: "theming", label: "Theming" },
  { id: "animations", label: "Animations" },
  { id: "accessibility", label: "Accessibility" },
  { id: "contributing", label: "Contributing" },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("getting-started");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-100px 0px -60% 0px" },
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-16 flex min-h-screen">
        {/* Table of Contents */}
        <aside className="hidden lg:block w-56 shrink-0 fixed top-16 bottom-0 left-0 bg-white border-r border-border overflow-y-auto">
          <nav className="p-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-6">
              Documentation
            </h2>
            <div className="space-y-0.5">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`block px-3 py-2 text-sm transition-all duration-150 ${
                    activeSection === section.id
                      ? "text-cyan-glow border-l-[3px] border-cyan-glow bg-cyan-hover font-medium"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {section.label}
                </a>
              ))}
            </div>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 lg:ml-56">
          <div className="max-w-[800px] mx-auto p-6 sm:p-8 lg:p-12">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="prose-custom"
            >
              {/* Getting Started */}
              <section id="getting-started" className="mb-16">
                <h1 className="text-3xl font-bold text-text-primary mb-4">
                  Getting Started
                </h1>
                <p className="text-text-muted leading-relaxed text-lg">
                  Cyberpunk UI is a collection of minimal, cyberpunk-styled
                  React components built with Tailwind CSS. Each component is
                  designed to be accessible, customizable, and production-ready.
                </p>
              </section>

              {/* Installation */}
              <section id="installation" className="mb-16">
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  Installation
                </h2>
                <p className="text-text-muted mb-4 leading-relaxed">
                  Install the component library and its peer dependencies.
                </p>
                <CodeBlock
                  code={`# Using npm
npm install @cyberpunk-ui/react

# Using pnpm
pnpm add @cyberpunk-ui/react

# Using yarn
yarn add @cyberpunk-ui/react`}
                  language="bash"
                  showLineNumbers={false}
                />
                <p className="text-text-muted mt-4 leading-relaxed">
                  Make sure you also have Tailwind CSS configured in your
                  project. Add the component library paths to your Tailwind
                  config:
                </p>
                <CodeBlock
                  code={`// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@cyberpunk-ui/**/*.{js,ts,jsx,tsx}',
  ],
  // ...
}`}
                  language="javascript"
                  showLineNumbers={false}
                />
              </section>

              {/* Quick Start */}
              <section id="quick-start" className="mb-16">
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  Quick Start
                </h2>
                <p className="text-text-muted mb-4 leading-relaxed">
                  Import and use any component immediately. All components
                  support TypeScript out of the box.
                </p>
                <CodeBlock
                  code={`import { CyberButton, CyberCard, CyberInput } from '@cyberpunk-ui/react'

export default function App() {
  return (
    <div className="p-8">
      <CyberCard>
        <div className="p-6">
          <h2 className="text-lg font-bold mb-4">Login</h2>
          <CyberInput label="Email" placeholder="user@example.com" />
          <CyberButton variant="primary" className="mt-4 w-full">
            Sign In
          </CyberButton>
        </div>
      </CyberCard>
    </div>
  )
}`}
                  language="tsx"
                />
              </section>

              {/* Components */}
              <section id="components" className="mb-16">
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  Components
                </h2>
                <p className="text-text-muted mb-4 leading-relaxed">
                  The library includes a growing set of components organized
                  into two categories:
                </p>
                <div className="space-y-4">
                  <div className="p-5 bg-white border border-border clip-btn">
                    <h3 className="font-semibold text-text-primary mb-2">
                      Usable Components
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      Production-ready components: Button, Card, Input, Badge,
                      Toggle, Modal, Tabs, Avatar, Tooltip, Progress, Alert, and
                      Select. All fully accessible and tested.
                    </p>
                  </div>
                  <div className="p-5 bg-white border border-border clip-btn">
                    <h3 className="font-semibold text-text-primary mb-2">
                      Experimental Components
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      Cutting-edge effects: Glitch Text, Scan Line, and Cyber
                      Grid. These push creative boundaries and are perfect for
                      landing pages and hero sections.
                    </p>
                  </div>
                </div>
              </section>

              {/* Customization */}
              <section id="customization" className="mb-16">
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  Customization
                </h2>
                <p className="text-text-muted mb-4 leading-relaxed">
                  Every component accepts a{" "}
                  <code className="bg-gray-100 px-1.5 py-0.5 text-sm font-mono rounded">
                    className
                  </code>{" "}
                  prop for additional styling. Components are built with
                  Tailwind CSS classes, making them easy to extend.
                </p>
                <CodeBlock
                  code={`// Custom styling via className
<CyberButton className="w-full bg-purple-600 hover:bg-purple-700">
  Custom Button
</CyberButton>

// Override specific properties
<CyberCard className="rounded-lg shadow-2xl">
  <div className="p-8">Custom card</div>
</CyberCard>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </section>

              {/* Theming */}
              <section id="theming" className="mb-16">
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  Theming
                </h2>
                <p className="text-text-muted mb-4 leading-relaxed">
                  The design system is built on CSS custom properties. Override
                  them to create your own theme:
                </p>
                <CodeBlock
                  code={`/* Override theme variables */
@theme inline {
  --color-background: #f5f5f5;
  --color-surface: #ffffff;
  --color-text-primary: #000000;
  --color-text-muted: #666666;
  --color-cyan-glow: #ffd60a;
  --color-border: #e0e0e0;
}

/* Dark theme example */
.dark {
  --color-background: #0a0a0a;
  --color-surface: #1a1a1a;
  --color-text-primary: #ffffff;
  --color-text-muted: #999999;
  --color-border: #333333;
}`}
                  language="css"
                  showLineNumbers={false}
                />
              </section>

              {/* Animations */}
              <section id="animations" className="mb-16">
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  Animations
                </h2>
                <p className="text-text-muted mb-4 leading-relaxed">
                  Components use CSS transitions for hover and focus states.
                  For more complex animations, we integrate with Framer Motion:
                </p>
                <CodeBlock
                  code={`import { motion } from 'framer-motion'
import { CyberCard } from '@cyberpunk-ui/react'

// Wrap components with motion for entrance animations
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>
  <CyberCard>
    <div className="p-6">Animated card</div>
  </CyberCard>
</motion.div>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </section>

              {/* Accessibility */}
              <section id="accessibility" className="mb-16">
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  Accessibility
                </h2>
                <p className="text-text-muted mb-4 leading-relaxed">
                  All components are built with accessibility in mind:
                </p>
                <ul className="space-y-2 text-text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-glow mt-1">&#10003;</span>
                    <span>
                      WCAG AA color contrast ratios (minimum 4.5:1 for text)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-glow mt-1">&#10003;</span>
                    <span>
                      Keyboard navigation with visible focus indicators
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-glow mt-1">&#10003;</span>
                    <span>Proper ARIA labels and roles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-glow mt-1">&#10003;</span>
                    <span>Screen reader compatible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-glow mt-1">&#10003;</span>
                    <span>Escape key closes modals and dropdowns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-glow mt-1">&#10003;</span>
                    <span>Reduced motion support via prefers-reduced-motion</span>
                  </li>
                </ul>
              </section>

              {/* Contributing */}
              <section id="contributing" className="mb-16">
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  Contributing
                </h2>
                <p className="text-text-muted mb-4 leading-relaxed">
                  We welcome contributions! Here&apos;s how to get started:
                </p>
                <CodeBlock
                  code={`# Clone the repository
git clone https://github.com/your-username/cyberpunk-ui.git

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build`}
                  language="bash"
                  showLineNumbers={false}
                />
                <p className="text-text-muted mt-4 leading-relaxed">
                  Please read our contributing guidelines and code of conduct
                  before submitting pull requests.
                </p>
              </section>
            </motion.article>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
}

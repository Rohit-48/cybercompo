"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, Copy, Check, RotateCcw, Download } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ComponentPreview from "@/components/showcase/ComponentPreview";
import CodeBlock from "@/components/showcase/CodeBlock";
import { components } from "@/lib/componentData";

interface SelectedComponent {
  id: string;
  name: string;
}

export default function PlaygroundPage() {
  const [selectedComponents, setSelectedComponents] = useState<
    SelectedComponent[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);

  const filteredList = useMemo(
    () =>
      components.filter(
        (c) =>
          !searchQuery ||
          c.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery],
  );

  const toggleComponent = useCallback((id: string, name: string) => {
    setSelectedComponents((prev) => {
      const exists = prev.find((c) => c.id === id);
      if (exists) return prev.filter((c) => c.id !== id);
      return [...prev, { id, name }];
    });
  }, []);

  const generatedCode = useMemo(() => {
    if (selectedComponents.length === 0) return "// Select components to generate code";

    const imports = selectedComponents
      .map(
        (c) =>
          `import ${c.name.replace(/\s+/g, "")} from '@/components/ui/${c.name.replace(/\s+/g, "")}'`,
      )
      .join("\n");

    const jsx = selectedComponents
      .map((c) => {
        const comp = components.find((x) => x.id === c.id);
        return comp?.code || `<${c.name.replace(/\s+/g, "")} />`;
      })
      .join("\n\n  ");

    return `${imports}

export default function MyPage() {
  return (
    <div className="flex flex-col gap-6 p-8">
      ${jsx}
    </div>
  )
}`;
  }, [selectedComponents]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setSelectedComponents([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-16 flex min-h-screen">
        {/* Main Area */}
        <main className="flex-1 flex flex-col lg:flex-row">
          {/* Preview + Editor */}
          <div className="flex-1 flex flex-col">
            {/* Preview Area */}
            <div className="flex-1 min-h-[50vh] border-b border-border">
              <div className="h-full flex flex-col">
                <div className="px-6 py-3 bg-white border-b border-border flex items-center justify-between">
                  <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
                    Live Preview
                  </span>
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                  </div>
                </div>

                <div className="flex-1 bg-white grid-bg p-8 overflow-auto">
                  {selectedComponents.length === 0 ? (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-text-muted text-lg mb-2">
                          No components selected
                        </p>
                        <p className="text-text-muted text-sm">
                          Select components from the right panel to preview
                          them.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col gap-8"
                    >
                      {selectedComponents.map((sc) => (
                        <div key={sc.id}>
                          <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-3">
                            {sc.name}
                          </p>
                          <ComponentPreview id={sc.id} />
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Code Editor Area */}
            <div className="h-[40vh] flex flex-col">
              <div className="px-6 py-2 bg-code-bg border-b border-gray-800 flex items-center justify-between">
                <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                  Generated Code
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1 text-xs text-gray-400 hover:text-cyan-glow transition-colors"
                    aria-label="Copy code"
                  >
                    {copied ? (
                      <>
                        <Check size={14} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        Copy
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 px-3 py-1 text-xs text-gray-400 hover:text-white transition-colors"
                    aria-label="Reset"
                  >
                    <RotateCcw size={14} />
                    Reset
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-auto">
                <CodeBlock
                  code={generatedCode}
                  language="tsx"
                  showLineNumbers
                />
              </div>
            </div>
          </div>

          {/* Component List Sidebar */}
          <aside className="w-full lg:w-72 shrink-0 bg-white border-l border-border order-first lg:order-last">
            <div className="p-6 sticky top-16">
              <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">
                Add Components
              </h2>

              {/* Search */}
              <div className="relative mb-4">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-border pl-9 pr-4 py-2 text-sm clip-btn focus:border-cyan-border focus:outline-none transition-all"
                />
              </div>

              {/* Component Checkboxes */}
              <div className="space-y-1 max-h-[60vh] overflow-y-auto">
                {filteredList.map((c) => {
                  const isSelected = selectedComponents.some(
                    (sc) => sc.id === c.id,
                  );
                  return (
                    <label
                      key={c.id}
                      className={`flex items-center gap-3 px-3 py-2 text-sm cursor-pointer transition-colors rounded-sm ${
                        isSelected
                          ? "bg-cyan-hover text-text-primary"
                          : "hover:bg-gray-50 text-text-muted"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleComponent(c.id, c.name)}
                        className="w-4 h-4 accent-yellow-400"
                      />
                      <span className="font-medium">{c.name}</span>
                      <span className="text-xs text-text-muted ml-auto capitalize">
                        {c.category}
                      </span>
                    </label>
                  );
                })}
              </div>

              {/* Selected count */}
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-text-muted">
                  {selectedComponents.length} component
                  {selectedComponents.length !== 1 ? "s" : ""} selected
                </p>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}

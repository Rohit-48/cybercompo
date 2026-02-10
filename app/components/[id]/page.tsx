"use client";

import { useState, useMemo } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import ComponentPreview from "@/components/showcase/ComponentPreview";
import CodeBlock from "@/components/showcase/CodeBlock";
import CyberTabs from "@/components/ui/CyberTabs";
import { getComponent, components, categories } from "@/lib/componentData";

export default function ComponentDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const component = getComponent(id);

  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedVariant, setSelectedVariant] = useState(
    component?.variants?.[0] || "",
  );
  const [customProps, setCustomProps] = useState<Record<string, unknown>>({});

  if (!component) {
    notFound();
  }

  // Find prev/next components
  const currentIndex = components.findIndex((c) => c.id === id);
  const prevComponent = currentIndex > 0 ? components[currentIndex - 1] : null;
  const nextComponent =
    currentIndex < components.length - 1 ? components[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-16 flex min-h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden xl:block w-64 shrink-0 fixed top-16 bottom-0 left-0 z-30">
          <Sidebar
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 xl:ml-64">
          <div className="max-w-[1200px] mx-auto p-6 sm:p-8">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-sm text-text-muted mb-6"
            >
              <Link
                href="/components"
                className="hover:text-text-primary transition-colors"
              >
                Components
              </Link>
              <span>/</span>
              <span className="text-text-primary font-medium">
                {component.name}
              </span>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
                  {component.name}
                </h1>
                <span className="text-xs font-mono text-text-muted px-2 py-0.5 border border-border bg-white clip-btn uppercase">
                  {component.category}
                </span>
              </div>
              <p className="text-text-muted">{component.description}</p>
            </motion.div>

            {/* Layout: Preview + Code Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Preview Area */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-3"
              >
                {/* Preview Canvas */}
                <div className="bg-white border border-border clip-tr">
                  <div className="px-5 py-3 border-b border-border flex items-center justify-between">
                    <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
                      Live Preview
                    </span>
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                      <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                      <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                    </div>
                  </div>
                  <div className="p-8 min-h-[300px] flex items-center justify-center bg-[#fafafa] dot-bg">
                    <ComponentPreview
                      id={component.id}
                      variant={selectedVariant}
                      props={customProps}
                    />
                  </div>
                </div>

                {/* Variant Selector */}
                {component.variants && component.variants.length > 0 && (
                  <div className="mt-4 bg-white border border-border p-4">
                    <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-3">
                      Variants
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {component.variants.map((v) => (
                        <button
                          key={v}
                          onClick={() => setSelectedVariant(v)}
                          className={`px-4 py-1.5 text-sm font-medium clip-btn transition-all duration-150 ${
                            selectedVariant === v
                              ? "bg-text-primary text-white"
                              : "bg-white text-text-primary border border-border hover:bg-gray-50"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Props Controller */}
                {component.id === "button" && (
                  <div className="mt-4 bg-white border border-border p-4">
                    <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-3">
                      Props
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs text-text-muted block mb-1">
                          Size
                        </label>
                        <div className="flex gap-1">
                          {["sm", "md", "lg"].map((s) => (
                            <button
                              key={s}
                              onClick={() =>
                                setCustomProps((p) => ({ ...p, size: s }))
                              }
                              className={`px-3 py-1 text-xs font-medium clip-btn transition-all ${
                                (customProps.size || "md") === s
                                  ? "bg-text-primary text-white"
                                  : "bg-gray-100 text-text-primary hover:bg-gray-200"
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-text-muted block mb-1">
                          Loading
                        </label>
                        <button
                          onClick={() =>
                            setCustomProps((p) => ({
                              ...p,
                              loading: !p.loading,
                            }))
                          }
                          className={`px-3 py-1 text-xs font-medium clip-btn transition-all ${
                            customProps.loading
                              ? "bg-cyan-glow text-text-primary"
                              : "bg-gray-100 text-text-primary hover:bg-gray-200"
                          }`}
                        >
                          {customProps.loading ? "ON" : "OFF"}
                        </button>
                      </div>
                      <div>
                        <label className="text-xs text-text-muted block mb-1">
                          Disabled
                        </label>
                        <button
                          onClick={() =>
                            setCustomProps((p) => ({
                              ...p,
                              disabled: !p.disabled,
                            }))
                          }
                          className={`px-3 py-1 text-xs font-medium clip-btn transition-all ${
                            customProps.disabled
                              ? "bg-cyan-glow text-text-primary"
                              : "bg-gray-100 text-text-primary hover:bg-gray-200"
                          }`}
                        >
                          {customProps.disabled ? "ON" : "OFF"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Code Panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="lg:col-span-2"
              >
                <div className="bg-white border border-border clip-tr sticky top-20">
                  <CyberTabs
                    tabs={[
                      {
                        id: "code",
                        label: "Code",
                        content: (
                          <CodeBlock
                            code={component.code}
                            language="tsx"
                            showLineNumbers={false}
                          />
                        ),
                      },
                      {
                        id: "props",
                        label: "Props",
                        content: (
                          <div className="p-4">
                            <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-4">
                              Props API
                            </p>
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="border-b border-border">
                                    <th className="text-left py-2 pr-4 font-medium text-text-primary">
                                      Prop
                                    </th>
                                    <th className="text-left py-2 pr-4 font-medium text-text-primary">
                                      Type
                                    </th>
                                    <th className="text-left py-2 font-medium text-text-primary">
                                      Default
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {component.props.map((prop) => (
                                    <tr
                                      key={prop.name}
                                      className="border-b border-border/50"
                                    >
                                      <td className="py-2 pr-4 font-mono text-xs text-cyan-glow">
                                        {prop.name}
                                      </td>
                                      <td className="py-2 pr-4 font-mono text-xs text-text-muted">
                                        {prop.type}
                                      </td>
                                      <td className="py-2 font-mono text-xs text-text-muted">
                                        {prop.default}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ),
                      },
                      {
                        id: "usage",
                        label: "Usage",
                        content: (
                          <div className="p-4">
                            <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-3">
                              Installation
                            </p>
                            <CodeBlock
                              code={`npm install @cyberpunk-ui/${component.id}`}
                              language="bash"
                              showLineNumbers={false}
                            />
                            <p className="text-xs font-mono text-text-muted uppercase tracking-wider mt-6 mb-3">
                              Basic Usage
                            </p>
                            <CodeBlock
                              code={component.usage}
                              language="tsx"
                              showLineNumbers={false}
                            />
                          </div>
                        ),
                      },
                    ]}
                  />
                </div>
              </motion.div>
            </div>

            {/* Prev/Next navigation */}
            <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
              {prevComponent ? (
                <Link
                  href={`/components/${prevComponent.id}`}
                  className="flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors"
                >
                  <ArrowLeft size={16} />
                  {prevComponent.name}
                </Link>
              ) : (
                <div />
              )}
              {nextComponent ? (
                <Link
                  href={`/components/${nextComponent.id}`}
                  className="flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors"
                >
                  {nextComponent.name}
                  <ArrowRight size={16} />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
}

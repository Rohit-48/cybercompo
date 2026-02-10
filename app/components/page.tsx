"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import ComponentCard from "@/components/showcase/ComponentCard";
import { categories, filterComponents } from "@/lib/componentData";
import { Menu, X } from "lucide-react";

function ComponentsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = useMemo(
    () => filterComponents(activeCategory, searchQuery),
    [activeCategory, searchQuery],
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-16 flex min-h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 shrink-0 fixed top-16 bottom-0 left-0 z-30">
          <Sidebar
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={(slug) => {
              setActiveCategory(slug);
              setSidebarOpen(false);
            }}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Mobile Sidebar Toggle */}
        <button
          className="lg:hidden fixed bottom-6 right-6 z-40 w-12 h-12 bg-text-primary text-white flex items-center justify-center shadow-lg clip-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <>
            <div
              className="lg:hidden fixed inset-0 z-30 bg-overlay"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="lg:hidden fixed top-16 left-0 bottom-0 z-40 w-72">
              <Sidebar
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={(slug) => {
                  setActiveCategory(slug);
                  setSidebarOpen(false);
                }}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>
          </>
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-6 sm:p-8">
          <div className="max-w-[1200px] mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
                Components
              </h1>
              <p className="text-text-muted mt-2">
                {filtered.length} component{filtered.length !== 1 ? "s" : ""}{" "}
                available
                {activeCategory !== "all" && (
                  <span>
                    {" "}
                    in{" "}
                    <span className="font-medium text-text-primary">
                      {activeCategory}
                    </span>
                  </span>
                )}
              </p>
            </motion.div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((component, index) => (
                  <ComponentCard
                    key={component.id}
                    component={component}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-text-muted text-lg">No components found.</p>
                <p className="text-text-muted text-sm mt-2">
                  Try adjusting your search or category filter.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      <div className="lg:ml-64">
        <Footer />
      </div>
    </div>
  );
}

export default function ComponentsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-text-muted">Loading components...</div>
        </div>
      }
    >
      <ComponentsContent />
    </Suspense>
  );
}

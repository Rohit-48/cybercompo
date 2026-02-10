"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Search, ChevronDown, ChevronRight } from "lucide-react";

interface SidebarCategory {
  name: string;
  slug: string;
  count: number;
  subcategories?: { name: string; slug: string }[];
}

interface SidebarProps {
  categories: SidebarCategory[];
  activeCategory?: string;
  onCategoryChange?: (slug: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export default function Sidebar({
  categories,
  activeCategory = "all",
  onCategoryChange,
  searchQuery = "",
  onSearchChange,
}: SidebarProps) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    usable: true,
    experimental: true,
  });

  const toggleExpand = (slug: string) => {
    setExpanded((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  return (
    <aside className="w-full h-full bg-white border-r border-border overflow-y-auto">
      <div className="p-6">
        <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-6">
          Components
        </h2>

        {/* Search */}
        <div className="relative mb-6">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-full bg-white border border-border pl-9 pr-4 py-2.5 text-sm clip-btn focus:border-cyan-border focus:shadow-[0_0_0_3px_rgba(255,214,10,0.1)] focus:outline-none transition-all placeholder:text-text-muted/50"
          />
        </div>

        {/* Categories */}
        <div className="space-y-1">
          <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-3">
            Categories
          </h3>

          {categories.map((cat) => (
            <div key={cat.slug}>
              <button
                onClick={() => {
                  onCategoryChange?.(cat.slug);
                  if (cat.subcategories) toggleExpand(cat.slug);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-sm transition-all duration-150 ${
                  activeCategory === cat.slug
                    ? "text-cyan-glow bg-cyan-hover border-l-[3px] border-cyan-glow"
                    : "text-text-primary hover:bg-gray-50"
                }`}
              >
                <span className="flex items-center gap-2">
                  {cat.subcategories &&
                    (expanded[cat.slug] ? (
                      <ChevronDown size={14} />
                    ) : (
                      <ChevronRight size={14} />
                    ))}
                  {cat.name}
                </span>
                <span className="text-xs text-text-muted">({cat.count})</span>
              </button>

              {/* Subcategories */}
              {cat.subcategories && expanded[cat.slug] && (
                <div className="ml-6 mt-1 space-y-0.5">
                  {cat.subcategories.map((sub) => (
                    <button
                      key={sub.slug}
                      onClick={() => onCategoryChange?.(sub.slug)}
                      className={`w-full text-left px-3 py-1.5 text-sm transition-colors duration-150 ${
                        activeCategory === sub.slug
                          ? "text-cyan-glow border-l-[3px] border-cyan-glow bg-cyan-hover"
                          : "text-text-muted hover:text-text-primary"
                      }`}
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

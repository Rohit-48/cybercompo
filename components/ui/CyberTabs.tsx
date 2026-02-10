"use client";

import { useState, ReactNode } from "react";

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface CyberTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

export default function CyberTabs({
  tabs,
  defaultTab,
  className = "",
}: CyberTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const activeContent = tabs.find((t) => t.id === activeTab)?.content;

  return (
    <div className={className}>
      {/* Tab headers */}
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-sm font-medium transition-all duration-150 clip-btn ${
              activeTab === tab.id
                ? "bg-text-primary text-white"
                : "bg-white text-text-primary hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-0">{activeContent}</div>
    </div>
  );
}

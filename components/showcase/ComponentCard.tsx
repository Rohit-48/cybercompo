"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ComponentData } from "@/lib/componentData";
import ComponentPreview from "./ComponentPreview";

interface ComponentCardProps {
  component: ComponentData;
  index: number;
}

export default function ComponentCard({
  component,
  index,
}: ComponentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link href={`/components/${component.id}`} className="block group">
        <div className="clip-tr bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,214,10,0.3)] hover:-translate-y-1">
          {/* Preview */}
          <div className="bg-[#fafafa] p-6 border-b border-border min-h-[140px] flex items-center justify-center dot-bg">
            <ComponentPreview id={component.id} compact />
          </div>

          {/* Info */}
          <div className="p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold text-text-primary">
                {component.name}
              </h3>
              <span className="text-xs font-mono text-text-muted uppercase">
                {component.category}
              </span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed mb-3">
              {component.description}
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-cyan-glow group-hover:gap-2 transition-all">
              View Details
              <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

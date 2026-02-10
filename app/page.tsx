"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Accessibility,
  Moon,
  Copy,
  Eye,
  Palette,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { components } from "@/lib/componentData";

const categoryCards = [
  {
    number: "01",
    title: "USABLE COMPONENTS",
    description:
      "Production-ready UI components for modern web applications. Battle-tested and fully accessible.",
    count: components.filter((c) => c.category === "usable").length,
    link: "/components?category=usable",
  },
  {
    number: "02",
    title: "EXPERIMENTAL COMPONENTS",
    description:
      "Cutting-edge effects and animations. Push boundaries with glitch text, scan lines, and more.",
    count: components.filter((c) => c.category === "experimental").length,
    link: "/components?category=experimental",
  },
  {
    number: "03",
    title: "PLAYGROUND",
    description:
      "Interactive sandbox to mix and match components. Experiment, preview, and export code in real-time.",
    count: null,
    link: "/playground",
  },
];

const features = [
  { icon: Code2, text: "TypeScript Support" },
  { icon: Accessibility, text: "Fully Accessible (WCAG AA)" },
  { icon: Moon, text: "Dark Mode Ready" },
  { icon: Copy, text: "Copy-Paste Code" },
  { icon: Eye, text: "Live Preview" },
  { icon: Palette, text: "Customizable" },
];

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="absolute inset-0 grid-bg" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-3xl mx-auto px-6 text-center"
        >
          <div className="inline-block mb-6">
            <span className="font-mono text-xs tracking-[0.3em] text-text-muted uppercase bg-white px-4 py-2 border border-border clip-btn">
              React Component Library
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text-primary leading-[1.1] mb-6">
            CYBERPUNK
            <br />
            <span className="text-text-muted">COMPONENT LIBRARY</span>
          </h1>

          <p className="text-lg sm:text-xl text-text-muted max-w-xl mx-auto leading-relaxed mb-10">
            A collection of minimal, cyberpunk-styled React components built
            with Tailwind CSS and modern web standards.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/components"
              className="inline-flex items-center gap-2 px-8 py-3 bg-text-primary text-white font-medium text-sm clip-btn transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,214,10,0.3)] hover:-translate-y-0.5"
            >
              Browse Components
              <ArrowRight size={16} />
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-text-primary font-medium text-sm border border-text-primary clip-btn transition-all duration-200 hover:bg-cyan-hover hover:-translate-y-0.5"
            >
              View on GitHub
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 flex items-center justify-center gap-12">
            <div className="text-center">
              <p className="text-2xl font-bold font-mono text-text-primary">
                {components.length}
              </p>
              <p className="text-xs text-text-muted uppercase tracking-wider mt-1">
                Components
              </p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold font-mono text-text-primary">
                TS
              </p>
              <p className="text-xs text-text-muted uppercase tracking-wider mt-1">
                TypeScript
              </p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold font-mono text-text-primary">
                A11y
              </p>
              <p className="text-xs text-text-muted uppercase tracking-wider mt-1">
                Accessible
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Category Cards Section */}
      <section className="py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
              Explore
            </h2>
            <p className="text-text-muted mt-2">
              Browse our categorized collection of components.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {categoryCards.map((card) => (
              <motion.div key={card.number} variants={fadeUp}>
                <Link href={card.link} className="block group">
                  <div className="relative bg-white clip-tr p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,214,10,0.3)] hover:scale-[1.02] hover:-translate-y-1 h-full">
                    <span className="absolute top-6 right-8 text-sm font-mono text-text-muted">
                      {card.number}
                    </span>
                    <h3 className="text-lg font-bold text-text-primary mb-3 tracking-wide">
                      {card.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed mb-6">
                      {card.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-glow group-hover:gap-3 transition-all">
                      {card.count !== null
                        ? `${card.count} Components`
                        : "Try Now"}
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
              Features
            </h2>
            <p className="text-text-muted mt-2">
              Built with developer experience in mind.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.text}
                variants={fadeUp}
                className="flex items-start gap-4 p-6 border border-border clip-btn bg-background/50"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-cyan-hover text-cyan-glow shrink-0">
                  <feature.icon size={20} />
                </div>
                <div>
                  <p className="font-semibold text-text-primary">
                    {feature.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
              Ready to build?
            </h2>
            <p className="text-text-muted mb-8">
              Start browsing components or jump into the playground.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/components"
                className="inline-flex items-center gap-2 px-8 py-3 bg-text-primary text-white font-medium text-sm clip-btn transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,214,10,0.3)] hover:-translate-y-0.5"
              >
                Browse Components
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/playground"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-text-primary font-medium text-sm border border-text-primary clip-btn transition-all duration-200 hover:bg-cyan-hover hover:-translate-y-0.5"
              >
                Open Playground
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

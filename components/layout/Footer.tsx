import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-text-primary text-white border-t border-cyan-glow/30">
      <div className="mx-auto max-w-[1400px] px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <span className="font-mono text-lg font-bold tracking-tight">
              CYBERPUNK<span className="text-text-muted">/</span>UI
            </span>
            <p className="mt-3 text-sm text-gray-400 max-w-xs">
              A collection of minimal, cyberpunk-styled React components built
              with Tailwind CSS and modern web standards.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Resources
            </h4>
            <div className="flex flex-col gap-2">
              <Link
                href="/docs"
                className="text-sm text-gray-300 hover:text-cyan-glow transition-colors"
              >
                Documentation
              </Link>
              <Link
                href="/components"
                className="text-sm text-gray-300 hover:text-cyan-glow transition-colors"
              >
                Components
              </Link>
              <Link
                href="/playground"
                className="text-sm text-gray-300 hover:text-cyan-glow transition-colors"
              >
                Playground
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Community
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-300 hover:text-cyan-glow transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-300 hover:text-cyan-glow transition-colors"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Cyberpunk UI. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Built with React + Next.js + Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

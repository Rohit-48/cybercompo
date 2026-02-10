"use client";

import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export default function CodeBlock({
  code,
  language = "tsx",
  showLineNumbers = true,
  className = "",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative group ${className}`}>
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-sm transition-all duration-200 bg-white/10 hover:bg-white/20 text-gray-400 hover:text-cyan-glow"
        aria-label="Copy code"
      >
        {copied ? (
          <>
            <Check size={14} className="text-cyan-glow" />
            <span className="text-cyan-glow">Copied!</span>
          </>
        ) : (
          <>
            <Copy size={14} />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">
              Copy
            </span>
          </>
        )}
      </button>

      <Highlight theme={themes.vsDark} code={code.trim()} language={language}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className="code-block overflow-x-auto p-5 text-sm leading-relaxed"
            style={{
              ...style,
              background: "#1a1a1a",
              margin: 0,
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })} className="table-row">
                {showLineNumbers && (
                  <span className="table-cell pr-4 text-right text-gray-600 select-none w-8 text-xs">
                    {i + 1}
                  </span>
                )}
                <span className="table-cell">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}

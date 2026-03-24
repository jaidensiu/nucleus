"use client";

import { useState } from "react";
import { primitiveColors } from "./tokens";
import pkg from "@jaidensiu/nucleus/package.json";

const TOKENS_VERSION = pkg.version;
const GITHUB_URL = "https://github.com/jaidensiu/nucleus";

function ColorCard({
  groupName,
  name,
  value,
}: {
  groupName: string;
  name: string;
  value: string;
}) {
  const [copied, setCopied] = useState(false);
  const groupKey = groupName.replace(/\s+/g, "");
  const fullName = groupName === "Other" ? name : `${groupKey.charAt(0).toLowerCase() + groupKey.slice(1)}.${name}`;
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      className="group flex items-center gap-3 rounded-lg border border-border px-3 py-2.5 hover:bg-surface transition-colors cursor-pointer text-left w-full"
    >
      <div
        className="h-10 w-10 rounded-md border border-black/10 shrink-0"
        style={{ backgroundColor: value }}
      />
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium truncate">{fullName}</div>
        <div className="text-xs font-mono text-muted">{value}</div>
      </div>
      <span className="shrink-0 text-xs font-mono text-muted opacity-0 group-hover:opacity-100 transition-opacity">
        {copied ? "Copied!" : "Click to copy"}
      </span>
    </button>
  );
}

function ColorsSection() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-xl font-semibold mb-1">Primitive Colors</h2>
        <p className="text-sm text-muted mb-6">
          Theme-agnostic base palette.
        </p>
        {primitiveColors.map((group) => (
          <div key={group.name} className="mb-8">
            <div className="mb-3">
              <h3 className="text-sm font-semibold tracking-wider">
                {group.name}
              </h3>
              <p className="text-xs text-muted">{group.colors.length} colors</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {group.colors.map((c) => (
                <ColorCard
                  key={c.name}
                  groupName={group.name}
                  name={c.name}
                  value={c.value}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="mx-auto max-w-5xl px-6 py-4">
          <h1 className="text-lg font-semibold tracking-tight">
            Nucleus
          </h1>
          <p className="text-xs text-muted">
            Design tokens reference &middot; v{TOKENS_VERSION} &middot;{" "}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </p>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">
        <ColorsSection />
      </main>
      <footer className="border-t border-border mt-16">
        <div className="mx-auto max-w-5xl px-6 py-6 text-xs text-muted text-center">
          Nucleus &mdash; Design tokens for Android, iOS, and Web
          <br />
          v{TOKENS_VERSION} &middot;{" "}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}

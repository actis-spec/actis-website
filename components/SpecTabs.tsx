"use client";

import { useState } from "react";
import { Markdown } from "@/components/Markdown";

type TabId = "part1" | "part2";

export function SpecTabs({
  standardContent,
  compatibilityContent,
}: {
  standardContent: string;
  compatibilityContent: string;
}) {
  const [active, setActive] = useState<TabId>("part1");

  return (
    <div className="mt-8">
      <div
        className="flex border-b border-[#e5e5e5] gap-0"
        role="tablist"
        aria-label="Specification parts"
      >
        <button
          type="button"
          role="tab"
          aria-selected={active === "part1"}
          aria-controls="spec-part1-panel"
          id="spec-part1-tab"
          onClick={() => setActive("part1")}
          className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
            active === "part1"
              ? "border-[#1a1a1a] text-[#1a1a1a]"
              : "border-transparent text-[#666] hover:text-[#1a1a1a]"
          }`}
        >
          Part I — Core Specification
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={active === "part2"}
          aria-controls="spec-part2-panel"
          id="spec-part2-tab"
          onClick={() => setActive("part2")}
          className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
            active === "part2"
              ? "border-[#1a1a1a] text-[#1a1a1a]"
              : "border-transparent text-[#666] hover:text-[#1a1a1a]"
          }`}
        >
          Part II — Compatibility and Verification Algorithms
        </button>
      </div>
      <div
        id="spec-part1-panel"
        role="tabpanel"
        aria-labelledby="spec-part1-tab"
        hidden={active !== "part1"}
        className="prose prose-neutral max-w-none prose-headings:font-semibold prose-headings:text-[#1a1a1a] prose-pre:bg-[#f5f5f5] prose-pre:border prose-pre:border-[#e5e5e5] prose-pre:text-sm prose-table:border-collapse prose-th:border prose-th:border-[#e5e5e5] prose-th:bg-[#fafafa] prose-td:border prose-td:border-[#e5e5e5] pt-6"
      >
        <p className="text-sm text-[#666] mb-6">ACTIS_STANDARD_v1.md</p>
        <Markdown content={standardContent} />
      </div>
      <div
        id="spec-part2-panel"
        role="tabpanel"
        aria-labelledby="spec-part2-tab"
        hidden={active !== "part2"}
        className="prose prose-neutral max-w-none prose-headings:font-semibold prose-headings:text-[#1a1a1a] prose-pre:bg-[#f5f5f5] prose-pre:border prose-pre:border-[#e5e5e5] prose-pre:text-sm prose-table:border-collapse prose-th:border prose-th:border-[#e5e5e5] prose-th:bg-[#fafafa] prose-td:border prose-td:border-[#e5e5e5] pt-6"
      >
        <p className="text-sm text-[#666] mb-6">ACTIS_COMPATIBILITY.md</p>
        <Markdown content={compatibilityContent} />
      </div>
    </div>
  );
}

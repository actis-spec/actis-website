import { readFileSync } from "node:fs";
import { join } from "node:path";
import { DocLayout } from "@/components/DocLayout";
import { Markdown } from "@/components/Markdown";

export default function StartPage() {
  const contentPath = join(process.cwd(), "content", "START_HERE.md");
  const content = readFileSync(contentPath, "utf-8");

  return (
    <DocLayout title="Start Here">
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-[#1a1a1a] mb-3">
          Implementing ACTIS
        </h2>
        <p className="text-[#1a1a1a] mb-4">
          ACTIS implementations follow three steps:
        </p>
        <ol className="list-decimal pl-5 space-y-1 text-[#1a1a1a] mb-6">
          <li>Parse the transcript</li>
          <li>Verify cryptographic integrity</li>
          <li>Produce an ACTIS verification report</li>
        </ol>

        <h3 className="text-base font-semibold text-[#1a1a1a] mb-2">
          Required Inputs
        </h3>
        <ul className="list-disc pl-5 space-y-1 text-[#1a1a1a] mb-6">
          <li>ACTIS transcript</li>
          <li>Evidence bundle (optional)</li>
          <li>ACTIS schema</li>
        </ul>

        <h3 className="text-base font-semibold text-[#1a1a1a] mb-2">
          Example
        </h3>
        <pre className="bg-[#f5f5f5] border border-[#e5e5e5] p-4 rounded text-sm font-mono text-[#1a1a1a] overflow-x-auto">
          actis-verify --zip tv-001-compatible-minimal.zip
        </pre>
      </section>

      <Markdown content={content} />
    </DocLayout>
  );
}

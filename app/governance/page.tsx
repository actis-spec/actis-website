import { readFileSync } from "node:fs";
import { join } from "node:path";
import { DocLayout } from "@/components/DocLayout";
import { Markdown } from "@/components/Markdown";

export default function GovernancePage() {
  const contentPath = join(process.cwd(), "content", "GOVERNANCE.md");
  const content = readFileSync(contentPath, "utf-8");

  return (
    <DocLayout title="Governance">
      <section className="mb-8">
        <p className="text-[#1a1a1a] mb-4">
          ACTIS is maintained by the ACTIS Maintainers.
        </p>
        <p className="text-[#1a1a1a] mb-2">The governance process defines:</p>
        <ul className="list-disc pl-5 space-y-1 text-[#1a1a1a] mb-6">
          <li>specification changes</li>
          <li>versioning policy</li>
          <li>maintainer responsibilities</li>
        </ul>
      </section>
      <Markdown content={content} />
    </DocLayout>
  );
}

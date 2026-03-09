import { readFileSync } from "node:fs";
import { join } from "node:path";
import { DocLayout } from "@/components/DocLayout";
import { Markdown } from "@/components/Markdown";

export default function IPPage() {
  const contentPath = join(process.cwd(), "content", "ACTIS_IP_COMMITMENT.md");
  const content = readFileSync(contentPath, "utf-8");

  return (
    <DocLayout title="IP Commitment">
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-[#1a1a1a] mb-3">
          Patent Non-Assert Commitment
        </h2>
        <p className="text-[#1a1a1a]">
          The ACTIS Maintainers irrevocably commit not to assert patent claims
          necessary to implement the ACTIS v1.x specification.
        </p>
      </section>
      <Markdown content={content} />
    </DocLayout>
  );
}

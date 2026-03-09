import { readFileSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import { SpecTabs } from "@/components/SpecTabs";

const GITHUB_ACTIS_SPEC = "https://github.com/actis-spec/actis";
const GITHUB_DOCS = `${GITHUB_ACTIS_SPEC}/blob/main/docs`;

export default function SpecPage() {
  const standardPath = join(process.cwd(), "content", "ACTIS_STANDARD_v1.md");
  const compatibilityPath = join(
    process.cwd(),
    "content",
    "ACTIS_COMPATIBILITY.md"
  );
  const standardContent = readFileSync(standardPath, "utf-8");
  const compatibilityContent = readFileSync(compatibilityPath, "utf-8");

  return (
    <article className="max-w-content mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold text-[#1a1a1a] mb-2">
        ACTIS v1.0 Specification
      </h1>
      <p className="text-sm text-[#666] mb-6">
        Version 1.0 · Normative
      </p>
      <p className="text-[#1a1a1a] mb-4">
        Part I and Part II below are normative. Examples within them are
        labeled informative.
      </p>
      <p className="text-[#1a1a1a] mb-4">
        The ACTIS specification defines:
      </p>
      <ul className="list-disc pl-5 space-y-1 text-[#1a1a1a] mb-8">
        <li>transcript structure</li>
        <li>verification rules</li>
        <li>report output format</li>
        <li>compatibility requirements</li>
      </ul>
      <p className="text-sm text-[#1a1a1a] mb-8">
        <Link
          href={`${GITHUB_DOCS}/ACTIS_STANDARD_v1.md`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline mr-4"
        >
          View ACTIS_STANDARD_v1.md
        </Link>
        <Link
          href={`${GITHUB_DOCS}/ACTIS_COMPATIBILITY.md`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline mr-4"
        >
          View ACTIS_COMPATIBILITY.md
        </Link>
        <Link
          href={`${GITHUB_DOCS}/ACTIS_CONFORMANCE_MATRIX.md`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Conformance matrix
        </Link>
      </p>
      <SpecTabs
        standardContent={standardContent}
        compatibilityContent={compatibilityContent}
      />
    </article>
  );
}

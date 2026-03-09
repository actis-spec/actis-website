import Link from "next/link";

const GITHUB_ACTIS_RAW =
  "https://github.com/actis-spec/actis/raw/main/test-vectors/generated";

const canonicalVectors = [
  {
    id: "tv-001",
    file: "tv-001-compatible-minimal.zip",
    result: "ACTIS_COMPATIBLE",
    resultClass: "text-emerald-800 bg-emerald-50",
    description: "Minimal valid bundle, all checks pass",
    downloadHref: "/vectors/v1/tv-001-compatible-minimal.zip",
  },
  {
    id: "tv-002",
    file: "tv-002-partial-invalid-signature.zip",
    result: "ACTIS_NONCOMPLIANT",
    resultClass: "text-red-800 bg-red-50",
    description: "Invalid signature on one round",
    downloadHref: "/vectors/v1/tv-002-partial-invalid-signature.zip",
  },
  {
    id: "tv-003",
    file: "tv-003-noncompliant-schema-fail.zip",
    result: "ACTIS_NONCOMPLIANT",
    resultClass: "text-red-800 bg-red-50",
    description: "Wrong transcript_version",
    downloadHref: "/vectors/v1/tv-003-noncompliant-schema-fail.zip",
  },
  {
    id: "tv-004",
    file: "tv-004-noncompliant-hash-chain-break.zip",
    result: "ACTIS_NONCOMPLIANT",
    resultClass: "text-red-800 bg-red-50",
    description: "Hash chain break at round 1",
    downloadHref: "/vectors/v1/tv-004-noncompliant-hash-chain-break.zip",
  },
  {
    id: "tv-005",
    file: "tv-005-noncompliant-checksum-tamper.zip",
    result: "ACTIS_NONCOMPLIANT",
    resultClass: "text-red-800 bg-red-50",
    description: "Checksum tampered post-generation",
    downloadHref: "/vectors/v1/tv-005-noncompliant-checksum-tamper.zip",
  },
  {
    id: "tv-006",
    file: "tv-006-noncompliant-missing-manifest.zip",
    result: "ACTIS_NONCOMPLIANT",
    resultClass: "text-red-800 bg-red-50",
    description: "Missing manifest.json",
    downloadHref: "/vectors/v1/tv-006-noncompliant-missing-manifest.zip",
  },
  {
    id: "tv-007",
    file: "tv-007-compatible-with-failure-event.zip",
    result: "ACTIS_COMPATIBLE",
    resultClass: "text-emerald-800 bg-emerald-50",
    description: "Valid bundle with failure_event",
    downloadHref: "/vectors/v1/tv-007-compatible-with-failure-event.zip",
  },
  {
    id: "tv-008",
    file: "tv-008-partial-zero-signatures.zip",
    result: "ACTIS_NONCOMPLIANT",
    resultClass: "text-red-800 bg-red-50",
    description: "Zero valid signatures",
    downloadHref: "/vectors/v1/tv-008-partial-zero-signatures.zip",
  },
];

const extendedVectors = [
  {
    id: "tv-009",
    file: "tv-009-noncompliant-incorrect-final-hash.zip",
    result: "ACTIS_NONCOMPLIANT",
    resultClass: "text-red-800 bg-red-50",
    description: "Incorrect final_hash",
    downloadHref: `${GITHUB_ACTIS_RAW}/tv-009-noncompliant-incorrect-final-hash.zip`,
    external: true,
  },
  {
    id: "tv-010",
    file: "tv-010-noncompliant-duplicate-core-file.zip",
    result: "ACTIS_NONCOMPLIANT",
    resultClass: "text-red-800 bg-red-50",
    description: "Duplicate core file entry",
    downloadHref: `${GITHUB_ACTIS_RAW}/tv-010-noncompliant-duplicate-core-file.zip`,
    external: true,
  },
  {
    id: "tv-011",
    file: "tv-011-noncompliant-path-traversal.zip",
    result: "ACTIS_NONCOMPLIANT",
    resultClass: "text-red-800 bg-red-50",
    description: "Path traversal entry",
    downloadHref: `${GITHUB_ACTIS_RAW}/tv-011-noncompliant-path-traversal.zip`,
    external: true,
  },
];

type VectorRow = (typeof canonicalVectors)[number] | (typeof extendedVectors)[number];

function VectorTable({ vectors }: { vectors: VectorRow[] }) {
  return (
    <div className="overflow-x-auto mb-10">
      <table className="w-full border-collapse border border-[#e5e5e5]">
        <thead>
          <tr className="bg-[#fafafa]">
            <th
              scope="col"
              className="border border-[#e5e5e5] px-3 py-2 text-left font-semibold text-[#1a1a1a]"
            >
              Vector ID
            </th>
            <th
              scope="col"
              className="border border-[#e5e5e5] px-3 py-2 text-left font-semibold text-[#1a1a1a]"
            >
              Expected Result
            </th>
            <th
              scope="col"
              className="border border-[#e5e5e5] px-3 py-2 text-left font-semibold text-[#1a1a1a]"
            >
              Description
            </th>
            <th
              scope="col"
              className="border border-[#e5e5e5] px-3 py-2 text-left font-semibold text-[#1a1a1a]"
            >
              Download
            </th>
          </tr>
        </thead>
        <tbody>
          {vectors.map((v) => (
            <tr key={v.id} className="border-b border-[#e5e5e5]">
              <td className="border border-[#e5e5e5] px-3 py-2 font-mono text-sm text-[#1a1a1a]">
                {v.id}
              </td>
              <td className="border border-[#e5e5e5] px-3 py-2">
                <span
                  className={`inline-block px-2 py-0.5 rounded text-sm font-mono ${v.resultClass}`}
                >
                  {v.result}
                </span>
              </td>
              <td className="border border-[#e5e5e5] px-3 py-2 text-[#1a1a1a]">
                {v.description}
              </td>
              <td className="border border-[#e5e5e5] px-3 py-2">
                <Link
                  href={v.downloadHref}
                  className="text-sm underline text-[#1a1a1a]"
                  download={!("external" in v && v.external)}
                  target={"external" in v && v.external ? "_blank" : undefined}
                  rel={"external" in v && v.external ? "noopener noreferrer" : undefined}
                >
                  Download
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function VectorsPage() {
  return (
    <div className="max-w-content mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold text-[#1a1a1a] mb-6">
        Test Vectors
      </h1>

      <section className="mb-6">
        <p className="text-[#1a1a1a] font-medium mb-2">
          Canonical ACTIS v1 corpus: tv-001 through tv-008.
        </p>
        <p className="text-[#1a1a1a] font-medium mb-4">
          Additional security-hardening vectors: tv-009 through tv-011.
        </p>
        <p className="text-[#1a1a1a] text-sm mb-4">
          The canonical ACTIS v1 conformance corpus remains tv-001 through
          tv-008. Vectors tv-009 through tv-011 are verifier
          security-hardening tests and future-facing corpus extensions. They are
          published to strengthen implementations without changing ACTIS v1 core
          conformance.
        </p>
        <p className="text-[#1a1a1a] text-sm">
          The{" "}
          <a
            href="https://github.com/actis-spec/actis-verifier-rust"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Rust verifier
          </a>{" "}
          passes the canonical v1 corpus (8/8) and the extended security
          vectors (3/3).
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-[#1a1a1a] mb-3">
          ACTIS v1 canonical corpus
        </h2>
        <p className="text-[#1a1a1a] mb-4">
          ACTIS verifier implementations MUST produce the expected result for all
          eight vectors below to claim ACTIS v1 Verifier Conformance.
        </p>
        <VectorTable vectors={canonicalVectors} />
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-[#1a1a1a] mb-3">
          Extended security vectors
        </h2>
        <p className="text-[#1a1a1a] mb-4">
          Optional security-hardening tests: incorrect final_hash (tv-009),
          duplicate core file entry (tv-010), path traversal entry (tv-011).
          Published in the spec repo for implementers who want to harden
          verifiers beyond the canonical v1 corpus.
        </p>
        <VectorTable vectors={extendedVectors} />
      </section>

      <p className="font-semibold text-[#1a1a1a] mb-3">Corpus artifacts</p>
      <ul className="space-y-2 text-sm text-[#1a1a1a]">
        <li>
          expected_results.json{" "}
          <Link
            href="/vectors/v1/expected_results.json"
            className="underline"
            download
          >
            [Download]
          </Link>
        </li>
        <li>
          MANIFEST.sha256{" "}
          <Link
            href="/vectors/v1/MANIFEST.sha256"
            className="underline"
            download
          >
            [Download]
          </Link>
        </li>
        <li>
          VECTORS_VERSION{" "}
          <Link
            href="/vectors/v1/VECTORS_VERSION"
            className="underline"
            download
          >
            [Download]
          </Link>
        </li>
      </ul>
    </div>
  );
}

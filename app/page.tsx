import Link from "next/link";

const ARTIFACT_BASE = "https://actis.world";

export default function HomePage() {
  return (
    <div className="max-w-content mx-auto px-6 py-16">
      <section className="mb-12">
        <h1 className="text-2xl font-semibold text-[#1a1a1a] mb-1">
          ACTIS
        </h1>
        <p className="text-lg text-[#1a1a1a]">
          Audit-Compliant Transaction Integrity Standard
        </p>
        <p className="text-sm text-[#666] mt-2">Version 1.0.0</p>
      </section>

      <p className="text-lg text-[#1a1a1a] mb-8">
        Vendor-neutral standard for cryptographic integrity verification and
        deterministic replay of transaction evidence.
      </p>

      <div className="border-l-4 border-[#e5e5e5] pl-4 py-2 mb-12 text-[#1a1a1a]">
        <p className="font-medium">
          ACTIS answers one question: &ldquo;Is this evidence cryptographically
          intact and deterministically reproducible?&rdquo;
        </p>
      </div>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-[#1a1a1a] mb-4">
          What ACTIS Guarantees
        </h2>
        <p className="text-[#1a1a1a] mb-3">
          ACTIS provides a deterministic, offline-verifiable method to confirm:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-[#1a1a1a]">
          <li>A transaction transcript is structurally valid</li>
          <li>The transcript&apos;s cryptographic hash chain is intact</li>
          <li>All signatures verify against the recorded envelope hashes</li>
          <li>Deterministic replay produces the same final hash</li>
          <li>The evidence bundle has not been modified</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-[#1a1a1a] mb-4">
          Independent Implementations
        </h2>
        <p className="text-[#1a1a1a] mb-3">
          ACTIS v1.0 currently has multiple implementations.
        </p>
        <ul className="list-disc pl-5 space-y-1 text-[#1a1a1a]">
          <li>
            <a
              href="https://github.com/actis-spec/actis-verifier-rust"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Rust verifier
            </a>
          </li>
        </ul>
        <p className="text-sm text-[#666] mt-3">
          Additional implementations are encouraged and may be listed here.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-[#1a1a1a] mb-4">
          Specification Artifacts
        </h2>
        <ul className="space-y-2 text-[#1a1a1a]">
          <li>
            <span className="font-medium">Specification</span>{" "}
            <Link href="/spec" className="underline">
              {ARTIFACT_BASE}/spec
            </Link>
          </li>
          <li>
            <span className="font-medium">Transcript Schema</span>{" "}
            <Link href="/schemas" className="underline">
              {ARTIFACT_BASE}/schemas
            </Link>
          </li>
          <li>
            <span className="font-medium">Test Vector Corpus</span>{" "}
            <Link href="/vectors" className="underline">
              {ARTIFACT_BASE}/vectors
            </Link>
          </li>
          <li>
            <span className="font-medium">Governance</span>{" "}
            <Link href="/governance" className="underline">
              {ARTIFACT_BASE}/governance
            </Link>
          </li>
          <li>
            <span className="font-medium">IP Commitment</span>{" "}
            <Link href="/ip" className="underline">
              {ARTIFACT_BASE}/ip
            </Link>
          </li>
        </ul>
      </section>

      <nav className="flex flex-wrap gap-x-6 gap-y-2 mb-12 text-sm" aria-label="Quick links">
        <Link href="/spec" className="text-[#1a1a1a] underline hover:no-underline">
          Read the spec →
        </Link>
        <Link href="/start" className="text-[#1a1a1a] underline hover:no-underline">
          Start here →
        </Link>
        <Link href="/schemas" className="text-[#1a1a1a] underline hover:no-underline">
          Download schema →
        </Link>
        <Link href="/vectors" className="text-[#1a1a1a] underline hover:no-underline">
          View test vectors →
        </Link>
      </nav>

      <dl className="space-y-8 text-[#1a1a1a]">
        <div>
          <dt className="font-semibold mb-2">What ACTIS proves</dt>
          <dd className="space-y-1 text-sm">
            <ul className="list-disc pl-5 space-y-1">
              <li>Integrity of evidence bundles</li>
              <li>Hash-chain correctness</li>
              <li>Signature validity</li>
              <li>Deterministic replay</li>
            </ul>
          </dd>
        </div>
        <div>
          <dt className="font-semibold mb-2">What ACTIS does not do</dt>
          <dd className="space-y-1 text-sm">
            <ul className="list-disc pl-5 space-y-1">
              <li>Adjudication or blame assignment</li>
              <li>Settlement or payment rails</li>
              <li>Reputation or risk scoring</li>
              <li>Compliance certification</li>
            </ul>
          </dd>
        </div>
        <div>
          <dt className="font-semibold mb-2">Implementation resources</dt>
          <dd className="space-y-1 text-sm">
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <Link href="/spec" className="underline">Standard</Link> — normative specification
              </li>
              <li>
                <Link href="/spec" className="underline">Compatibility rules</Link> — conformance levels and decision tree
              </li>
              <li>
                <Link href="/schemas" className="underline">Schema</Link> — transcript JSON schema
              </li>
              <li>
                <Link href="/vectors" className="underline">Test vectors</Link> — conformance test corpus
              </li>
              <li>
                <Link href="/governance" className="underline">Governance</Link> — versioning and change process
              </li>
              <li>
                <Link href="/ip" className="underline">IP commitment</Link> — patent non-assert and contribution license
              </li>
            </ul>
          </dd>
        </div>
      </dl>
    </div>
  );
}

import Link from "next/link";

export default function SchemasPage() {
  return (
    <div className="max-w-content mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold text-[#1a1a1a] mb-6">
        ACTIS Transcript Schema
      </h1>
      <p className="text-sm text-[#666] mb-6">Version: actis.transcript.v1</p>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-[#1a1a1a] mb-2">
          Schema Identifier
        </h2>
        <pre className="bg-[#f5f5f5] border border-[#e5e5e5] p-4 rounded text-sm font-mono text-[#1a1a1a] mb-2">
          {`$schema_id: actis-transcript/1.0`}
        </pre>
        <p className="text-[#1a1a1a] text-sm">
          This schema defines the structure of ACTIS transcripts.
        </p>
      </section>

      <p className="text-[#1a1a1a] mb-4">
        Schema validation is required before performing ACTIS verification.
      </p>

      <p className="text-[#1a1a1a] mb-8">
        ACTIS v1.0 implementations validate transcripts against this schema. The
        schema is the canonical machine-readable definition of the
        actis-transcript/1.0 format.
      </p>
      <pre className="bg-[#f5f5f5] border border-[#e5e5e5] p-4 rounded text-sm font-mono text-[#1a1a1a] mb-8">
        {`"$id": "actis-transcript/1.0/schema.json"`}
      </pre>
      <p className="mb-2">
        <Link
          href="/schemas/actis_transcript_v1.json"
          className="text-[#1a1a1a] underline hover:no-underline"
          download
        >
          Download actis_transcript_v1.json →
        </Link>
      </p>
      <p className="text-sm text-[#666]">
        SHA-256: [leave blank — to be filled in before deployment]
      </p>
    </div>
  );
}

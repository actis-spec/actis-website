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
        <pre className="bg-emerald-50/80 border border-emerald-200 p-4 rounded text-sm font-mono text-[#1a1a1a] mb-2">
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
      <pre className="bg-emerald-50/80 border border-emerald-200 p-4 rounded text-sm font-mono text-[#1a1a1a] mb-8">
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
      <p className="text-sm text-[#666] mb-2">
        Canonical source:{" "}
        <Link
          href="https://github.com/actis-spec/actis/blob/main/schemas/actis_transcript_v1.json"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:no-underline"
        >
          github.com/actis-spec/actis (schemas/actis_transcript_v1.json)
        </Link>
      </p>
      <p className="text-sm text-[#666] mb-1">
        The digest below is the SHA-256 of the downloadable file on this page.
      </p>
      <p className="text-sm text-[#666] font-mono">
        SHA-256: 16a758d1eb9803eeb124acef7875f354210d887381b0c7f6e12f0760fffbd216
      </p>
    </div>
  );
}

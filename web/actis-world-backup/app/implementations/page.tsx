import Link from "next/link";

export default function ImplementationsPage() {
  return (
    <div className="max-w-content mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold text-[#1a1a1a] mb-8">
        ACTIS Implementations
      </h1>
      <p className="text-[#1a1a1a] mb-8">
        Independent implementations of ACTIS.
      </p>
      <ul className="space-y-4 text-[#1a1a1a]">
        <li>
          <span className="font-medium">Rust</span>{" "}
          <a
            href="https://github.com/actis-spec/actis-verifier-rust"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            https://github.com/actis-spec/actis-verifier-rust
          </a>
        </li>
      </ul>
      <p className="text-sm text-[#666] mt-6">
        Additional implementations may be listed here.
      </p>
    </div>
  );
}

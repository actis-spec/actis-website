# ACTIS/v1 — Composite Profile

**Profile name:** `composite`
**Status:** Draft
**Use case:** Parent bundles that reference multiple child bundles, each in any ACTIS profile. Used when a top-level outcome or decision depends on evidence from multiple independent sub-processes that were each recorded as separate ACTIS bundles.

---

## Concept

A composite bundle is a bundle whose content is a set of references to other ACTIS bundles (sub-bundles), plus a top-level decision or outcome. The composite bundle's integrity guarantee: if `composite_hash` is valid and all referenced sub-bundle `final_hash` values are independently verifiable, then every sub-bundle was unmodified at the time of sealing.

A composite bundle does not contain the sub-bundle transcripts inline. It references them by `bundle_id` and `final_hash`. Verifiers MUST independently retrieve and verify each sub-bundle.

---

## Composite Hash Computation

```
composite_hash = sha256(
  sub_bundle_refs[0].final_hash ||
  sub_bundle_refs[1].final_hash ||
  ...
  sub_bundle_refs[n].final_hash ||
  top_level_decision
)
```

Where `||` denotes concatenation. Sub-bundle refs are sorted in lexicographic order of `bundle_id` before hashing. This makes `composite_hash` deterministic and independently recomputable by any party that holds all sub-bundle `final_hash` values.

Formally:

```
inputs = sort_by_bundle_id(sub_bundle_refs)
         .map(r => r.final_hash)
         .join("")
         + top_level_decision

composite_hash = hex(sha256(utf8(inputs)))
```

---

## Round Types

| Round Type      | Description |
|----------------|-------------|
| BUNDLE_REF      | References a child bundle. Fields: `bundle_id` (string), `final_hash` (hex sha256), `profile` (ACTIS profile name of the child bundle), `role` (string — describes the child bundle's function in the composite, e.g. `"evidence"`, `"approval"`, `"assessment"`). |
| COMPOSITE_SEAL  | Final round. Contains `composite_hash`, `top_level_decision` (string), and `bundle_ids` (array of all referenced `bundle_id` values). MUST be signed by the party asserting the composite outcome. |

---

## Required Header Fields (in addition to base ACTIS)

```json
{
  "actis_profile": "composite",
  "composite_id": "string — unique identifier for this composite bundle"
}
```

Additional domain-specific header fields (e.g. `case_id`, `workflow_id`) MAY be included and are treated as additive by verifiers.

---

## Validation Rules

1. A composite transcript MUST contain at least one `BUNDLE_REF` round before `COMPOSITE_SEAL`.
2. `COMPOSITE_SEAL` MUST be the final round in the transcript.
3. The `bundle_ids` array in `COMPOSITE_SEAL` MUST exactly match the set of `bundle_id` values in all `BUNDLE_REF` rounds.
4. `composite_hash` MUST be recomputable from the `final_hash` values in `BUNDLE_REF` rounds and `top_level_decision`, using the algorithm defined above.
5. Each `BUNDLE_REF` round MUST have a unique `bundle_id` within the transcript.
6. `COMPOSITE_SEAL` MUST be signed; an unsigned seal MUST be treated as `ACTIS_NONCOMPLIANT`.

---

## Sequencing State Machine

```
BUNDLE_REF (one or more, any order)
    └─► COMPOSITE_SEAL (exactly once, always last)
```

---

## Example Transcript

```json
{
  "transcript_id": "composite-case-2026-001",
  "actis_profile": "composite",
  "composite_id": "case-2026-001",
  "created_at_ms": 1743880000000,
  "rounds": [
    {
      "round_number": 1,
      "round_type": "BUNDLE_REF",
      "agent_id": "agent:orchestrator:prod",
      "content_summary": {
        "bundle_id": "sub-bundle-assessment-001",
        "final_hash": "abc123def456...",
        "profile": "commerce",
        "role": "assessment"
      }
    },
    {
      "round_number": 2,
      "round_type": "BUNDLE_REF",
      "agent_id": "agent:orchestrator:prod",
      "content_summary": {
        "bundle_id": "sub-bundle-data-001",
        "final_hash": "def456ghi789...",
        "profile": "data",
        "role": "evidence"
      }
    },
    {
      "round_number": 3,
      "round_type": "BUNDLE_REF",
      "agent_id": "agent:orchestrator:prod",
      "content_summary": {
        "bundle_id": "sub-bundle-approval-001",
        "final_hash": "ghi789jkl012...",
        "profile": "commerce",
        "role": "approval"
      }
    },
    {
      "round_number": 4,
      "round_type": "COMPOSITE_SEAL",
      "agent_id": "agent:orchestrator:prod",
      "content_summary": {
        "top_level_decision": "APPROVED",
        "composite_hash": "xyz999aaa111...",
        "bundle_ids": [
          "sub-bundle-assessment-001",
          "sub-bundle-approval-001",
          "sub-bundle-data-001"
        ]
      }
    }
  ]
}
```

---

## Design Notes

- Sub-bundles MAY be in any ACTIS profile (`commerce`, `data`, or `composite`). Nested composite bundles are permitted; verifiers MUST detect and reject circular references.
- `top_level_decision` is an opaque string. Implementations MAY define their own decision vocabulary. The protocol does not interpret its value.
- The `role` field on `BUNDLE_REF` is informational. Verifiers MUST NOT make integrity decisions based on `role` alone.
- Composite bundles are append-only like all ACTIS bundles. Once `COMPOSITE_SEAL` is written, the transcript is closed.
- Retrieving and verifying sub-bundles is the responsibility of the verifier. The composite bundle provides only the cryptographic commitment; it does not embed sub-bundle content.

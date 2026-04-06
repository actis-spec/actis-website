# ACTIS/v1 — Data Profile

**Profile name:** `data`
**Status:** Draft
**Use case:** Data provenance and chain-of-custody for regulated multi-party data flows, where multiple parties originate, transform, validate, and deliver structured data and each step must be independently auditable.

---

## Round Types

| Round Type      | Sender          | Description |
|----------------|-----------------|-------------|
| DATA_SUBMISSION | Data originator | Initial data file or record submission. MUST declare `dataset_id`, `schema_version`, `record_count`, and `submission_hash` (sha256 of the raw payload). |
| ACKNOWLEDGE     | Receiver        | Confirms receipt of a `DATA_SUBMISSION`. Records `received_hash` and `timestamp_ms`. If `received_hash` ≠ `submission_hash`, this round MUST include `fault: "HASH_MISMATCH"`. |
| TRANSFORM       | Processor       | Documents a single data transformation step. Records `input_hash`, `output_hash`, `transform_type` (e.g. `"normalize"`, `"validate"`, `"enrich"`), and `transform_version`. |
| VALIDATE        | Validator       | Records the result of a validation pass. Records `rules_applied` (array of rule IDs), `pass_count`, `fail_count`, and `fail_reasons` (array of strings; MUST NOT contain PII). |
| DELIVER         | Processor       | Final delivery to the downstream recipient. Records `delivery_hash`, `recipient_id`, and `delivery_channel`. |
| DATA_DISPUTE    | Any party       | Opens a dispute on a prior round. References `disputed_round_number` and `dispute_reason`. |
| DATA_RESOLVE    | Mediator        | Resolves a `DATA_DISPUTE`. Records `resolution: "UPHELD" \| "REJECTED" \| "PARTIAL"` and `resolution_notes`. |

---

## Required Header Fields (in addition to base ACTIS)

```json
{
  "actis_profile": "data",
  "dataset_id": "string — unique identifier for the dataset being exchanged",
  "schema_version": "string — schema identifier for the payload format, e.g. 'myschema/v2.1'",
  "originator_id": "string — agent ID of the party that produced the original submission"
}
```

---

## Validation Rules

1. A valid data profile transcript MUST begin with `DATA_SUBMISSION`.
2. `ACKNOWLEDGE` MUST appear before any `TRANSFORM` round.
3. `DELIVER` MUST be the final non-dispute round. Only `DATA_DISPUTE` or `DATA_RESOLVE` rounds may follow it.
4. Each `TRANSFORM` round MUST set `input_hash` equal to the `output_hash` of the immediately preceding `TRANSFORM`, or to `submission_hash` if it is the first transform in the chain.
5. The `DELIVER` round's `delivery_hash` MUST equal the `output_hash` of the final `TRANSFORM` round.
6. `DATA_RESOLVE` MUST reference a `DATA_DISPUTE` round number that exists in the same transcript.
7. If no `TRANSFORM` rounds are present, `DELIVER` round's `delivery_hash` MUST equal `submission_hash`.

---

## Sequencing State Machine

```
DATA_SUBMISSION
    └─► ACKNOWLEDGE
            └─► TRANSFORM (repeatable, chained)
                    └─► VALIDATE (optional, repeatable)
                            └─► DELIVER
                                    └─► DATA_DISPUTE (optional)
                                                └─► DATA_RESOLVE
```

---

## Example Transcript

```json
{
  "transcript_id": "txn-data-2026-001",
  "actis_profile": "data",
  "dataset_id": "dataset-q1-2026-regulatory-report",
  "schema_version": "reportschema/v3.0",
  "originator_id": "agent:data-provider-a:prod",
  "created_at_ms": 1743879600000,
  "rounds": [
    {
      "round_number": 1,
      "round_type": "DATA_SUBMISSION",
      "agent_id": "agent:data-provider-a:prod",
      "content_summary": {
        "submission_hash": "e3b0c44298fc1c149afb4c8996fb924...",
        "record_count": 1024,
        "schema_version": "reportschema/v3.0"
      }
    },
    {
      "round_number": 2,
      "round_type": "ACKNOWLEDGE",
      "agent_id": "agent:processor-b:prod",
      "content_summary": {
        "received_hash": "e3b0c44298fc1c149afb4c8996fb924...",
        "timestamp_ms": 1743879610000
      }
    },
    {
      "round_number": 3,
      "round_type": "TRANSFORM",
      "agent_id": "agent:processor-b:prod",
      "content_summary": {
        "input_hash": "e3b0c44298fc1c149afb4c8996fb924...",
        "output_hash": "a665a45920422f9d417e4867efdc4fb8...",
        "transform_type": "normalize",
        "transform_version": "normalizer@1.4.2"
      }
    },
    {
      "round_number": 4,
      "round_type": "VALIDATE",
      "agent_id": "agent:validator-c:prod",
      "content_summary": {
        "rules_applied": ["schema-conformance-v3", "null-field-check"],
        "pass_count": 1023,
        "fail_count": 1,
        "fail_reasons": ["MISSING_REQUIRED_FIELD on record 512"]
      }
    },
    {
      "round_number": 5,
      "round_type": "DELIVER",
      "agent_id": "agent:processor-b:prod",
      "content_summary": {
        "delivery_hash": "a665a45920422f9d417e4867efdc4fb8...",
        "recipient_id": "agent:recipient-d:prod",
        "delivery_channel": "secure-api-v2"
      }
    }
  ]
}
```

---

## Design Notes

- `submission_hash` and all subsequent `input_hash` / `output_hash` / `delivery_hash` values MUST be hex-encoded sha256 digests of the relevant payload bytes.
- `schema_version` is an opaque string. Implementations MAY define their own versioning convention; the protocol does not interpret it.
- `fail_reasons` strings MUST NOT contain personally identifiable information. Implementations are responsible for scrubbing PII before writing this field.
- The hash chain over round hashes is inherited unchanged from ACTIS/v1 base. The content hashes within `content_summary` are a separate, data-layer integrity mechanism.

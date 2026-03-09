#!/usr/bin/env bash
# Sync website content from canonical ACTIS spec repo (byte-faithful copy).
# Usage: ACTIS_SPEC=/path/to/actis ./scripts/sync-content-from-spec.sh
#        Or from repo root: ACTIS_SPEC=../pact/actis ./scripts/sync-content-from-spec.sh

set -e
SPEC="${ACTIS_SPEC:?Set ACTIS_SPEC to the path of the actis spec repo (e.g. ../pact/actis)}"
DEST="$(dirname "$0")/../content"

cp "$SPEC/docs/ACTIS_STANDARD_v1.md"      "$DEST/ACTIS_STANDARD_v1.md"
cp "$SPEC/docs/ACTIS_COMPATIBILITY.md"    "$DEST/ACTIS_COMPATIBILITY.md"
cp "$SPEC/GOVERNANCE.md"                  "$DEST/GOVERNANCE.md"
cp "$SPEC/docs/ACTIS_IP_COMMITMENT.md"    "$DEST/ACTIS_IP_COMMITMENT.md"
cp "$SPEC/docs/START_HERE.md"             "$DEST/START_HERE.md"

echo "Synced 5 files from $SPEC to $DEST"

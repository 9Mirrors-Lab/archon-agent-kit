#!/usr/bin/env bash
set -euo pipefail

DEST_DIR="${1:-.}"

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
SRC_DIR="$SCRIPT_DIR/assets/agent-kit"

mkdir -p "$DEST_DIR/.cursor/rules"
mkdir -p "$DEST_DIR/PRP"

cp -f "$SRC_DIR/.cursor/rules/project-rules.mdc" "$DEST_DIR/.cursor/rules/"
cp -f "$SRC_DIR/.cursor/rules/generate-base-template.mdc" "$DEST_DIR/.cursor/rules/"
cp -f "$SRC_DIR/.cursor/rules/create-prp.mdc" "$DEST_DIR/.cursor/rules/"
cp -f "$SRC_DIR/.cursor/rules/execute-prp.mdc" "$DEST_DIR/.cursor/rules/"

# Copy PRP files from the PRP folder
cp -f "$SRC_DIR/PRP/README-PRP.md" "$DEST_DIR/README-PRP.md"
cp -f "$SRC_DIR/PRP/INITIAL.template.md" "$DEST_DIR/PRP/INITIAL.template.md"

if [[ -f "$DEST_DIR/INITIAL.md" ]]; then
  cp -f "$SRC_DIR/PRP/INITIAL.template.md" "$DEST_DIR/INITIAL.md"
  echo "Found existing INITIAL.md. Updated it from template."
else
  cp -f "$SRC_DIR/PRP/INITIAL.template.md" "$DEST_DIR/INITIAL.md"
  echo "Created INITIAL.md from template."
fi

echo "Installed Archon Agent Kit into: $DEST_DIR"
echo "  - Cursor rules: $DEST_DIR/.cursor/rules/"
echo "  - PRP folder: $DEST_DIR/PRP/"
echo "  - INITIAL template: $DEST_DIR/PRP/INITIAL.template.md"
echo "  - Canonical template: Embedded in generate-base-template.mdc"



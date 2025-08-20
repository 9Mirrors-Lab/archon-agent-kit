# Archon Agent Kit (Cursor + Claude Code)

This kit provides everything needed to generate and execute PRPs using Archon MCP with Cursor and Claude Code.

## Contents
- `.cursor/rules/`
  - `project-rules.mdc`
  - `generate-base-template.mdc`
  - `create-prp.mdc`
  - `execute-prp.mdc`
- `INITIAL.template.md` – brief template for project context

## Prerequisites
- Archon services running (MCP default: http://localhost:8051)
- Cursor or Claude Code configured to connect to Archon MCP

## Usage
1. Copy this starter into your project root (preserving structure), or run the installer.
2. In Cursor:
   - Use the .mdc rules under `.cursor/rules/`.
3. In Claude Code:
   - Use the commands under `.claude/commands/ArchonAgentKit/rules`.





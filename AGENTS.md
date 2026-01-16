# Agent Guidelines

This repository contains OpenCode subagents and commands. Agents are specialized AI assistants, and commands are reusable prompts invoked via slash commands.

## Repository Overview

This is a configuration repository with no traditional build/test/lint commands. The primary workflows involve:
- Creating and syncing agent definitions
- Creating command definitions
- Validating and releasing via OCI artifacts
- Using git for version control

## Folder Structure
```
├── llm/
│   ├── agent/          # Synced agent definitions (*.md files)
│   └── command/        # Command definitions (*.md files)
├── .opencode/
│   ├── agent/          # Temporary location for new agents (before sync)
│   └── command/        # Command templates
├── scripts/
│   ├── sync-agents     # Moves agents from .opencode/agent/ to llm/agent/
│   └── llm-release     # Parses and validates version from oc-v* tags
└── .github/workflows/
    └── push-oci-artifacts.yml  # CI/CD for publishing artifacts
```

## Common Commands

### Sync Agents
After creating a new agent using `opencode create agent`, run:
```bash
./scripts/sync-agents
```
This moves all `.md` files from `.opencode/agent/` to `llm/agent/`.

### Release Artifacts
To validate and extract version from oc-v* tags:
```bash
./scripts/llm-release oc-v0.1.0-rc.0
```
Outputs the version (e.g., `v0.1.0-rc.0`). Used by GitHub Actions for OCI artifact creation.

## Code Style Guidelines

### Bash Scripts
- Use `#!/usr/bin/env bash` or `#!/bin/bash` shebang
- Add `set -e` for error handling
- Include usage comments at the top for scripts with arguments
- Store executable scripts in `scripts/`
- Use double quotes around variables to handle spaces

### YAML Files (GitHub Workflows)
- Use 2-space indentation
- Name jobs and steps descriptively
- Group related steps logically
- Use `uses` for GitHub Actions with `@version` pinning
- Keep workflow files in `.github/workflows/`

### Markdown (Agent/Command Definitions)
- Use YAML frontmatter with `---` delimiters
- Frontmatter must include: `description`, `mode` (for agents) or `subtask` (for commands)
- Agents: include `tools` section listing allowed tools with boolean values
- Commands: may use `!` followed by backticks for inline command execution in command files
- Write descriptions in sentence case, clear and concise
- For agents, include usage examples in the description field

### Commit Messages
Follow conventional commit format with prefixes:
- `docs:` - Documentation changes (especially packages/web)
- `ci:` - CI/CD workflow changes
- `ignore:` - Changes to packages/app
- `wip:` - Work in progress
- `feat:` - New features
- `fix:` - Bug fixes

Focus on WHY from end-user perspective, not WHAT. Be specific about user-facing changes. Avoid generic messages.

### OCI Artifact Workflow
- Push tags must start with `oc-v` followed by semver (e.g., `oc-v1.2.3`, `oc-v0.1.0-rc.0`)
- Workflow triggers on tags matching `oc-v*`
- Artifacts pushed to `oci://ghcr.io/gitbluf/local/oc-agent:{version}` and `oci://ghcr.io/gitbluf/local/oc-command:{version}`
- Uses fluxcd/flux2 action for artifact operations
- Requires GitHub token for GHCR authentication

### File Organization
- Agent definitions in `llm/agent/*.md` contain full subagent instructions
- Command definitions in `llm/command/*.md` are slash command prompts
- Frontmatter fields guide agent behavior and tool access
- Commands may use backtick command execution with `!` prefix

### General Guidelines
- Keep descriptions concise and actionable
- Use imperative mood for commit messages
- Minimize unnecessary comments in code
- Maintain consistent formatting within file types
- Test agent/command behavior after creation
- Ensure scripts are executable (`chmod +x scripts/*`)

### Agent Definition Frontmatter Example
```yaml
---
description: >-
  Use this agent when [specific use case]. Include <example> tags with
  Context/user/assistant/commentary structure for proactive usage examples.
mode: subagent
temperature: 0.1  # Optional: set temperature for deterministic outputs
tools:
  read: false
  write: false
  edit: false
  # ... other tool permissions
---
```

### Command Definition Frontmatter Example
```yaml
---
description: Brief one-line description
subtask: true
agent: build  # Optional: specify agent to use
model: opencode/big-pickle  # Optional: specify model
---
```

### Command Execution in Command Files
Use backticks with `!` prefix for inline shell commands:
```markdown
Recent git commits:
!`git log --oneline -3`

Review these changes and suggest improvements.
```

### Commit Message Patterns
- `docs:` add agent guidelines and sync workflow documentation
- `ci:` update GitHub Actions to use flux2 action@v4
- `feat:` add spellcheck command for markdown files
- `fix:` resolve OCI artifact push authentication issue
- `wip:` initial draft of new agent definition


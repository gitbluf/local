# Agent Guidelines

This repository holds subagents and commands for opencode. Use `opencode create agent` to create new agents, then run `scripts/sync-agents` to sync them to the llm/agent path.

## Folder Structure
```
├── llm/
│   ├── agent/          # Synced agent definitions (*.md files)
│   └── command/        # Command definitions (*.md files)
├── .opencode/
│   ├── agent/          # Temporary location for new agents (before sync)
│   └── command/        # Command templates
└── scripts/
    └── sync-agents     # Script to move agents from .opencode/agent/ to llm/agent/
```

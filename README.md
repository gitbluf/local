# opencode-local-agents

OpenCode plugin providing tools for git workflows, pull request creation, and code generation/review helpers for Bash, Go, and KCL.

## Installation

### As an npm package

```bash
# In your project's .opencode directory
cd .opencode
npm install opencode-local-agents
```

Or add to `.opencode/package.json`:

```json
{
  "dependencies": {
    "opencode-local-agents": "^0.1.0"
  }
}
```

Then reference in `.opencode/opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": [
    "opencode-local-agents"
  ]
}
```

### As a local plugin

Alternatively, copy the plugin file directly:

```bash
# Copy to your project
cp node_modules/opencode-local-agents/dist/index.js .opencode/plugin/local-agents.js
```

Plugins in `.opencode/plugin/` are auto-loaded by OpenCode.

## Tools

### gitCommitMessage

Provides guidance for generating conventional commit messages following project conventions.

**Usage:**
```
Use gitCommitMessage with staged=true
```

**Features:**
- Conventional commit prefixes (feat, fix, docs, chore, etc.)
- Project-specific rules (docs: for packages/web, ignore: for packages/app)
- Imperative mood enforcement
- 72-character limit guidance

### createPullRequest

Creates a GitHub pull request using gh CLI with automatic branch pushing and validation.

**Usage:**
```
Use createPullRequest with title="Add new feature" and baseBranch="main"
Use createPullRequest with title="Fix bug" and body="Detailed description" and baseBranch="develop"
```

**Requirements:**
- GitHub CLI (`gh`) must be installed and authenticated
- Must be in a git repository
- Branch must have commits ahead of base branch

**Features:**
- Automatic branch detection and pushing
- Commit validation
- gh CLI integration
- Returns PR URL upon success

### bashScriptHelper

Provides guidance for generating or reviewing Bash scripts with best practices.

**Usage:**
```
Use bashScriptHelper with mode="generate" and taskOrScript="backup database to S3"
Use bashScriptHelper with mode="review" and taskOrScript="<paste your script here>"
```

**Features:**
- Strict error handling (set -euo pipefail)
- Proper variable quoting
- Clear function structure
- Comprehensive error handling patterns

### golangStyleHelper

Provides guidance for generating or reviewing Go code following Google's style guide.

**Usage:**
```
Use golangStyleHelper with mode="generate" and codeOrTask="HTTP server with graceful shutdown"
Use golangStyleHelper with mode="review" and codeOrTask="<paste your Go code here>"
```

**Features:**
- Go naming conventions (camelCase/PascalCase)
- Import grouping (stdlib, third-party, local)
- gofmt-style formatting
- Idiomatic error handling
- godoc-style comments

### kclSchemaHelper

Provides guidance for generating or reviewing KCL schemas for Kubernetes/cloud-native configurations.

**Usage:**
```
Use kclSchemaHelper with mode="generate" and contentOrDescription="Kubernetes deployment with 3 replicas"
Use kclSchemaHelper with mode="generate" and contentOrDescription="service with load balancer" and targetPlatform="Kubernetes"
Use kclSchemaHelper with mode="review" and contentOrDescription="<paste your KCL here>"
```

**Features:**
- Idiomatic KCL syntax
- Modular and reusable schemas
- Type annotations and validation
- Cloud-native best practices

## Development

### Building

```bash
npm install
npm run build
```

This compiles TypeScript to JavaScript in the `dist/` directory.

### Testing locally

```bash
# Link the package locally
npm link

# In another project
cd /path/to/test-project/.opencode
npm link opencode-local-agents
```

Then add to that project's `.opencode/opencode.json`:

```json
{
  "plugin": ["opencode-local-agents"]
}
```

### Publishing

```bash
# Make sure you're logged in to npm
npm login

# Publish
npm publish --access public
```

## Tool Design Philosophy

This plugin follows OpenCode's custom tool patterns:

1. **Tools don't call the LLM** - The LLM calls the tools
2. **Return simple values** - Plain strings or simple objects that OpenCode can render
3. **Guidance pattern** - For complex tasks, tools return instructions that guide the agent
4. **Action pattern** - For concrete tasks (like createPullRequest), tools perform the action and return results

## Requirements

- OpenCode >= 1.0.0
- Node.js >= 18
- For `createPullRequest`: GitHub CLI (`gh`) installed and authenticated

## License

MIT

## Contributing

Issues and pull requests are welcome at https://github.com/gitbluf/local

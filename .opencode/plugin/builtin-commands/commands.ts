// .opencode/plugin/builtin-commands/commands.ts
import type { BuiltinCommand } from "./types"

const applyCommand: BuiltinCommand = {
  name: "apply",
  description:
    "Execute plan-<request>.md via exec. Does nothing if the plan file does not exist.",
  agent: "exec",
  subtask: true,
  template: `You are handling a \`/apply\` command in plan-execution mode.

The user's raw argument is:

- $ARGUMENTS

Interpret $ARGUMENTS as a plan name <request> and expect a plan file:

- \`plan-<request>.md\`

This command will include that plan file for you as a file reference.

## Plan File

The plan file content (if it exists) is provided below:

@plan-$ARGUMENTS.md

## Behavior

1. If the plan file @plan-$ARGUMENTS.md does NOT exist or is empty:
   - Respond: "No plan file found for '$ARGUMENTS' (expected plan-$ARGUMENTS.md)."
   - Do NOT perform any further analysis, planning, or code changes.
   - STOP.

2. If the plan file exists:
   - Read and follow the instructions in the plan exactly.
   - Extract concrete implementation steps from the plan.
   - Use tools (read, write, edit, bash, etc.) ONLY to implement those steps.
   - Do NOT add new tasks, features, or scope beyond the plan.
   - If a plan step is ambiguous, ask up to 2 targeted questions. If still unclear, skip that step and report it.

3. You MUST NOT:
   - Call other agents.
   - Create or modify plan files.
   - Invent new work beyond the plan.

## Response Expectations

When you respond:

- Summarize which plan steps you implemented.
- For each step, mark as:
  - **done**
  - **skipped (with reason)**
  - **clarification needed**
- Reference the files you changed.
- Do not propose new tasks outside of the plan.
`,
}



export function createBuiltinCommands(): BuiltinCommand[] {
  return [applyCommand]
}

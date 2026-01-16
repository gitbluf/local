// .opencode/plugin/agents/index.ts
import type { BuiltinAgentDefinition } from "./types"
import { cortexDefinition } from "./cortex"
import { blueprintDefinition } from "./blueprint"
import { blackiceDefinition } from "./blackice"
import { execDefinition } from "./exec"
import { dataweaverDefinition } from "./dataweaver"
import { discoverSkills } from "../skills/discovery"
import { createBuiltinSkills } from "../builtin-skills"

export type BuiltinAgentName =
  | "cortex"
  | "blueprint"
  | "blackice"
  | "exec"
  | "dataweaver"

/**
 * Array of all built-in agent definitions.
 * Add new agents here as you create more modules.
 */
export const builtinAgentDefinitions: BuiltinAgentDefinition[] = [
  cortexDefinition,
  blueprintDefinition,
  blackiceDefinition,
  execDefinition,
  dataweaverDefinition,
]

/**
 * Register all built-in agents into the OpenCode config.
 * Mutates config in-place; returns void as required by the Plugin config hook.
 */
export async function registerBuiltinAgents(
  config: Record<string, unknown>,
  directory: string,
): Promise<void> {
  const existingAgents =
    (config.agent as Record<string, unknown> | undefined) ?? {}

  const discoveredSkills = await discoverSkills(directory)
  const builtinSkills = createBuiltinSkills().map((skill) => ({
    name: skill.name,
    description: skill.description,
    location: "project" as const,
    path: `[builtin]://${skill.name}`,
  }))

  const skills = [...discoveredSkills, ...builtinSkills]

  for (const def of builtinAgentDefinitions) {
    const agentConfig = def.create(config, existingAgents, skills)
    if (agentConfig) {
      existingAgents[def.name] = agentConfig
    }
  }

  ;(config as { agent?: Record<string, unknown> }).agent = existingAgents

  // Only set default_agent if not already set and cortex is available
  const currentDefault = (config as { default_agent?: string }).default_agent
  if (!currentDefault && existingAgents.cortex) {
    ;(config as { default_agent?: string }).default_agent = "cortex"
  }
}

// Re-export types and utilities
export type { BuiltinAgentDefinition } from "./types"
export type { CortexAvailableAgent } from "./cortex"
export { createCortexOrchestratorAgent } from "./cortex"

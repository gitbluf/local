// .opencode/plugin/agents/types.ts
import type { AgentConfig } from "@opencode-ai/sdk"

/**
 * Generic definition for a built-in agent.
 * Each agent module exports one of these.
 */
export interface BuiltinAgentDefinition {
  name: string
  /**
   * Build or update the agent config.
   * Return null to skip registration (e.g. disabled).
   */
  create(
    config: Record<string, unknown>,
    existingAgents: Record<string, unknown>,
    skills: import("../skills/discovery").SkillInfo[],
  ): AgentConfig | null
}

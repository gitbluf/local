// .opencode/plugin/platform.ts
import type { Plugin } from "@opencode-ai/plugin"
import { registerBuiltinAgents } from "./agents"
import { registerBuiltinCommands } from "./builtin-commands/register"
import {
  createPlatformAgentsTool,
  createPlatformSkillsTool,
  createPlatformInfoTool,
  createPlatformCreateAgentTool,
  createPlatformCortexAgentTool,
} from "./tools"
import { constants } from "bun:sqlite"

const PlatformPlugin: Plugin = async ({ client, directory }) => {
  const platformAgents = createPlatformAgentsTool(client)
  const platformSkills = createPlatformSkillsTool(directory)
  const platformInfo = createPlatformInfoTool(client, directory)
  const platformCreateAgent = createPlatformCreateAgentTool(directory)
  const platformCortexAgent = createPlatformCortexAgentTool(client)

  return {
    tool: {
      platform_agents: platformAgents,
      platform_skills: platformSkills,
      platform_info: platformInfo,
      platform_createAgent: platformCreateAgent,
      platform_cortexAgent: platformCortexAgent,
    },

    // Simple config mutation following starter plugin pattern
    // No client.app.agents() calls here to avoid recursion
    config: async (config) => {
      await registerBuiltinAgents(config, directory)
      await registerBuiltinCommands(config)
    },
  }
}

export default PlatformPlugin
export { PlatformPlugin }

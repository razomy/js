import * as ai from '@razomy/ai';
import * as aiAgentProject from '@razomy/ai-agent-project';

export async function callAuto(ctx: ai.AiLlmContext) {
  if (ctx.tools.length) {
    return await aiAgentProject.llms.callTool(ctx);
  } else {
    return await aiAgentProject.llms.callText(ctx);
  }
}

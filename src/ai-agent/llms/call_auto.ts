import * as ai from '@razomy/ai';
import * as aiAgent from '@razomy/ai-agent';

export async function callAuto(ctx: ai.AiLlmContext) {
  if (ctx.tools.length) {
    return await aiAgent.llms.callTool(ctx);
  } else {
    return await aiAgent.llms.callText(ctx);
  }
}

import * as ai from '@razomy/ai';
import * as aiAgentProject from '..';

export async function askTaskDecompose(ctx: ai.AiLlmContext): Promise<string[]> {
  const messages = [
    ...aiAgentProject.prompts.getPanicPrompt(),
    ...aiAgentProject.prompts.getTaskDecomposePrompt(),
    ...ctx.messages,
  ];
  return aiAgentProject.llms.consensusCall({ ...ctx, messages }, async (ctx) => {
    const result = await aiAgentProject.llms.callText(ctx);
    aiAgentProject.parsers.parseThrowPanic(result);
    return aiAgentProject.parsers.parseArray(result);
  });
}

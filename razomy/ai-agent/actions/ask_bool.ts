import * as ai from '@razomy/ai';
import * as aiAgentProject from '..';

export async function askBool(ctx: ai.AiLlmContext): Promise<boolean> {
  const messages = [
    ...aiAgentProject.prompts.getPanicPrompt(),
    ...aiAgentProject.prompts.getBoolPrompt(),
    ...ctx.messages,
  ];
  return aiAgentProject.llms.consensusCall({ ...ctx, messages }, async (ctx) => {
    const result = await aiAgentProject.llms.callText(ctx);
    aiAgentProject.parsers.parseThrowPanic(result);
    return aiAgentProject.parsers.parseBool(result);
  });
}

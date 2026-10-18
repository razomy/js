import * as ai from '@razomy/ai';
import * as aiAgent from '@razomy/ai-agent';

export async function askBool(ctx: ai.AiLlmContext): Promise<boolean> {
  const messages = [
    ...aiAgent.prompts.getPanicPrompt(),
    ...aiAgent.prompts.getBoolPrompt(),
    ...ctx.messages,
  ];
  return aiAgent.llms.consensusCall({ ...ctx, messages }, async (ctx) => {
    const result = await aiAgent.llms.callText(ctx);
    aiAgent.parsers.parseThrowPanic(result);
    return aiAgent.parsers.parseBool(result);
  });
}

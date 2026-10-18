import * as ai from '@razomy/ai';
import * as aiAgent from '@razomy/ai-agent';

export async function askNumber(ctx: ai.AiLlmContext): Promise<number> {
  const messages = [
    ...aiAgent.prompts.getPanicPrompt(),
    ...aiAgent.prompts.getNumberPrompt(),
    ...ctx.messages,
  ];
  return aiAgent.llms.consensusCall({ ...ctx, messages }, async (ctx) => {
    const result = await aiAgent.llms.callText(ctx);
    aiAgent.parsers.parseThrowPanic(result);
    return aiAgent.parsers.parseNumber(result);
  });
}

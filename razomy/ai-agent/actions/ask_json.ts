import * as ai from '@razomy/ai';
import * as aiAgent from '@razomy/ai-agent';

export async function askJson(ctx: ai.AiLlmContext): Promise<string> {
  const messages = [...aiAgent.prompts.getPanicPrompt(), ...ctx.messages];
  return aiAgent.llms.consensusCall({ ...ctx, messages }, async (ctx) => {
    const result = await aiAgent.llms.callText(ctx);
    aiAgent.parsers.parseThrowPanic(result);
    return aiAgent.parsers.parseJson(result);
  });
}

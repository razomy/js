import * as ai from '@razomy/ai';
import * as aiAgent from '@razomy/ai-agent';

export async function askCompose(ctx: ai.AiLlmContext, contexts: string[], query: string): Promise<string> {
  const messages = [
    ...aiAgent.prompts.getPanicPrompt(),
    ...aiAgent.prompts.getComposePrompt(contexts, query),
  ];
  return aiAgent.llms.consensusCall({ ...ctx, messages }, async (ctx) => {
    const result = await aiAgent.llms.callText(ctx);
    aiAgent.parsers.parseThrowPanic(result);
    return result;
  });
}

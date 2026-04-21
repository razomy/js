import * as ai from '@razomy/ai';
import * as aiAgentProject from '..';

export async function askCompose(ctx: ai.AiLlmContext, contexts: string[], query: string): Promise<string> {
  const messages = [
    ...aiAgentProject.prompts.getPanicPrompt(),
    ...aiAgentProject.prompts.getComposePrompt(contexts, query),
  ];
  return aiAgentProject.llms.consensusCall({ ...ctx, messages }, async (ctx) => {
    const result = await aiAgentProject.llms.callText(ctx);
    aiAgentProject.parsers.parseThrowPanic(result);
    return result;
  });
}

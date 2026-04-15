import * as ai from '@razomy/ai';
import * as aiAgentProject from '@razomy/ai-agent-project';

export async function askSwitch(ctx: ai.AiLlmContext, options: string[]): Promise<string> {
  const messages = [
    ...aiAgentProject.prompts.getPanicPrompt(),
    ...aiAgentProject.prompts.getSwitchPrompt(options),
    ...ctx.messages,
  ];
  return aiAgentProject.llms.consensusCall({ ...ctx, messages }, async (ctx) => {
    const result = await aiAgentProject.llms.callText(ctx);
    aiAgentProject.parsers.parseThrowPanic(result);
    return aiAgentProject.parsers.parseSwitch(result, options);
  });
}

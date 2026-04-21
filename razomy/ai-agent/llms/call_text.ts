import * as ai from '@razomy/ai';
import * as aiAnthropic from '@razomy/ai-anthropic';

export async function callText({ messages }: ai.AiLlmContext) {
  const response = await aiAnthropic.instant.ask(
    messages.filter((i) => i.type === 'text').map((message) => message.content),
  );
  return response;
}

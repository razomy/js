import * as ai from "@razomy/ai";
import * as aiAnthropic from "@razomy/ai-anthropic";

export async function callTool({messages, tools}: ai.AiLlmContext) {
  const response = await aiAnthropic.instant.askTool(
    messages.filter(i => i.type === 'text').map((message) => message.content),
    tools
  );

  if (typeof response === 'string') {
    throw new ai.MustUseToolLlmException(response, 'Expected one of call tobe called');
  }

  return response;
}

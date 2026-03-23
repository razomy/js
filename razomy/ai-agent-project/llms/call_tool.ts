import {MustUseToolLlmException} from './must_use_tool_llm_exception';
import * as ai from "@razomy/ai";
import { askTool} from "../../ai-anthropic/instant";

export async function callTool({messages, tools}: ai.AiLlmContext) {
  const response = await askTool(
    messages.filter(i => i.type === 'text').map((message) => message.content),
    tools
  );

  if (typeof response === 'string') {
    throw new MustUseToolLlmException(response, 'Expected one of call tobe called');
  }

  return response;
}

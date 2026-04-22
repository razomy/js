import {predict as predictText} from "./predict";
import {predict as predictTool} from "./tool_predict";
import * as ai from "@razomy/ai";
import {executeToolMut} from "../tools";
import * as abstracts from "@razomy/abstracts";

export async function predictSu(systemMessage: string, userMessage: string) {
  const result = await predictText([
    ai.sM(systemMessage.trim()),
    ai.uM(userMessage.trim())
  ]);
  const content = result.content;
  console.log(content);
  return content;
}

export async function predictSuT(ctx, systemMessage: string, userMessage: string, tools: abstracts.translators.FunctionBinding[]) {
  const result = await predictTool([
      ai.sM(systemMessage.trim()),
      ai.uM(userMessage.trim())
    ],
    tools);
  console.log(result.content);
  if (result.type === 'request') {
    const toolResult = await executeToolMut(ctx, result.content);
    return toolResult;
  }
  return result;
}

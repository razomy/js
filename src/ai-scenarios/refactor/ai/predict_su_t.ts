import * as ais from "@razomy/ais";
import * as abstractions from "@razomy/abstractions";
import * as aiScenarios from "@razomy/ai-scenarios";

export async function predictSuT(ctx, systemMessage: string, userMessage: string, tools: abstractions.hir.FunctionHirn[]) {
  const result = await aiScenarios.refactor.ai.toolPredict([
      ais.chats.sM(systemMessage.trim()),
      ais.chats.uM(userMessage.trim())
    ],
    tools);
  console.log(result.content);
  if (result.type === 'request') {
    const toolResult = await aiScenarios.refactor.tools.executeToolMut(ctx, result.content);
    return toolResult;
  }
  return result;
}

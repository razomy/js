import * as ai from "@razomy/ai";
import * as abstracts from "@razomy/abstracts";
import * as aiScenarios from "@razomy/ai-scenarios";
import * as aiScenariosRefactorTools from "@razomy/ai-scenarios/refactor/tools";

export async function predictSuT(ctx, systemMessage: string, userMessage: string, tools: abstracts.translators.FunctionBinding[]) {
  const result = await aiScenarios.refactor.ai.toolPredict([
      ai.sM(systemMessage.trim()),
      ai.uM(userMessage.trim())
    ],
    tools);
  console.log(result.content);
  if (result.type === 'request') {
    const toolResult = await aiScenariosRefactorTools.executeToolMut(ctx, result.content);
    return toolResult;
  }
  return result;
}

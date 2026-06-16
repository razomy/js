import * as run from "@razomy/run";
import * as ai from "@razomy/ai";
import * as ai_ from "@razomy/ai";

export async function predict(
  cacheId: string | null,
  modelId: string,
  messages: ai.AiMessage[],
  tools
): Promise<ai.AiMessage> {
  if (!cacheId) {
    return ai_.apiRun.instant.chat.logic.mapMessageBack(await run.server.call(
      'razomy.ai_hugging_face.chat.tool.predict',
      'predict',
      [
        modelId,
        messages.map(ai_.apiRun.instant.chat.logic.mapMessage),
        tools
      ],
    ))
  }
  return ai_.apiRun.instant.chat.logic.mapMessageBack(await run.server.call(
    'razomy.ai_hugging_face.chat.tool.predict',
    'cache_predict',
    [
      cacheId,
      modelId,
      messages.map(ai_.apiRun.instant.chat.logic.mapMessage),
      tools
    ],
  ))
}

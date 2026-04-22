import * as run from "@razomy/run";
import * as ai from "@razomy/ai";

export async function predict(
  cacheId: string | null,
  modelId: string,
  messages: ai.AiMessage[],
): Promise<ai.AiMessage> {
  if (!cacheId) {
    return ai.apiRun.instant.chat.logic.mapMessageBack(await run.server.call(
      'razomy.ai_hugging_face.chat.logic.predict',
      'predict',
      [
        modelId,
        messages.map(ai.apiRun.instant.chat.logic.mapMessage),
      ]
    ))
  }
  return ai.apiRun.instant.chat.logic.mapMessageBack(await run.server.call(
    'razomy.ai_hugging_face.chat.logic.predict',
    'cache_predict',
    [
      cacheId,
      modelId,
      messages.map(ai.apiRun.instant.chat.logic.mapMessage),
    ]
  ))
}

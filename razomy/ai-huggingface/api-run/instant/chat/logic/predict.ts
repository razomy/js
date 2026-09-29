import * as run from "@razomy/run";
import * as ai from "@razomy/ai";
import * as aiHuggingface from "@razomy/ai-huggingface";

export async function predict(
  cacheId: string | null,
  modelId: string,
  messages: ai.AiMessage[],
): Promise<ai.AiMessage> {
  if (!cacheId) {
    return aiHuggingface.apiRun.instant.chat.logic.mapMessageBack(await run.server.call(
      'razomy.ai_huggingface.chat.logic.predict',
      'predict',
      [
        modelId,
        messages.map(aiHuggingface.apiRun.instant.chat.logic.mapMessage),
      ]
    ))
  }
  return aiHuggingface.apiRun.instant.chat.logic.mapMessageBack(await run.server.call(
    'razomy.ai_huggingface.chat.logic.predict',
    'cache_predict',
    [
      cacheId,
      modelId,
      messages.map(aiHuggingface.apiRun.instant.chat.logic.mapMessage),
    ]
  ))
}

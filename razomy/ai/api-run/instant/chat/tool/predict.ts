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

export async function predict_cache_string(cache_id: string | null, model_id: string, text: string, opts: {
  "max_tokens": number,
  'verbose': boolean,
  'update_cache': boolean,
}) {

  return await (run.server.call(
    'razomy.ai_hugging_face.chat.tool.predict',
    'predict_cache_string',
    [
      cache_id,
      model_id,
      text,
      opts
    ],
  )) as string
}

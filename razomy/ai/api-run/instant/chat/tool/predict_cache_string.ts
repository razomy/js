import * as run from "@razomy/run";

export async function predictCacheString(cacheId: string | null, modelId: string, text: string, opts: {
      maxTokens: number,
      verbose: boolean,
      updateCache: boolean,
    }) {
    return await (run.server.call(
    'razomy.ai_hugging_face.chat.tool.predict',
    'predict_cache_string',
    [
      cacheId,
      modelId,
      text,
      opts
    ],
    )) as string
}

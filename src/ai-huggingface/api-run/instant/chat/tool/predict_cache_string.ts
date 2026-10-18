import * as run from "@razomy/run";
import * as json from "@razomy/json";

export async function predictCacheString(cacheId: string | null, modelId: string, text: string, opts: {
      maxTokens: number,
      verbose: boolean,
      updateCache: boolean,
    }) {
    return await (run.server.call(
    'razomy.ai_huggingface.chat.tool.predict',
    'predict_cache_string',
    [
      cacheId,
      modelId,
      text,
      json.snakeCaseKeys(opts)
    ],
    )) as string
}

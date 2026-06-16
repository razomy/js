import * as run from "@razomy/run";

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

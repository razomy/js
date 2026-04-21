import * as run from "@razomy/run";

export async function predict(
  cache_id: string,
  model_id: string,
  messages: { role: string; content: string }[],
): Promise<any> {
  return run.server.call(
    'razomy.ai_hugging_face.chat.text.predict',
    'cache_predict',
    [
      cache_id,
      model_id,
      messages,
    ]
  )
}

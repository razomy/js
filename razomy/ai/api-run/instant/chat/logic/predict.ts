import * as run from "@razomy/run";
import type {AiMessage} from "../../../../message";

export function mapMessage(message: AiMessage) {
  return { role: message.sender, content: message.content }
}

export async function predict(
  cache_id: string | null,
  model_id: string,
  messages: AiMessage[],
): Promise<any> {
  if(!cache_id) {
    return await run.server.call(
      'razomy.ai_hugging_face.chat.logic.predict',
      'predict',
      [
        model_id,
        messages.map(mapMessage),
      ]
    )
  }
  return await run.server.call(
    'razomy.ai_hugging_face.chat.logic.cacpredict',
    'cache_predict',
    [
      cache_id,
      model_id,
      messages.map(mapMessage),
    ]
  )
}

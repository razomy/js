import * as run from "@razomy/run";
import type {AiMessage} from "../../../../message";

export function mapMessage(message: AiMessage) {
  return {role: message.sender, content: message.content}
}

export function mapMessageBack(message: any): AiMessage {
  return {
    sender: message.role == 'call' ? 'assistant' : message.role,
    type: message.function ? 'call' : 'text',
    content: message.content || message.content.function
  }
}

export async function predict(
  cache_id: string | null,
  model_id: string,
  messages: AiMessage[],
): Promise<AiMessage> {
  if (!cache_id) {
    return mapMessageBack(await run.server.call(
      'razomy.ai_hugging_face.chat.logic.predict',
      'predict',
      [
        model_id,
        messages.map(mapMessage),
      ]
    ))
  }
  return mapMessageBack(await run.server.call(
    'razomy.ai_hugging_face.chat.logic.predict',
    'cache_predict',
    [
      cache_id,
      model_id,
      messages.map(mapMessage),
    ]
  ))
}

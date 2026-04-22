import * as run from "@razomy/run";
import type {AiMessage} from "../../../../message";
import {mapMessageBack} from "../logic/predict";

export function mapMessage(message: AiMessage) {
  if (message.type === 'text') {
    return {role: message.sender, content: message.content}
  }
  if (message.type === 'request') {
    return message;
  }
  throw new Error('unknown message' + message);
}

export async function predict(
  cache_id: string | null,
  model_id: string,
  messages: AiMessage[],
  tools
): Promise<AiMessage> {
  if (!cache_id) {
    return mapMessageBack(await run.server.call(
      'razomy.ai_hugging_face.chat.tool.predict',
      'predict',
      [
        model_id,
        messages.map(mapMessage),
        tools
      ],
    ))
  }
  return mapMessageBack(await run.server.call(
    'razomy.ai_hugging_face.chat.tool.predict',
    'cache_predict',
    [
      cache_id,
      model_id,
      messages.map(mapMessage),
      tools
    ],
  ))
}

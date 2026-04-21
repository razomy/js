import * as run from "@razomy/run";
import type {AiMessage, ToolsAiMessage} from "../../../../message";

export function mapMessage(message: AiMessage) {
  if (message.type === 'text') {
    return {role: message.sender, content: message.content}
  }
  if (message.type === 'function') {
    return message;
  }
  throw new Error('unknown message' + message);
}

export async function predict(
  cache_id: string | null,
  model_id: string,
  messages: AiMessage[],
  tools: ToolsAiMessage
): Promise<any> {
  if (!cache_id) {
    return run.server.call(
      'razomy.ai_hugging_face.chat.tool.predict',
      'predict',
      [
        model_id,
        messages.map(mapMessage),
        tools
      ],
    )
  }
  return run.server.call(
    'razomy.ai_hugging_face.chat.tool.predict',
    'cache_predict',
    [
      cache_id,
      model_id,
      messages.map(mapMessage),
      tools
    ],
  )
}

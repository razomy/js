import * as object from '@razomy/object';
import * as string from '@razomy/string';
import * as aiOpenai from "@razomy/ai-openai";

export async function gptApi(messageOrMessagesOrRequest) {
  if (string.isString(messageOrMessagesOrRequest)) {
    const req = { messages: [{ role: 'user', content: messageOrMessagesOrRequest }] };
    aiOpenai.setTokens(req);
    return (await aiOpenai.gptApiV2(req as any)).choices[0].message.content;
  } else if (Array.isArray(messageOrMessagesOrRequest)) {
    return (await aiOpenai.gptApiV2(messageOrMessagesOrRequest as any)).choices[0].message.content;
  } else if (object.isObject(messageOrMessagesOrRequest)) {
    aiOpenai.setTokens(messageOrMessagesOrRequest);
    return (await aiOpenai.gptApiV2(messageOrMessagesOrRequest)).choices[0].message.content;
  } else {
    throw new Error('Unknown request');
  }
}

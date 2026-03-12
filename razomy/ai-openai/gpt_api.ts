import { gptApiV2 } from './gpt_api_v_2';
import { setTokens } from './set_tokens';
import * as object from "@razomy/object";
import * as string from "@razomy/string";

export async function gptApi(messageOrMessagesOrRequest) {
  if (string.isString(messageOrMessagesOrRequest)) {
    const req = { messages: [{ role: 'user', content: messageOrMessagesOrRequest }] };
    setTokens(req);
    return (await gptApiV2(req as any)).choices[0].message.content;
  } else if (Array.isArray(messageOrMessagesOrRequest)) {
    return (await gptApiV2(messageOrMessagesOrRequest as any)).choices[0].message.content;
  } else if (object.isObject(messageOrMessagesOrRequest)) {
    setTokens(messageOrMessagesOrRequest);
    return (await gptApiV2(messageOrMessagesOrRequest)).choices[0].message.content;
  } else {
    throw new Error('Unknown request');
  }
}

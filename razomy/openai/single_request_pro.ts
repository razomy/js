import {models} from '@razomy/openai';
import {gptApiV2} from './gpt_api_v_2';
import {setTokens} from './set_tokens';

export async function singleRequestPro(text, model = models.expensive120000) {
  let messageOrMessagesOrRequest = {
    messages: [
      {
        role: 'system',
        content: text,
      },
    ],
    model: model,
  };
  messageOrMessagesOrRequest = setTokens(messageOrMessagesOrRequest);
  const result = await gptApiV2(messageOrMessagesOrRequest as any);
  const message = result.choices[0].message.content;
  return message;
}

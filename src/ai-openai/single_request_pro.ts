import * as aiOpenai from '@razomy/ai-openai';

export async function singleRequestPro(text, model = aiOpenai.MODELS.expensive120000) {
  let messageOrMessagesOrRequest = {
    messages: [
      {
        role: 'system',
        content: text,
      },
    ],
    model: model,
  };
  messageOrMessagesOrRequest = aiOpenai.setTokens(messageOrMessagesOrRequest);
  const result = await aiOpenai.gptApiV2(messageOrMessagesOrRequest as any);
  const message = result.choices[0].message.content;
  return message;
}

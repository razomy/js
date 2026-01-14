import models from 'razomy.openai/models';
import gpt_api_v2 from './gpt_api_v2';
import set_tokens from './set_tokens';

export default async function single_request_pro(text, model = models.expensive120000) {
    let message_or_messages_or_request = {
            messages: [
              {
                role: 'system',
                content: text,
              },
            ],
            model: model,
          };
    message_or_messages_or_request = set_tokens(message_or_messages_or_request);
    const result = await gpt_api_v2(message_or_messages_or_request as any);
    const message = result.choices[0].message.content;
    return message;
}

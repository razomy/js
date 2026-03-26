import Anthropic from '@anthropic-ai/sdk';
import {MAX_TOKENS, MODELS} from '../client';
import { CLIENT } from '../client';
import { continue_ } from './continue_';

export async function asks(texts: string[], systemText: string) {
  const requests: Anthropic.Messages.Batches.BatchCreateParams.Request[] = texts.map((text, index) => {
    return {
      custom_id: `req-${index + 1}`, // custom_ids must be unique per item in the batch
      params: {
        model: MODELS.expensive,
        max_tokens: MAX_TOKENS,
        system: systemText, // Anthropic system prompts go here
        messages: [{ role: 'user', content: text }],
      },
    };
  });
  const response = await CLIENT.messages.batches.create({
    requests,
  });
  const jobId = response.id;
  console.log(`Created Job ID: ${jobId}`);
  return await continue_(jobId);
}

import Anthropic from '@anthropic-ai/sdk';
import {maxTokens, models} from '../client';
import { client } from '../client';
import { continue_ } from './continue_';

export async function asks(texts: string[], systemText: string) {
  const requests: Anthropic.Messages.Batches.BatchCreateParams.Request[] = texts.map((text, index) => {
    return {
      custom_id: `req-${index + 1}`, // custom_ids must be unique per item in the batch
      params: {
        model: models.expensive,
        max_tokens: maxTokens,
        system: systemText, // Anthropic system prompts go here
        messages: [{ role: 'user', content: text }],
      },
    };
  });
  const response = await client.messages.batches.create({
    requests,
  });
  const jobId = response.id;
  console.log(`Created Job ID: ${jobId}`);
  return await continue_(jobId);
}

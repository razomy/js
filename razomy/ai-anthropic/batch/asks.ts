import Anthropic from '@anthropic-ai/sdk';
import * as aiAnthropic from "@razomy/ai-anthropic";

export async function asks(texts: string[], systemText: string) {
  const requests: Anthropic.Messages.Batches.BatchCreateParams.Request[] = texts.map((text, index) => {
    return {
      custom_id: `req-${index + 1}`, // custom_ids must be unique per item in the batch
      params: {
        model: aiAnthropic.MODELS.expensive,
        max_tokens: aiAnthropic.MAX_TOKENS,
        system: systemText, // Anthropic system prompts go here
        messages: [{ role: 'user', content: text }],
      },
    };
  });
  const response = await aiAnthropic.CLIENT.messages.batches.create({
    requests,
  });
  const jobId = response.id;
  console.log(`Created Job ID: ${jobId}`);
  return await aiAnthropic.batch.continue_(jobId);
}

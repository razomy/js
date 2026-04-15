import * as aiAnthropic from '@razomy/ai-anthropic';

export async function cancel(id) {
  await aiAnthropic.CLIENT.messages.batches.cancel(id);
}

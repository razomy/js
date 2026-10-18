import * as aiAnthropic from '@razomy/ai-anthropic';

export async function continue_(jobId: string) {
  await aiAnthropic.batch.wait(jobId);
  const result = await aiAnthropic.batch.getResult(jobId);
  aiAnthropic.batch.printPrice(result);
  await aiAnthropic.batch.delete_(jobId);
  return result.map((c) => ({ text: c.result.message.content[0]['text'] }));
}

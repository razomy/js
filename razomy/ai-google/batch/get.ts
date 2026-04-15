import * as aiGoogle from '@razomy/ai-google';

export async function get() {
  const batchJobs = await aiGoogle.CLIENT.batches.list({ config: { pageSize: 1000 } });
  return batchJobs;
}

import { client } from '../client';

export async function get() {
  const batchJobs = await client.batches.list({ config: { pageSize: 1000 } });
  return batchJobs;
}

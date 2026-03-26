import { CLIENT } from '../client';

export async function get() {
  const batchJobs = await CLIENT.batches.list({ config: { pageSize: 1000 } });
  return batchJobs;
}

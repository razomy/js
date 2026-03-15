import { ai } from '../call_tool';

export async function get() {
  const batchJobs = await ai.batches.list({ config: { pageSize: 1000 } });
  return batchJobs;
}

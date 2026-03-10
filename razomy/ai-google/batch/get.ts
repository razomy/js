import {ai} from '../client';

export async function get() {
  const batchJobs = await ai.batches.list({config:{pageSize:1000}});
  return batchJobs;
}

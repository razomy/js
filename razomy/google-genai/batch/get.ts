import {ai} from '../client';

export async function get() {
  const batchJobs = await ai.batches.list();
  return batchJobs;
}

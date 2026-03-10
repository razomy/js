import { ai } from '../client';

export async function wait(name: string) {
  let batchJob;
  const completedStates = new Set([
    'JOB_STATE_SUCCEEDED',
    'JOB_STATE_FAILED',
    'JOB_STATE_CANCELLED',
    'JOB_STATE_EXPIRED',
  ]);

  try {
    batchJob = await ai.batches.get({ name: name });
    let i = 0;
    while (!completedStates.has(batchJob.state)) {
      console.log(`Current state: ${batchJob.state} ${++i}`);
      // Wait for 30 seconds before polling again
      await new Promise((resolve) => setTimeout(resolve, 30000));
      batchJob = await ai.batches.get({ name: batchJob.name });
    }
    console.log(`Job finished with state: ${batchJob.state}`);
    if (batchJob.state === 'JOB_STATE_FAILED') {
      // The exact structure of `error` might vary depending on the SDK
      // This assumes `error` is an object with a `message` property.
      console.error(`Error: ${batchJob.state}`);
    }
  } catch (error) {
    console.error(`An error occurred while polling job ${batchJob.name}:`, error);
  }
}

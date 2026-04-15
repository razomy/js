import * as run from '@razomy/run';

export async function processJobMut(handlers: Map<string, run.task.TaskHandler<any>>, job: run.task.Task) {
  if (job.abortController.signal.aborted) return;

  const handler = handlers.get(job.type);
  if (!handler) {
    job.status = 'error';
    job.error = `No handler registered for job type: ${job.type}`;
    return;
  }

  job.status = 'processing';

  try {
    await handler(job);
    if (!job.abortController.signal.aborted) {
      job.status = 'completed';
    }
  } catch (err: any) {
    if (err.name === 'AbortError' || job.abortController.signal.aborted) {
      console.log(`Job ${job.id} was cancelled.`);
      job.status = 'cancelled';
      job.error = 'Job cancelled by user';
    } else {
      console.error(`Job ${job.id} failed:`, err);
      job.status = 'error';
      job.error = err.message || 'Unknown error';
    }
  }
}

import * as run from "@razomy/run";

export function cancelMut (jobs: Map<string, run.task.Task>, id: string) : boolean {
  const job = jobs.get(id);

  if (!job) return false;

  if (['completed', 'error', 'cancelled'].includes(job.status)) {
    return false;
  }

  job.abortController.abort();
  job.status = 'cancelled';

  return true;
}

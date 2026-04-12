import type {Task} from "./task_controller";

export function cancelMut (jobs: Map<string, Task>, id: string) : boolean {
  const job = jobs.get(id);

  if (!job) return false;

  if (['completed', 'error', 'cancelled'].includes(job.status)) {
    return false;
  }

  job.abortController.abort();
  job.status = 'cancelled';

  return true;
}

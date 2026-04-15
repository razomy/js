import { isMainThread, Worker } from 'worker_threads';
import * as thread from "@razomy/thread";

export function threadToPromise(ctx, { path, workerId }) {
  if (!isMainThread) {
    throw new Error('Thread must be Main');
  }

  const worker = new Worker(path, { env: { workerId } });
  return thread.workerToPromise(worker, ctx);
}

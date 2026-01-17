import {isMainThread, Worker} from 'worker_threads';
import {workerToPromise} from './worker_to_promise';


export function threadToPromise(ctx, {path, workerId}) {
  if (!isMainThread) {
    throw new Error('Thread must be Main')
  }

  const worker = new Worker(path, {env: {workerId}});
  return workerToPromise(worker, ctx);
}

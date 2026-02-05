import {Worker} from 'worker_threads';
import {WorkerEvent} from '@razomy/cluster';

export function workerToPromise<T>(worker: Worker, ctx: T) {
  return new Promise<T>((resolve, reject) => {
    let lastCtx: T;
    let lastError: Error;

    function errorHandle(error: Error) {
      return lastError = error;
    }

    function ctxHandle(data: WorkerEvent<T>) {
      if (data.id === 'set') {
        lastCtx = data.ctx
      } else if (data.id === 'get') {
        worker.postMessage({id: 'get', ctx});
      } else {
        throw new Error('Unknown event type' + data.id);
      }
    }

    worker.on('error', errorHandle)
    worker.on('message', ctxHandle);

    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(
          `Stopped the Worker Thread with the exit code: ${code}`));

      worker.off('error', errorHandle);
      worker.off('message', ctxHandle);
      if (lastError) {
        return reject(lastError);
      }
      return resolve(lastCtx);
    })
  })
}
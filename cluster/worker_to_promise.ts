import {Worker} from 'cluster';
import {WorkerEvent} from './worker';

export function worker_to_promise<T>(worker: Worker, ctx: T) {
  return new Promise<T>((resolve, reject) => {
    let last_ctx: T;
    let last_error: Error;
    function error_handle (error: Error) { return last_error = error; }
    function ctx_handle (data: WorkerEvent<T>) {
            if (data.id === 'set') {
              last_ctx = data.ctx
            } else if (data.id === 'get') {
              worker.send({id: 'get', ctx});
            } else {
              throw new Error('Unknown event type' + data.id);
            }
          }

    worker.on('error', error_handle)
    worker.on('message', ctx_handle);

    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(
          `Stopped the Worker Thread with the exit code: ${code}`));

      worker.off('error', error_handle);
      worker.off('message', ctx_handle);
      if (last_error) {
        return reject(last_error);
      }
      return resolve(last_ctx);
    })
  })
}
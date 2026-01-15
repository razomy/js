import {isMainThread, Worker} from 'worker_threads';
import {worker_to_promise} from './worker_to_promise';


export function thread_to_promise(ctx, {path, worker_id}) {
    if (!isMainThread) {
        throw new Error("Thread must be Main")
    }

    const worker = new Worker(path, {env: {worker_id}});
    return worker_to_promise(worker, ctx);
}



export * from './threads_to_promises';
export * from './threads_to_promise';

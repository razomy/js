import {isMainThread, Worker} from "worker_threads";
import {WorkerEvent} from "razomy.js/cluster/process_to_promise";


export function worker_to_promise<T>(worker: Worker, ctx: T) {
    return new Promise<T>((resolve, reject) => {
        let last_ctx: T;
        let last_error: Error;
        const error_handle = (error: Error) => last_error = error
        const ctx_handle = (data: WorkerEvent<T>) => {
            if (data.id === 'set') {
                last_ctx = data.ctx
            } else if (data.id === 'get') {
                worker.postMessage({id: 'get', ctx});
            } else {
                throw new Error("Unknown event type" + data.id);
            }
        }

        worker.on("error", error_handle)
        worker.on("message", ctx_handle);

        worker.on("exit", (code) => {
            if (code !== 0)
                reject(new Error(
                    `Stopped the Worker Thread with the exit code: ${code}`));

            worker.off("error", error_handle);
            worker.off("message", ctx_handle);
            if (last_error) {
                return reject(last_error);
            }
            return resolve(last_ctx);
        })
    })
}

export function thread_to_promise<T>(ctx, {path, worker_id}) {
    if (!isMainThread) {
        throw new Error("Thread must be Main")
    }

    const worker = new Worker(path, {env: {worker_id}});
    return worker_to_promise(worker, ctx);
}

export function threads_to_promises<T>(ctx, {path}) {
    if (!isMainThread) {
        throw new Error("Thread must be Main")
    }

    const promises: Promise<T>[] = [];
    const count = ctx.length;
    for (let i = 0; i < count; i++) {
        promises.push(thread_to_promise(ctx[i], {worker_id: i + "", path: path}));
    }

    return (promises);
}


export function threads_to_promise<T>(ctx, {path}) {
    return Promise.all(threads_to_promises(ctx, {path}));
}

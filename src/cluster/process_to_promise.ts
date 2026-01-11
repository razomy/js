import cluster, {ClusterSettings, Worker} from "cluster";
import child from "node:child_process";
import {Event} from "razomy/event/event_to_promise";


export interface WithWorkerId {
    worker_id: string;
}

export interface WorkerEvent<T> extends Event<T> {
    id: 'get' | 'set',
    ctx: T
}

export interface WorkerEnvironment extends WithWorkerId {
}

export function worker_to_promise<T>(worker: Worker, ctx: T) {
    return new Promise<T>((resolve, reject) => {
        let last_ctx: T;
        let last_error: Error;
        const error_handle = (error: Error) => last_error = error
        const ctx_handle = (data: WorkerEvent<T>) => {
            if (data.id === 'set') {
                last_ctx = data.ctx
            } else if (data.id === 'get') {
                worker.send({id: 'get', ctx});
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

export function process_to_promise<T extends child.Serializable>(ctx: T, env: WorkerEnvironment): Promise<T> {
    if (!cluster.isPrimary) {
        throw new Error("Cluster must be primary")
    }

    const worker = cluster.fork(env);
    return worker_to_promise<T>(worker, ctx)
}

export function processes_to_promises<T extends child.Serializable>(ctx: T[], settings: ClusterSettings): Promise<T>[] {
    if (!cluster.isPrimary) {
        throw new Error("Cluster must be primary")
    }

    const promises: Promise<T>[] = [];
    const count = ctx.length;
    for (let i = 0; i < count; i++) {
        promises.push(new Promise(async (resolve) => {
            const prev_settings = cluster.settings;
            cluster.setupPrimary(settings);
            const result = await process_to_promise(ctx[i], {worker_id: i + ""})
            cluster.setupPrimary(prev_settings);
            return resolve(result);
        }));
    }

    return promises;
}


export function processes_to_promise<T extends child.Serializable>(ctx: T[], settings: ClusterSettings): Promise<T[]> {
    return Promise.all(processes_to_promises(ctx, settings));
}

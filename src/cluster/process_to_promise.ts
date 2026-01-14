import cluster from 'cluster';
import child from 'node:child_process';
import worker_to_promise from './worker_to_promise';
import {WorkerEnvironment} from './worker';

export default function process_to_promise<T extends child.Serializable>(ctx: T, env: WorkerEnvironment): Promise<T> {
    if (!cluster.isPrimary) {
        throw new Error("Cluster must be primary")
    }

    const worker = cluster.fork(env);
    return worker_to_promise<T>(worker, ctx)
}



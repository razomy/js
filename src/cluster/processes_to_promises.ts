import cluster, { ClusterSettings} from 'cluster';
import child from 'node:child_process';
import {process_to_promise} from './process_to_promise';

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
            const result = await process_to_promise(ctx[i], {worker_id: i + ''})
            cluster.setupPrimary(prev_settings);
            return resolve(result);
        }));
    }

    return promises;
}
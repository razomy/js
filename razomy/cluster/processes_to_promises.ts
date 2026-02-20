import cluster, {type ClusterSettings} from 'cluster';
import child from 'node:child_process';
import {processToPromise} from './process_to_promise';

export function processesToPromises<T extends child.Serializable>(ctx: T[], settings: ClusterSettings): Promise<T>[] {
  if (!cluster.isPrimary) {
    throw new Error('Cluster must be primary')
  }

  const promises: Promise<T>[] = [];
  const count = ctx.length;
  for (let i = 0; i < count; i++) {
    promises.push(new Promise(async (resolve) => {
      const prevSettings = cluster.settings;
      cluster.setupPrimary(settings);
      const result = await processToPromise(ctx[i], {workerId: i + ''})
      cluster.setupPrimary(prevSettings);
      return resolve(result);
    }));
  }

  return promises;
}
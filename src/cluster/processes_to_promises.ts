import cluster, { type ClusterSettings } from 'cluster';
import child from 'node:child_process';
import * as cluster_ from '@razomy/cluster';

export function processesToPromises<T extends child.Serializable>(ctx: T[], settings: ClusterSettings): Promise<T>[] {
  if (!cluster.isPrimary) {
    throw new Error('Cluster must be primary');
  }

  const promises: Promise<T>[] = [];
  const count = ctx.length;
  for (let i = 0; i < count; i++) {
    promises.push(
      new Promise(async (resolve) => {
        const prevSettings = cluster.settings;
        cluster.setupPrimary(settings);
        const result = await cluster_.processToPromise(ctx[i], { workerId: i + '' });
        cluster.setupPrimary(prevSettings);
        return resolve(result);
      }),
    );
  }

  return promises;
}

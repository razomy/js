import child from 'node:child_process';
import type { ClusterSettings } from 'cluster';
import * as cluster from '@razomy/cluster';

export function processesToPromise<T extends child.Serializable>(ctx: T[], settings: ClusterSettings): Promise<T[]> {
  return Promise.all(cluster.processesToPromises(ctx, settings));
}

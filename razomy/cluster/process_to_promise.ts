import cluster from 'cluster';
import child from 'node:child_process';
import * as cluster_ from "@razomy/cluster";

export function processToPromise<T extends child.Serializable>(ctx: T, env: cluster_.WorkerEnvironment): Promise<T> {
  if (!cluster.isPrimary) {
    throw new Error('Cluster must be primary');
  }

  const worker = cluster.fork(env);
  return cluster_.workerToPromise<T>(worker, ctx);
}

import cluster from 'cluster';
import child from 'node:child_process';
import {workerToPromise} from './worker_to_promise';
import type {WorkerEnvironment} from './worker';

export function processToPromise<T extends child.Serializable>(ctx: T, env: WorkerEnvironment): Promise<T> {
  if (!cluster.isPrimary) {
    throw new Error('Cluster must be primary')
  }

  const worker = cluster.fork(env);
  return workerToPromise<T>(worker, ctx)
}



import child from 'node:child_process';
import {ClusterSettings} from 'cluster';
import {processesToPromises} from './processes_to_promises';

export function processesToPromise<T extends child.Serializable>(ctx: T[], settings: ClusterSettings): Promise<T[]> {
  return Promise.all(processesToPromises(ctx, settings));
}
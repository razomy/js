import child from 'node:child_process';
import {ClusterSettings} from 'cluster';
import {processes_to_promises} from './processes_to_promises';

export function processes_to_promise<T extends child.Serializable>(ctx: T[], settings: ClusterSettings): Promise<T[]> {
  return Promise.all(processes_to_promises(ctx, settings));
}
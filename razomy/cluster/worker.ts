import * as future from '@razomy/future';

export interface HasWorkerId {
  workerId: string;
}

export interface WorkerEvent<T> extends future.Event<T> {
  id: 'get' | 'set';
  ctx: T;
}

export interface WorkerEnvironment extends HasWorkerId {}

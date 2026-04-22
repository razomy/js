import * as future from '@razomy/future';

export interface WithWorkerId {
  workerId: string;
}

export interface WorkerEvent<T> extends future.Event<T> {
  id: 'get' | 'set';
  ctx: T;
}

export interface WorkerEnvironment extends WithWorkerId {}

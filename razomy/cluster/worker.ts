import * as async from '../future';

export interface WithWorkerId {
  workerId: string;
}

export interface WorkerEvent<T> extends async.Event<T> {
  id: 'get' | 'set';
  ctx: T;
}

export interface WorkerEnvironment extends WithWorkerId {}

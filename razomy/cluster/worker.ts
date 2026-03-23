import * as event from '@razomy/async';

export interface WithWorkerId {
  workerId: string;
}

export interface WorkerEvent<T> extends event.Event<T> {
  id: 'get' | 'set';
  ctx: T;
}

export interface WorkerEnvironment extends WithWorkerId {}

import {Event} from 'razomy.event/event_to_promise';

export interface WithWorkerId {
  worker_id: string;
}

export interface WorkerEvent<T> extends Event<T> {
  id: 'get' | 'set',
  ctx: T
}

export interface WorkerEnvironment extends WithWorkerId {
}

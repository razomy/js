export interface HasWorkerId {
  workerId: string;
}

export interface WorkerEvent<T> {
  id: 'get' | 'set';
  ctx: T;
}

export interface WorkerEnvironment extends HasWorkerId {}

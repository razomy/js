import {Serializable} from 'razomy/serializable/serializable';
import {WithSerializable} from 'razomy.serializable';

export interface Context<T extends Serializable> extends WithSerializable<T> {
}

export interface WithContext<C extends Serializable, T extends Context<C>> {
  c: T;
}

export interface WithAsyncExecute<T> {
  execute: (c: T) => Promise<void>;
}

export interface WithAsyncCancel<T> {
  cancel: (c: T) => Promise<void>;
}

export interface WithAsyncRollback<T> {
  rollback: (c: T) => Promise<void>;
}

export interface AsyncTask<C extends Serializable, T extends Context<C>>
  extends WithContext<C, T>,
    WithAsyncExecute<T>,
    WithAsyncCancel<T>,
    WithAsyncRollback<T> {
  task_id: string;
  history: T[];
}

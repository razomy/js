import {Serializable} from 'razomy.serializable/serializable';
import {WithSerializable} from 'razomy.serializable';

export interface Context extends WithSerializable {
}

export interface WithContext<C extends Context> {
  c: C;
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

export interface WithValidate<T> {
  validate: (c: T) => Promise<void>;
}


export interface AsyncTask<C extends Context>
  extends WithContext<C>,
    WithAsyncExecute<C>,
    WithValidate<C>,
    WithAsyncCancel<C>,
    WithAsyncRollback<C> {
  task_id: string;
  history: C[];
}

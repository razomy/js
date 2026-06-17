// import * as serializable from '@razomy/abstracts';

export interface Context {}//extends serializable.HasSerializable {}

export interface HasContext<C extends Context> {
  c: C;
}

export interface HasAsyncExecute<T> {
  execute: (c: T) => Promise<void>;
}

export interface HasAsyncCancel<T> {
  cancel: (c: T) => Promise<void>;
}

export interface HasAsyncRollback<T> {
  rollback: (c: T) => Promise<void>;
}

export interface HasValidate<T> {
  validate: (c: T) => Promise<void>;
}

export interface AsyncTask<C extends Context>
  extends HasContext<C>,
    HasAsyncExecute<C>,
    HasValidate<C>,
    HasAsyncCancel<C>,
    HasAsyncRollback<C> {
  taskId: string;
  history: C[];
}

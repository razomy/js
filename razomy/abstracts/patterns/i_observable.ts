import * as abstracts from '@razomy/abstracts';

export type Dispose = () => void;

export type IObservableFactory<T = any> = (resolve: abstracts.functions.Action<[T]>) => Dispose;
export interface IObservable<T = any, E = any> {
  next: abstracts.functions.Action<[T]>;
  exception: abstracts.functions.Action<[E]>;
  execute(): void;
  dispose(): void;
}

import * as abstractions from '@razomy/abstractions';

export type Dispose = () => void;

export type IObservableFactory<T = any> = (resolve: abstractions.functions.Action<[T]>) => Dispose;
export interface IObservable<T = any, E = any> {
  next: abstractions.functions.Action<[T]>;
  exception: abstractions.functions.Action<[E]>;
  execute(): void;
  dispose(): void;
}

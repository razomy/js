import * as abstractions from '@razomy/abstractions';

export type Dispose = () => void;

export type IObservableFactory<T = any> = (resolve: abstractions.function_.Action<[T]>) => Dispose;
export interface IObservable<T = any, E = any> {
  next: abstractions.function_.Action<[T]>;
  exception: abstractions.function_.Action<[E]>;
  execute(): void;
  dispose(): void;
}

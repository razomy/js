import {CancelException} from './exceptions';
import {Dispose} from './dispose';
import {throw_exception} from './throw_exception';
import {Action} from 'razomy.action';

export class Observable<T, E = CancelException> {
  dispose_fn: Dispose | null = null;
  next: Action<T> | undefined;
  exception: Action<E> = throw_exception;
  factory: (resolve: Action<T>) => Dispose;

  constructor(factory: (resolve: Action<T>) => Dispose) {
    this.factory = factory;
  }

  execute() {
    return this.dispose_fn = this.factory(this.next!);
  }

  dispose() {
    this.dispose_fn!();
    this.dispose_fn = null;
  }
}
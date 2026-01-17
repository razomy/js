import {CancelException} from './exceptions';
import {Dispose} from './dispose';
import {throwException} from './throw_exception';
import {Action} from 'razomy.action';

export class Observable<T, E = CancelException> {
  disposeFn: Dispose | null = null;
  next: Action<T> | undefined;
  exception: Action<E> = throwException;
  factory: (resolve: Action<T>) => Dispose;

  constructor(factory: (resolve: Action<T>) => Dispose) {
    this.factory = factory;
  }

  execute() {
    return this.disposeFn = this.factory(this.next!);
  }

  dispose() {
    this.disposeFn!();
    this.disposeFn = null;
  }
}
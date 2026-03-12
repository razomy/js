import type { Dispose } from '../abstracts/functions/dispose';
import { throwException } from './throw_exception';
import type { Action } from '@razomy/abstracts/functions';
import type { CancelException } from './cancel_exception';

export class Observable<T, E = CancelException> {
  disposeFn: Dispose | null = null;
  next: Action<T> | undefined;
  exception: Action<E> = throwException;
  factory: (resolve: Action<T>) => Dispose;

  constructor(factory: (resolve: Action<T>) => Dispose) {
    this.factory = factory;
  }

  execute() {
    return (this.disposeFn = this.factory(this.next!));
  }

  dispose() {
    this.disposeFn!();
    this.disposeFn = null;
  }
}

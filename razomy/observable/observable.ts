import type { Dispose } from '../abstracts/functions/dispose';
import { throwException } from './throw_exception';
import type { CancelException } from './cancel_exception';
import * as abstracts from '@razomy/abstracts';

export class Observable<T, E = CancelException> {
  disposeFn: Dispose | null = null;
  next: abstracts.functions.Action<T> | undefined;
  exception: abstracts.functions.Action<E> = throwException;
  factory: (resolve: abstracts.functions.Action<T>) => Dispose;

  constructor(factory: (resolve: abstracts.functions.Action<T>) => Dispose) {
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

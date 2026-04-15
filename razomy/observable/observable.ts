import * as abstracts from '@razomy/abstracts';
import * as observable from '@razomy/observable';

export class Observable<T, E = observable.CancelException> {
  disposeFn: abstracts.functions.Dispose | null = null;
  next: abstracts.functions.Action<T> | undefined;
  exception: abstracts.functions.Action<E> = observable.throwException;
  factory: (resolve: abstracts.functions.Action<T>) => abstracts.functions.Dispose;

  constructor(factory: (resolve: abstracts.functions.Action<T>) => abstracts.functions.Dispose) {
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

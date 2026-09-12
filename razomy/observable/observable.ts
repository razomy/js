import * as abstracts from '@razomy/abstracts';
import * as exceptions from "@razomy/exceptions";

// todo:remove
export class Observable<T, E = exceptions.CancelException> {
  disposeFn: abstracts.functions.Dispose | null = null;
  next: abstracts.functions.Action<[T]> | undefined;
  exception: abstracts.functions.Action<[E]> = exceptions.throwException;
  factory: (resolve: abstracts.functions.Action<[T]>) => abstracts.functions.Dispose;

  constructor(factory: (resolve: abstracts.functions.Action<[T]>) => abstracts.functions.Dispose) {
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

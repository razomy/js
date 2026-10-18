import * as abstractions from '@razomy/abstractions';
import * as exceptions from "@razomy/exceptions";

// todo:remove
export class Observable<T, E = exceptions.CancelException> {
  disposeFn: abstractions.patterns.Dispose | null = null;
  next: abstractions.function_.Action<[T]> | undefined;
  exception: abstractions.function_.Action<[E]> = exceptions.throwException;
  factory: (resolve: abstractions.function_.Action<[T]>) => abstractions.patterns.Dispose;

  constructor(factory: (resolve: abstractions.function_.Action<[T]>) => abstractions.patterns.Dispose) {
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

import {Dispose} from 'razomy.observable/dispose';
import {Action} from 'razomy.action/action';
import {CancelException} from 'razomy.observable/exceptions/cancel_exception';

export function throw_exception<E>(error: E): void {
  throw error;
}

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


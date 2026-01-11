import {Dispose} from "razomy/observable/dispose";
import {Action} from "razomy/action/action";
import {CancelException} from "razomy/observable/exceptions/cancel_exception";

function throw_exception<E>(error: E): void {
  throw error;
}

export class Observable<T, E = CancelException> {
  _dispose: Dispose | null = null;
  next: Action<T> | undefined;
  exception: Action<E> = throw_exception;
  factory: (resolve: Action<T>) => Dispose;

  constructor(factory: (resolve: Action<T>) => Dispose) {
    this.factory = factory;
  }

  execute() {
    return this._dispose = this.factory(this.next!);
  }

  dispose() {
    this._dispose!();
    this._dispose = null;
  }
}


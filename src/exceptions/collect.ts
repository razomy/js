import {Exception} from 'razomy.js/exceptions/exception';

export type CatchFn = (throwable_fn: () => void) => void;

export class CollectException {
  errors: Exception[];

  constructor() {
    this.errors = [] as Exception[];
  }

  catch_fn(throwable_fn: () => void) {
    try {
      return throwable_fn();
    } catch (e) {
      if (e instanceof Exception) {
        this.errors.push(e);
      } else {
        throw e
      }
    }
  }
}

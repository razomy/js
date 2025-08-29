import {Exception} from "razomy.js/exceptions/exception";

export type CatchFn = (throwable_fn: () => void) => void;

export function collect(context_fn: (catch_fn_: CatchFn) => void) {
  const errors = [] as Error[];

  function catch_fn(throwable_fn: () => void) {
    try {
      return throwable_fn();
    } catch (e) {
      if (e instanceof Exception) {
        errors.push(e);
      }
    }
  }

  context_fn(catch_fn);

  return errors;
}

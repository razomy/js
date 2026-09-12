// Imports
import { create } from './create';
import { Debounce } from './debounce';
import { delay } from './delay';
import { freeze } from './freeze';
import { isPromise } from './is_promise';
import { loop } from './loop';
import { parallel } from './parallel';
import { sequentially } from './sequentially';
import { tryPromise } from './try_promise';

// Named exports
export {
  Debounce,
  create,
  delay,
  freeze,
  isPromise,
  loop,
  parallel,
  sequentially,
  tryPromise
};

// Default export
const future = {
  create,
  Debounce,
  delay,
  freeze,
  isPromise,
  loop,
  parallel,
  sequentially,
  tryPromise,
};

export default future;

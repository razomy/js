// Imports
import { create } from './create';
import { Debounce } from './debounce';
import { delay } from './delay';
import { eventToPromise } from './event_to_promise';
import type { Event } from './event_to_promise';
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
  eventToPromise,
  freeze,
  isPromise,
  loop,
  parallel,
  sequentially,
  tryPromise
};
export type {
  Event
};

// Default export
const future = {
  create,
  Debounce,
  delay,
  eventToPromise,
  freeze,
  isPromise,
  loop,
  parallel,
  sequentially,
  tryPromise,
};


export default future;

import {threadsToPromises} from './threads_to_promises';

export function threadsToPromise(ctx, {path}) {
  return Promise.all(threadsToPromises(ctx, {path}));
}

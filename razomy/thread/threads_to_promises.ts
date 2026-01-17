import {isMainThread} from 'worker_threads';

import {threadToPromise} from './thread_to_promise';

export function threadsToPromises<T>(ctx, {path}) {
  if (!isMainThread) {
    throw new Error('Thread must be Main')
  }

  const promises: Promise<T>[] = [];
  const count = ctx.length;
  for (let i = 0; i < count; i++) {
    promises.push(threadToPromise(ctx[i], {workerId: i + '', path: path}));
  }

  return (promises);
}

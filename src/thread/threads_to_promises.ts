import { isMainThread } from 'worker_threads';
import * as thread from '@razomy/thread';

export function threadsToPromises<T>(ctx, { path }) {
  if (!isMainThread) {
    throw new Error('Thread must be Main');
  }

  const promises: Promise<T>[] = [];
  const count = ctx.length;
  for (let i = 0; i < count; i++) {
    promises.push(thread.threadToPromise(ctx[i], { workerId: i + '', path: path }));
  }

  return promises;
}

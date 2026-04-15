import * as thread from '@razomy/thread';

export function threadsToPromise(ctx, { path }) {
  return Promise.all(thread.threadsToPromises(ctx, { path }));
}

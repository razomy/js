import { isMainThread } from 'worker_threads';

import {thread_to_promise} from './thread_to_promise';

export function threads_to_promises<T>(ctx, {path}) {
    if (!isMainThread) {
        throw new Error("Thread must be Main")
    }

    const promises: Promise<T>[] = [];
    const count = ctx.length;
    for (let i = 0; i < count; i++) {
        promises.push(thread_to_promise(ctx[i], {worker_id: i + '', path: path}));
    }

    return (promises);
}

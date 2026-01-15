import {threads_to_promises} from './threads_to_promises';

export function threads_to_promise(ctx, {path}) {
    return Promise.all(threads_to_promises(ctx, {path}));
}

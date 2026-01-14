import {Pipe} from './pipe';

export async function execute_async<I1, O1>(arr: [Pipe<I1, any>, ...any, Pipe<any, O1>], args: I1) {
    let next_value: any = args;
    for (let i = 0; i < arr.length; i++) {
    const fn = arr[i];
    next_value = await fn(next_value);
    }

    return next_value as O1;
}

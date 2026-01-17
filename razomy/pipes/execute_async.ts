import {Pipe} from './line';

export async function executeAsync<I1, O1>(arr: [Pipe<I1, any>, ...any, Pipe<any, O1>], args: I1) {
  let nextValue: any = args;
  for (let i = 0; i < arr.length; i++) {
    const fn = arr[i];
    nextValue = await fn(nextValue);
  }

  return nextValue as O1;
}

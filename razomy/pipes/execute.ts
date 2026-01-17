import {Pipe} from './line';

export type ExecuteAny = (input: unknown) => unknown

export type Execute<I, O> = (input: I) => O

export function execute<I1, O1>(
  arr: [Pipe<I1, any>, ...any, Pipe<any, O1>],
  args: I1
);
export function execute(
  arr: ExecuteAny[],
  args?: any
);
export function execute<I1, O1>(
  arr: Pipe<any, any>[],
  args: I1
);
export function execute<I1, O1>(
  arr: Pipe<any, any>[],
  args: I1
)
  : O1 {
  let nextValue: any = args;
  for (let i = 0; i < arr.length; i++) {
    const fn = arr[i];
    nextValue = fn(nextValue);
  }
  return nextValue as O1;
}
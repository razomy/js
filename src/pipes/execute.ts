import {ExecuteAny, Pipe} from './pipe';

export type Execute<I, O> = (input: I) => O
export default function execute<I1, O1>(
  arr: [Pipe<I1, any>, ...any, Pipe<any, O1>],
  args: I1
);
export default function execute(
  arr: ExecuteAny[],
  args?: any
);
export default function execute<I1, O1>(
  arr: Pipe<any, any>[],
  args: I1
);
export default function execute<I1, O1>(
  arr: Pipe<any, any>[],
  args: I1
)
  : O1 {
  let next_value: any = args;
  for (let i = 0; i < arr.length; i++) {
    const fn = arr[i];
    next_value = fn(next_value);
  }
  return next_value as O1;
}
type ExecuteAny = (input: unknown) => unknown
type Execute<I, O> = (input: I) => O
export type Pipe<I1, O1 = I1> = Execute<I1, O1>


type P1<I1, O1> = [Pipe<I1, O1>]
type P2<I1, O1, O2> = [...P1<I1, O1>, Pipe<O1, O2>]
type P3<I1, I2, O1, O2> = [...P2<I1, I2, O1>, Pipe<O1, O2>]
type P4<I1, I2, I3, O1, O2> = [...P3<I1, I2, I3, O1>, Pipe<O1, O2>]
type P5<I1, I2, I3, I4, O1, O2> = [...P4<I1, I2, I3, I4, O1>, Pipe<O1, O2>]
type P6<I1, I2, I3, I4, I5, O1, O2> = [...P5<I1, I2, I3, I4, I5, O1>, Pipe<O1, O2>]
type P7<I1, I2, I3, I4, I5, I6, O1, O2> = [...P6<I1, I2, I3, I4, I5, I6, O1>, Pipe<O1, O2>]
type P8<I1, I2, I3, I4, I5, I6, I7, O1, O2> = [...P7<I1, I2, I3, I4, I5, I6, I7, O1>, Pipe<O1, O2>]
type P9<I1, I2, I3, I4, I5, I6, I7, I8, O1, O2> = [...P8<I1, I2, I3, I4, I5, I6, I7, I8, O1>, Pipe<O1, O2>]

export function line<I1, I2, I3, I4, I5, I6, I7, I8, O1, O2>(...array: P9<I1, I2, I3, I4, I5, I6, I7, I8, O1, O2>): P9<I1, I2, I3, I4, I5, I6, I7, I8, O1, O2>
export function line<I1, I2, I3, I4, I5, I6, I7, O1, O2>(...array: P8<I1, I2, I3, I4, I5, I6, I7, O1, O2>): P8<I1, I2, I3, I4, I5, I6, I7, O1, O2>
export function line<I1, I2, I3, I4, I5, I6, O1, O2>(...array: P7<I1, I2, I3, I4, I5, I6, O1, O2>): P7<I1, I2, I3, I4, I5, I6, O1, O2>
export function line<I1, I2, I3, I4, I5, O1, O2>(...array: P6<I1, I2, I3, I4, I5, O1, O2>): P6<I1, I2, I3, I4, I5, O1, O2>
export function line<I1, I2, I3, I4, O1, O2>(...array: P5<I1, I2, I3, I4, O1, O2>): P5<I1, I2, I3, I4, O1, O2>
export function line<I1, I2, I3, O1, O2>(...array: P4<I1, I2, I3, O1, O2>): P4<I1, I2, I3, O1, O2>
export function line<I1, I2, O1, O2>(...array: P3<I1, I2, O1, O2>): P3<I1, I2, O1, O2>
export function line<I1, O1, O2>(...array: P2<I1, O1, O2>): P2<I1, O1, O2>
export function line<I1, O1>(...array: P1<I1, O1>): P1<I1, O1>
export function line<T>(...array: T[]): T[] {
  return array;
}

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
  let next_value: any = args;
  for (let i = 0; i < arr.length; i++) {
    const fn = arr[i];
    next_value = fn(next_value);
  }
  return next_value as O1;
}

export async function execute_async<I1, O1>(
  arr: [Pipe<I1, any>, ...any, Pipe<any, O1>],
  args: I1
) {
  let next_value: any = args;
  for (let i = 0; i < arr.length; i++) {
    const fn = arr[i];
    next_value = await fn(next_value);
  }
  return next_value as O1;
}

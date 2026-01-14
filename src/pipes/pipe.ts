export type ExecuteAny = (input: unknown) => unknown
export type Execute<I, O> = (input: I) => O
export type Pipe<I1, O1 = I1> = Execute<I1, O1>


export type P1<I1, O1> = [Pipe<I1, O1>]
export type P2<I1, O1, O2> = [...P1<I1, O1>, Pipe<O1, O2>]
export type P3<I1, I2, O1, O2> = [...P2<I1, I2, O1>, Pipe<O1, O2>]
export type P4<I1, I2, I3, O1, O2> = [...P3<I1, I2, I3, O1>, Pipe<O1, O2>]
export type P5<I1, I2, I3, I4, O1, O2> = [...P4<I1, I2, I3, I4, O1>, Pipe<O1, O2>]
export type P6<I1, I2, I3, I4, I5, O1, O2> = [...P5<I1, I2, I3, I4, I5, O1>, Pipe<O1, O2>]
export type P7<I1, I2, I3, I4, I5, I6, O1, O2> = [...P6<I1, I2, I3, I4, I5, I6, O1>, Pipe<O1, O2>]
export type P8<I1, I2, I3, I4, I5, I6, I7, O1, O2> = [...P7<I1, I2, I3, I4, I5, I6, I7, O1>, Pipe<O1, O2>]
export type P9<I1, I2, I3, I4, I5, I6, I7, I8, O1, O2> = [...P8<I1, I2, I3, I4, I5, I6, I7, I8, O1>, Pipe<O1, O2>]

export default function line<I1, I2, I3, I4, I5, I6, I7, I8, O1, O2>(...array: P9<I1, I2, I3, I4, I5, I6, I7, I8, O1, O2>): P9<I1, I2, I3, I4, I5, I6, I7, I8, O1, O2>
export default function line<I1, I2, I3, I4, I5, I6, I7, O1, O2>(...array: P8<I1, I2, I3, I4, I5, I6, I7, O1, O2>): P8<I1, I2, I3, I4, I5, I6, I7, O1, O2>
export default function line<I1, I2, I3, I4, I5, I6, O1, O2>(...array: P7<I1, I2, I3, I4, I5, I6, O1, O2>): P7<I1, I2, I3, I4, I5, I6, O1, O2>
export default function line<I1, I2, I3, I4, I5, O1, O2>(...array: P6<I1, I2, I3, I4, I5, O1, O2>): P6<I1, I2, I3, I4, I5, O1, O2>
export default function line<I1, I2, I3, I4, O1, O2>(...array: P5<I1, I2, I3, I4, O1, O2>): P5<I1, I2, I3, I4, O1, O2>
export default function line<I1, I2, I3, O1, O2>(...array: P4<I1, I2, I3, O1, O2>): P4<I1, I2, I3, O1, O2>
export default function line<I1, I2, O1, O2>(...array: P3<I1, I2, O1, O2>): P3<I1, I2, O1, O2>
export default function line<I1, O1, O2>(...array: P2<I1, O1, O2>): P2<I1, O1, O2>
export default function line<I1, O1>(...array: P1<I1, O1>): P1<I1, O1>
export default function line<T>(...array: T[]): T[] {
  return array;
}


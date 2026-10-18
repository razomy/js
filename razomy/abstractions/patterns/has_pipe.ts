import * as abstractions from "@razomy/abstractions";

export type HasPipe<TA extends any[], TR = any> = abstractions.function_.HasArgs<TA> & abstractions.function_.HasFn<TA, TR>;

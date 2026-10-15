import * as abstractions from "@razomy/abstractions";

export type HasPipe<TA extends any[], TR = any> = abstractions.functions.HasArgs<TA> & abstractions.functions.HasFn<TA, TR>;

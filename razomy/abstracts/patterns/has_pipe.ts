import * as abstracts from "@razomy/abstracts";

export type HasPipe<TA extends any[], TR = any> = abstracts.functions.HasArgs<TA> & abstracts.functions.HasFn<TA, TR>;

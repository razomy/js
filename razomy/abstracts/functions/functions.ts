import * as abstracts from "@razomy/abstracts";

export type Thunk = () => void;
export type Action<TA extends any[]> = (...args: TA) => void;
export type Function<TA extends any[], TR> = (...args: TA) => TR;
export type Method<TC extends any, TA extends any[], TR> = (this: TC, ...args: TA) => TR;

export type Callback = () => void;
export type Dispose = () => void;

export type Construct<TA extends any[], TC> = new (...args: TA) => TC;

export interface HasArgs<TA extends any[]> extends abstracts.meta.IHas {
  args: TA
}

export interface HasFn<TA extends any[], TR> extends abstracts.meta.IHas {
  fn: (...value: TA) => TR;
}

export interface HasMethod<TC extends any, TA extends any[], TR> extends abstracts.meta.IHas {
  method: (this: TC, ...args: TA) => TR;
}

export interface HasPipe<TA extends any[], TR = Promise<any>> extends HasArgs<TA>, HasFn<TA, TR> {
}

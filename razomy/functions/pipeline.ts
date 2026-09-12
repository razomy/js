import * as abstracts from "@razomy/abstracts";

export class Pipeline<TA, TR = TA> {
  public constructor(
    private readonly pipes: abstracts.functions.HasPipe<any, any>[] = []) {
  }

  public p<TN, TR2 = TR>(pipeline: Pipeline<TR2, TN>): Pipeline<TA, TN>;
  public p<TN>(fn: (input: TR) => TN): Pipeline<TA, TN>;
  public p<Item, Res, TN>(this: Pipeline<TA, Item[]>,
                          fn: (array: Item[], callback: (item: Item, index: number, array: Item[]) => Res) => TN,
                          callback: (item: Item, index: number, array: Item[]) => Res
  ): Pipeline<TA, TN>;
  public p<Item, Acc>(
    this: Pipeline<TA, Item[]>,
    fn: (array: Item[], reducer: (acc: Acc, item: Item, index: number) => Acc, initial: Acc) => Acc,
    reducer: (acc: Acc, item: Item, index: number) => Acc,
    initial: Acc
  ): Pipeline<TA, Acc>;
  public p<A1, TN>(fn: (input: TR, a1: A1) => TN, a1: A1): Pipeline<TA, TN>;
  public p<A1, A2, TN>(fn: (input: TR, a1: A1, a2: A2) => TN, a1: A1, a2: A2): Pipeline<TA, TN>;
  public p<Args extends any[], TN>(fn: (input: TR, ...args: Args) => TN, ...args: Args): Pipeline<TA, TN>;
  public p(fnOrPipe: any, ...args: any[]): any {
    const fn = fnOrPipe instanceof Pipeline ? fnOrPipe.execute : fnOrPipe;
    return new Pipeline([
      ...this.pipes,
      {fn, args}
    ]);
  }

  public execute: (
    ...args: [TA] extends [void] ? [initialValue?: void] : [initialValue: TA]
  ) => TR = (...args: any[]): TR => {
    const initialValue = args[0];
    return this.pipes.reduce((currentValue, step) => {
      return step.fn(currentValue, ...step.args);
    }, initialValue);
  };
}

export function pl<TR>(fn: () => TR): Pipeline<void, TR>;
export function pl<TA, TR>(fn: (input: TA) => TR): Pipeline<TA, TR>;
export function pl<TA, Args extends any[], TR>(fn: (input: TA, ...args: Args) => TR, ...args: Args): Pipeline<TA, TR>;
export function pl(): Pipeline<void, void>;
export function pl(fn?: any, ...args: any[]): any {
  if (!fn) {
    return new Pipeline<void, void>([]);
  }
  return new Pipeline([
    {fn, args}
  ]);
}

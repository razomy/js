import * as abstracts from '@razomy/abstracts';

export type Function<TA extends any[], TR = void> = (...args: TA) => TR;
export type Thunk = () => void;
export type Action<TA extends any[]> = (...args: TA) => void;
export type Method<TC extends any, TA extends any[], TR> = (this: TC, ...args: TA) => TR;
export type Construct<TA extends any[], TC> = new (...args: TA) => TC;
export type Extension<TC extends any, TA extends any[], TR> = (ctx: TC, ...args: TA) => TR;
export type ExtensionByGenerics<Egs extends ExtensionGenerics = ExtensionGenerics> = (
  ctx: Egs['c'],
  ...args: Egs['a']
) => Egs['r'];

export type ExtensionGenerics<TC = any, TA extends any[] = any[], TR = any> = {
  c: TC;
  a: TA;
  r: TR;
};

export type HasArgs<TA extends any[]> = abstracts.meta.IHas & {
  args: TA;
};

export type HasFn<TA extends any[], TR> = abstracts.meta.IHas & {
  fn: (...value: TA) => TR;
};

export type HasMethod<TC extends any, TA extends any[], TR> = abstracts.meta.IHas & {
  method: (this: TC, ...args: TA) => TR;
};

export type HasExtension<Egs extends ExtensionGenerics = ExtensionGenerics> = abstracts.meta.IHas & {
  call: ExtensionByGenerics<Egs>;
};

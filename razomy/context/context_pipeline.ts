import * as context from '@razomy/context';
import * as abstracts from "@razomy/abstracts";

/**
 * Минимальный интерфейс состояния теперь параметризован (по умолчанию безопасные типы).
 */
export interface PipelineState<
  TValue = Record<string, unknown>,
  TGet = Record<string, unknown>,
  TChildren = Record<string, unknown>,
  TParent = unknown,
> {
  value: TValue;
  get: TGet;
  children: TChildren;
  parent: TParent;
}

/**
 * Мутации типов с использованием Merge и Prettify
 */
export type WithNext<Self extends PipelineState, TNew extends object> = Omit<Self, 'value' | 'get'> & {
  value: abstracts.meta.Prettify<abstracts.meta.Merge<Self['value'], TNew>>;
  get: abstracts.meta.Prettify<abstracts.meta.Merge<Self['get'], TNew>>;
};

export type WithChild<Self extends PipelineState, K extends string, R extends PipelineState> = Omit<
  Self,
  'value' | 'get' | 'children'
> & {
  value: abstracts.meta.Prettify<abstracts.meta.Merge<Self['value'], { [P in K]: R['value'] }>>;
  get: abstracts.meta.Prettify<abstracts.meta.Merge<Self['get'], { [P in K]: R['get'] }>>;
  children: abstracts.meta.Prettify<abstracts.meta.Merge<Self['children'], { [P in K]: R }>>;
};

export type AsChildContext<Self extends PipelineState, K extends string> = Omit<
  Self,
  'value' | 'get' | 'parent' | 'children'
> & {
  value: { name: K };
  get: abstracts.meta.Prettify<abstracts.meta.Merge<Self['get'], { name: K }>>;
  parent: Self;
  children: {};
};

export class ContextPipeline<
  TValue extends object = {},
  TGet extends object = {},
  TChildren extends object = {},
  TParent = unknown,
> implements PipelineState<TValue, TGet, TChildren, TParent>
{
  public value: TValue = {} as TValue;
  public children: TChildren = {} as TChildren;

  public constructor(public parent: TParent = null as TParent) {}

  public get get(): TGet {
    return context.createPipelineGetter(this as any);
  }

  public next<TNew extends object, This extends PipelineState>(this: This, args: TNew): WithNext<This, TNew> {
    return context.assignPipelineNext(this as any, args) as any;
  }

  public nextFactory<Args extends any[], TNew extends object>(mapper: (...args: Args) => TNew) {
    return function <This extends PipelineState>(this: This, ...args: Args): WithNext<This, TNew> {
      return (this as any).next(mapper(...args));
    };
  }

  public child<K extends string, R extends PipelineState, This extends PipelineState>(
    this: This,
    n: K,
    cb: (_: AsChildContext<This, K>) => R,
  ): WithChild<This, K, R> {
    return context.assignPipelineChild(this as any, n, cb) as any;
  }


  public nCb<TNew extends object, TRes = void>(mapper: (cb: (state: any) => TRes) => TNew) {
    return function <This extends PipelineState>(this: This, cb: (state: This) => TRes): WithNext<This, TNew> {
      return (this as any).next(mapper(cb));
    };
  }

  public childFactory<K extends string>(n: K) {
    return function <This extends PipelineState, R extends PipelineState>(
      this: This,
      cb: (_: AsChildContext<This, K>) => R,
    ): WithChild<This, K, R> {
      return (this as any).child(n, cb);
    };
  }

  public switch_<Target>(Ctor: new (parent: any) => Target): Target {
    const nextInstance = new Ctor(this.parent);
    return context.assignPipelineSwitch(this as any, nextInstance as any) as any;
  }

  public mount<K extends string, Target extends PipelineState, This extends PipelineState>(
    this: This,
    n: K,
    Ctor: new (parent: any) => Target,
  ): WithChild<This, K, Target> {
    const nextInstance = new Ctor(this.parent);
    return context.assignPipelineMount(this as any, n, nextInstance) as any;
  }

  /**
   * Map data for different templates
   */
  public adapt<Args extends any[], TNew extends object>(mapper: (...args: Args) => TNew) {
    return function <This extends PipelineState>(this: This, ...args: Args): WithNext<This, TNew> {
      return (this as any).next(mapper(...args));
    };
  }

}

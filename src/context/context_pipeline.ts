import * as context from '@razomy/context';
import * as functions from "@razomy/functions";
import * as abstractions from "@razomy/abstractions";

export class ContextPipeline<TDef extends context.PipelineDef = context.DefaultPipelineDef> implements context.PipelineState<TDef> {
  public value: TDef['value'] = {} as TDef['value'];
  public children: TDef['children'] = {} as TDef['children'];

  public constructor(public parent: TDef['parent'] = null! as TDef['parent']) {}

  public get get(): TDef['get'] {
    return context.createPipelineGetter(this as unknown as context.PipelineState);
  }

  public add<TNew extends object, This extends context.PipelineState>(
    this: This,
    args: (_: This) => TNew,
  ): context.WithNext<This, TNew>;
  public add<TNew extends object, This extends context.PipelineState>(this: This, args: TNew): context.WithNext<This, TNew>;
  public add<TNew extends object, This extends context.PipelineState>(
    this: This,
    args: TNew | abstractions.function_.Function<[This], TNew>,
  ): context.WithNext<This, TNew> {
    if (functions.isFunction<abstractions.function_.Function<[This], TNew>>(args)) {
      return context.assignPipelineNext(this as unknown as context.PipelineState, args(this)) as any;
    }
    return context.assignPipelineNext(this as unknown as context.PipelineState, args) as any;
  }

  public addPipe<TNew extends object, TRes = void>(mapper: (cb: (state: any) => TRes) => TNew) {
    return function <This extends context.PipelineState>(this: This, cb: (state: This) => TRes): context.WithNext<This, TNew> {
      return (this as any).add(mapper(cb));
    };
  }

  public addMap<Args extends any[], TNew extends object>(mapper: (...args: Args) => TNew) {
    return function <This extends context.PipelineState>(this: This, ...args: Args): context.WithNext<This, TNew> {
      return (this as any).add(mapper(...args));
    };
  }

  public addFactory<Args extends any[], TNew extends object>(mapper: (...args: Args) => TNew) {
    return function <This extends context.PipelineState>(this: This, ...args: Args): context.WithNext<This, TNew> {
      return (this as any).add(mapper(...args));
    };
  }

  public child<K extends string, R extends context.PipelineState, This extends context.PipelineState>(
    this: This,
    n: K,
    cb: (_: context.AsChildContext<This, K>) => R,
  ): context.WithChild<This, K, R> {
    return context.assignPipelineChild(this as any, n, cb) as any;
  }

  public childFactory<K extends string>(n: K) {
    return function <This extends context.PipelineState, R extends context.PipelineState>(
      this: This,
      cb: (_: context.AsChildContext<This, K>) => R,
    ): context.WithChild<This, K, R> {
      return (this as any).child(n, cb);
    };
  }

  public line<TNew extends context.PipelineState, This extends context.PipelineState>(
    this: This,
    Ctor: new (p?: any) => TNew,
  ): context.Line<TNew, This> {
    const nextInstance = new Ctor(this.parent);
    return context.assignPipelineSwitch(this as any, nextInstance as any) as any;
  }

  public lineChild<K extends string, Target extends context.PipelineState, This extends context.PipelineState>(
    this: This,
    n: K,
    Ctor: new (parent: any) => Target,
  ): context.WithChild<This, K, Target> {
    const nextInstance = new Ctor(this.parent);
    return context.assignPipelineMount(this as any, n, nextInstance) as any;
  }
}

import * as context from '@razomy/context';
import type { DefaultPipelineDef, PipelineDef, PipelineState } from './PipelineDef';
import type { AsChildContext, Line, WithChild, WithNext } from './Mutations';
import { isFunction } from '@razomy/functions';
import { type Function } from '@razomy/abstractions/functions';

export class ContextPipeline<TDef extends PipelineDef = DefaultPipelineDef> implements PipelineState<TDef> {
  public value: TDef['value'] = {} as TDef['value'];
  public children: TDef['children'] = {} as TDef['children'];

  public constructor(public parent: TDef['parent'] = null! as TDef['parent']) {}

  public get get(): TDef['get'] {
    return context.createPipelineGetter(this as unknown as PipelineState);
  }

  public add<TNew extends object, This extends PipelineState>(
    this: This,
    args: (_: This) => TNew,
  ): WithNext<This, TNew>;
  public add<TNew extends object, This extends PipelineState>(this: This, args: TNew): WithNext<This, TNew>;
  public add<TNew extends object, This extends PipelineState>(
    this: This,
    args: TNew | Function<[This], TNew>,
  ): WithNext<This, TNew> {
    if (isFunction<Function<[This], TNew>>(args)) {
      return context.assignPipelineNext(this as unknown as PipelineState, args(this)) as any;
    }
    return context.assignPipelineNext(this as unknown as PipelineState, args) as any;
  }

  public addPipe<TNew extends object, TRes = void>(mapper: (cb: (state: any) => TRes) => TNew) {
    return function <This extends PipelineState>(this: This, cb: (state: This) => TRes): WithNext<This, TNew> {
      return (this as any).add(mapper(cb));
    };
  }

  public addMap<Args extends any[], TNew extends object>(mapper: (...args: Args) => TNew) {
    return function <This extends PipelineState>(this: This, ...args: Args): WithNext<This, TNew> {
      return (this as any).add(mapper(...args));
    };
  }

  public addFactory<Args extends any[], TNew extends object>(mapper: (...args: Args) => TNew) {
    return function <This extends PipelineState>(this: This, ...args: Args): WithNext<This, TNew> {
      return (this as any).add(mapper(...args));
    };
  }

  public child<K extends string, R extends PipelineState, This extends PipelineState>(
    this: This,
    n: K,
    cb: (_: AsChildContext<This, K>) => R,
  ): WithChild<This, K, R> {
    return context.assignPipelineChild(this as any, n, cb) as any;
  }

  public childFactory<K extends string>(n: K) {
    return function <This extends PipelineState, R extends PipelineState>(
      this: This,
      cb: (_: AsChildContext<This, K>) => R,
    ): WithChild<This, K, R> {
      return (this as any).child(n, cb);
    };
  }

  public line<TNew extends PipelineState, This extends PipelineState>(
    this: This,
    Ctor: new (p?: any) => TNew,
  ): Line<TNew, This> {
    const nextInstance = new Ctor(this.parent);
    return context.assignPipelineSwitch(this as any, nextInstance as any) as any;
  }

  public lineChild<K extends string, Target extends PipelineState, This extends PipelineState>(
    this: This,
    n: K,
    Ctor: new (parent: any) => Target,
  ): WithChild<This, K, Target> {
    const nextInstance = new Ctor(this.parent);
    return context.assignPipelineMount(this as any, n, nextInstance) as any;
  }
}

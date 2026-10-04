import * as abstracts from '@razomy/abstracts';
import * as context from '@razomy/context';

export type PipelineGenerics<
  TC extends object = {},
  TP extends ContextPipeline = any,
  TCh extends Record<PropertyKey, ContextPipeline> = {},
  TCA extends object = {},
> = { c: TC; p: TP; ch: TCh; ca: TCA };

/** Добавление свойств в текущий контекст без накопления WithProperty */
export type NextPipeGenerics<Pgs extends PipelineGenerics, TNew extends object> = PipelineGenerics<
  abstracts.meta.Prettify<Pgs['c'] & TNew>,
  Pgs['p'],
  Pgs['ch'],
  abstracts.meta.Prettify<Pgs['ca'] & TNew>
>;

/** Утилита: объявление метода простого поля в интерфейсе в 1 строку */
export type NextPipe<Pgs extends PipelineGenerics, K extends PropertyKey, V = string> = (
  val: V,
) => NextPipeGenerics<Pgs, { [P in K]: V }>;

/** Добавление дочернего пайплайна */
export type ChildPipeGenerics<
  Pgs extends PipelineGenerics,
  K extends string,
  R extends ContextPipeline,
> = PipelineGenerics<
  abstracts.meta.Prettify<Pgs['c'] & { [P in K]: R['ctx'] }>,
  Pgs['p'],
  abstracts.meta.Prettify<Pgs['ch'] & { [P in K]: R }>,
  abstracts.meta.Prettify<Pgs['ca'] & { [P in K]: R['ctx'] }>
>;

export type ChildPipeCbGenerics<Pgs extends PipelineGenerics, K extends string> = {
  c: { name: K };
  p: ContextPipeline<Pgs>;
  ch: {};
  ca: Pgs['ca'];
};

/** Утилита: объявление вложенного пайплайна в интерфейсе в 1 строку */
export type ChildPipe<Pgs extends PipelineGenerics, URI extends context.ContextFactoryKey, K extends string> = <
  R extends context.ApplyPipeline<URI, any>,
>(
  cb: (_: context.ApplyPipeline<URI, ChildPipeCbGenerics<Pgs, K>>) => R,
) => context.ApplyPipeline<URI, ChildPipeGenerics<Pgs, K, R>>;

/**
 * Интерфейс минимального состояния, необходимого для работы утилит
 */
export interface PipelineState {
  ctx: Record<PropertyKey, any>;
  children: Record<PropertyKey, any>;
  parent?: any;
}

export class ContextPipeline<
  Pgs extends PipelineGenerics = PipelineGenerics,
  URI extends context.ContextFactoryKey = 'contextPipeline',
> {
  public ctx: Pgs['c'] = {} as Pgs['c'];
  public children: Pgs['ch'] = {} as Pgs['ch'];

  public constructor(public parent: Pgs['p']) {}

  public get get(): Pgs['ca'] {
    return context.createPipelineGetter<Pgs['ca']>(this);
  }

  // Используем вынесенную логику next
  public n<TNew extends object>(args: TNew): context.ApplyPipeline<URI, NextPipeGenerics<Pgs, TNew>> {
    return context.assignPipelineNext(this, args) as any;
  }

  // Используем вынесенную логику child
  public c<K extends string, R extends ContextPipeline<any, any>>(
    n: K,
    cb: (_: context.ApplyPipeline<URI, ChildPipeCbGenerics<Pgs, K>>) => R,
  ): context.ApplyPipeline<URI, ChildPipeGenerics<Pgs, K, R>> {
    return context.assignPipelineChild(this, n, cb) as any;
  }
  public cM<
    K extends string
  >(n: K) {
    return <R extends ContextPipeline<any, any>>(cb: (_: context.ApplyPipeline<URI, ChildPipeCbGenerics<Pgs, K>>) => R) =>
      this.c(n,cb);
  }

  public s<Target extends any>(Ctor: new (parent: any) => Target): Target {
    const nextInstance = new Ctor(this.parent);
    return context.assignPipelineSwitch(this, nextInstance as any) as any;
  }

  public m<K extends string, Target extends ContextPipeline<Pgs, any>>(
    n: K,
    Ctor: new (parent: any) => Target,
  ): context.ApplyPipeline<URI, ChildPipeGenerics<Pgs, K, Target>> {
    const nextInstance = new Ctor(this.parent);
    return context.assignPipelineMount(this, n, nextInstance) as any;
  }
}

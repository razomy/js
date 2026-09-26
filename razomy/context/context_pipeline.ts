import * as abstracts from '@razomy/abstracts';

/** Добавление свойств в текущий контекст без накопления WithProperty */
export type NextCtx<
  TC extends object,
  TP extends ContextPipeline,
  TCh extends Record<PropertyKey, ContextPipeline>,
  TCA extends object,
  TNew extends object,
> = ContextPipeline<
  abstracts.meta.Prettify<TC & TNew>,
  TP,
  TCh,
  abstracts.meta.Prettify<TCA & TNew>
>;

/** Добавление дочернего пайплайна */
export type NextChild<
  TC extends object,
  TP extends ContextPipeline,
  TCh extends Record<PropertyKey, ContextPipeline>,
  TCA extends object,
  K extends string,
  R extends ContextPipeline,
> = ContextPipeline<
  abstracts.meta.Prettify<TC & { [P in K]: R['ctx'] }>,
  TP,
  abstracts.meta.Prettify<TCh & { [P in K]: R }>,
  abstracts.meta.Prettify<TCA & { [P in K]: R['ctx'] }>
>;

/** Сигнатура колбэка создания дочернего контекста */
export type ChildCb<
  TC extends object,
  TP extends ContextPipeline,
  TCh extends Record<PropertyKey, ContextPipeline>,
  TCA extends object,
  K extends string,
  R extends ContextPipeline,
> = (_: ContextPipeline<{ name: K }, ContextPipeline<TC, TP, TCh, TCA>, {}, TCA>) => R;

/** Утилита: объявление метода простого поля в интерфейсе в 1 строку */
export type Field<
  TC extends object,
  TP extends ContextPipeline,
  TCh extends Record<PropertyKey, ContextPipeline>,
  TCA extends object,
  K extends PropertyKey,
  V = string,
> = (val: V) => NextCtx<TC, TP, TCh, TCA, { [P in K]: V }>;

/** Утилита: объявление вложенного пайплайна в интерфейсе в 1 строку */
export type ChildMethod<
  TC extends object,
  TP extends ContextPipeline,
  TCh extends Record<PropertyKey, ContextPipeline>,
  TCA extends object,
  K extends string,
> = <R extends ContextPipeline>(cb: ChildCb<TC, TP, TCh, TCA, K, R>) => NextChild<TC, TP, TCh, TCA, K, R>;

export class ContextPipeline<
  TC extends object = {},
  TP extends ContextPipeline = any,
  TCh extends Record<PropertyKey, ContextPipeline> = any,
  TCA extends object = {},
> {
  public ctx: TC = {} as TC;
  public children: TCh = {} as TCh;

  public constructor(public parent: TP) {}

  public get get() {
    return new Proxy({} as TCA, {
      get: (_, prop: string) => {
        // 1. Ищем в текущем контексте
        if (prop in this.ctx) {
          return this.ctx[prop as keyof TC];
        }
        // 2. Ищем у родителя (если он есть)
        if (this.parent) {
          return this.parent.get[prop];
        }
        return undefined;
      },
    });
  }

  public m<TNew extends object>(args: TNew): NextCtx<TC, TP, TCh, TCA, TNew> {
    Object.assign(this.ctx, args);
    return this as any;
  }

  public c<K extends string, R extends ContextPipeline>(
    propName: K,
    c: ChildCb<TC, TP, TCh, TCA, K, R>,
  ): NextChild<TC, TP, TCh, TCA, K, R> {
    const child = new ContextPipeline<{ name: K }, this, {}, TCA>(this);
    (child.ctx as any).name = propName;
    const childR = c(child as any);
    (this.children as any)[propName] = childR;
    Object.assign(this.ctx, { [propName]: childR.ctx });
    return this as any;
  }
}

export function cpl() {
  return new ContextPipeline<{}>(null!);
}

import * as abstracts from '@razomy/abstracts';

export type PipelineGenerics<
  TC extends object = {},
  TP extends ContextPipeline = any,
  TCh extends Record<PropertyKey, ContextPipeline> = {},
  TCA extends object = {},
> = { c: TC; p: TP; ch: TCh; ca: TCA };

export interface PipelineKindMap<Pgs extends PipelineGenerics> {
  base: ContextPipeline<Pgs, 'base'>;
}
export type PipelineURI = keyof PipelineKindMap<any>;

export type ApplyPipeline<URI extends PipelineURI, Pgs extends PipelineGenerics> = PipelineKindMap<Pgs>[URI];

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

/** Утилита: объявление вложенного пайплайна в интерфейсе в 1 строку */
export type ChildPipe<Pgs extends PipelineGenerics, URI extends PipelineURI, K extends string> = <
  R extends ApplyPipeline<URI, any>,
>(
  cb: (
    _: ApplyPipeline<
      URI,
      {
        c: { name: K };
        p: ContextPipeline<Pgs>;
        ch: {};
        ca: Pgs['ca'];
      }
    >,
  ) => R,
) => ApplyPipeline<URI, ChildPipeGenerics<Pgs, K, R>>;

/**
 * Интерфейс минимального состояния, необходимого для работы утилит
 */
export interface PipelineState {
  ctx: Record<PropertyKey, any>;
  children: Record<PropertyKey, any>;
  parent?: any;
  get?: any;
}

/**
 * Создает Proxy для каскадного чтения свойств (текущий ctx -> parent.get)
 */
export function createPipelineGetter<TContextAccess extends object>(
  instance: PipelineState
): TContextAccess {
  return new Proxy({} as TContextAccess, {
    get: (_, prop: string) => {
      // 1. Ищем в текущем контексте
      if (prop in instance.ctx) {
        return instance.ctx[prop];
      }
      // 2. Ищем у родителя (если он есть)
      if (instance.parent && instance.parent.get) {
        return instance.parent.get[prop];
      }
      return undefined;
    },
  });
}

/**
 * Мутирует текущий контекст, добавляя новые поля
 */
export function assignPipelineNext<T extends PipelineState>(
  instance: T,
  args: object
): T {
  Object.assign(instance.ctx, args);
  return instance;
}

/**
 * Создает дочерний пайплайн через полиморфный вызов конструктора и связывает контексты
 */
export function assignPipelineChild<T extends PipelineState>(
  instance: T,
  propName: string,
  cb: (child: any) => any
): T {
  // Полиморфный new: создает инстанс того же класса, что и текущий объект
  const Ctor = (instance as any).constructor as new (parent: any) => any;
  const child = new Ctor(instance);

  child.ctx.name = propName;
  const childResult = cb(child);

  instance.children[propName] = childResult;
  Object.assign(instance.ctx, { [propName]: childResult.ctx });

  return instance;
}

export class ContextPipeline<Pgs extends PipelineGenerics = PipelineGenerics, URI extends PipelineURI = 'base'> {
  public ctx: Pgs['c'] = {} as Pgs['c'];
  public children: Pgs['ch'] = {} as Pgs['ch'];

  public constructor(public parent: Pgs['p']) {}

  public get get(): Pgs['ca'] {
    return createPipelineGetter<Pgs['ca']>(this);
  }

  // Используем вынесенную логику next
  public n<TNew extends object>(
    args: TNew
  ): ApplyPipeline<URI, NextPipeGenerics<Pgs, TNew>> {
    return assignPipelineNext(this, args) as any;
  }

  // Используем вынесенную логику child
  public c<K extends string, R extends ContextPipeline<any, any>>(
    propName: K,
    cb: (
      _: ApplyPipeline<
        URI,
        {
          c: { name: K };
          p: ContextPipeline<Pgs>;
          ch: {};
          ca: Pgs['ca'];
        }
      >
    ) => R
  ): ApplyPipeline<URI, ChildPipeGenerics<Pgs, K, R>> {
    return assignPipelineChild(this, propName, cb) as any;
  }
}

export function cPl() {
  return new ContextPipeline(null!);
}

import * as abstractions from "@razomy/abstractions";
import * as context from "@razomy/context";

export type WithNext<Self extends context.PipelineState, TNew extends object> = Omit<Self, 'value' | 'get'> & {
  value: abstractions.meta.Prettify<abstractions.meta.Merge<Self['value'], TNew>>;
  get: abstractions.meta.Prettify<abstractions.meta.Merge<Self['get'], TNew>>;
};

export type WithChild<Self extends context.PipelineState, K extends string, R extends context.PipelineState> = Omit<
  Self,
  'value' | 'get' | 'children'
> & {
  value: abstractions.meta.Prettify<abstractions.meta.Merge<Self['value'], { [P in K]: R['value'] }>>;
  get: abstractions.meta.Prettify<abstractions.meta.Merge<Self['get'], { [P in K]: R['get'] }>>;
  children: abstractions.meta.Prettify<abstractions.meta.Merge<Self['children'], { [P in K]: R }>>;
};

export type AsChildContext<Self extends context.PipelineState, K extends string> = Omit<
  Self,
  'value' | 'get' | 'parent' | 'children'
> & {
  value: { name: K };
  get: abstractions.meta.Prettify<abstractions.meta.Merge<Self['get'], { name: K }>>;
  parent: Self;
  children: {};
};

export type Line<Core extends context.PipelineState, Source extends context.PipelineState> = Omit<Core,
  'value' | 'get' | 'parent' | 'children'> & {
  value: Source['value'],
  get: Source['get'],
  children: Source['children'],
  parent: Source['parent'],
};

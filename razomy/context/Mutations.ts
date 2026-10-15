import type {PipelineState} from "./PipelineDef";
import * as abstractions from "@razomy/abstractions";


export type WithNext<Self extends PipelineState, TNew extends object> = Omit<Self, 'value' | 'get'> & {
  value: abstractions.meta.Prettify<abstractions.meta.Merge<Self['value'], TNew>>;
  get: abstractions.meta.Prettify<abstractions.meta.Merge<Self['get'], TNew>>;
};

export type WithChild<Self extends PipelineState, K extends string, R extends PipelineState> = Omit<
  Self,
  'value' | 'get' | 'children'
> & {
  value: abstractions.meta.Prettify<abstractions.meta.Merge<Self['value'], { [P in K]: R['value'] }>>;
  get: abstractions.meta.Prettify<abstractions.meta.Merge<Self['get'], { [P in K]: R['get'] }>>;
  children: abstractions.meta.Prettify<abstractions.meta.Merge<Self['children'], { [P in K]: R }>>;
};

export type AsChildContext<Self extends PipelineState, K extends string> = Omit<
  Self,
  'value' | 'get' | 'parent' | 'children'
> & {
  value: { name: K };
  get: abstractions.meta.Prettify<abstractions.meta.Merge<Self['get'], { name: K }>>;
  parent: Self;
  children: {};
};

export type Line<Core extends PipelineState, Source extends PipelineState> = Omit<Core,
  'value' | 'get' | 'parent' | 'children'> & {
  value: Source['value'],
  get: Source['get'],
  children: Source['children'],
  parent: Source['parent'],
};

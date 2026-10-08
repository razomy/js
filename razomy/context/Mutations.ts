import type {PipelineState} from "./PipelineDef";
import * as abstracts from "@razomy/abstracts";


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

export type Line<Core extends PipelineState, Source extends PipelineState> = Omit<Core,
  'value' | 'get' | 'parent' | 'children'> & {
  value: Source['value'],
  get: Source['get'],
  children: Source['children'],
  parent: Source['parent'],
};

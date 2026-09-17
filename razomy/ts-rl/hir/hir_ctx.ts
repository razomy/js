import * as abstracts from "@razomy/abstracts";

export type Id = string;
export type Layer = 'description' | 'parent' | 'prev' | 'next';

export interface HirCtx {
  root: abstracts.translators.HirType | null;
  nodes: Map<Id, abstracts.translators.HirType>
}

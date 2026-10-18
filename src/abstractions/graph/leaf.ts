import * as abstractions from '@razomy/abstractions';

export interface Leaf<T> extends abstractions.structure.Node<T> {}

export interface HasChildrenDict<T> {
  children: abstractions.structure.Dict<T>;
}
export type HasChildrenDictOrList<T> = abstractions.graph.HasChildren<T[]> | HasChildrenDict<T>;

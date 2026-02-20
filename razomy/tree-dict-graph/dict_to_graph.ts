import type {BranchDictOrLeaf} from '@razomy/tree-dict';
import type {Graph} from '@razomy/graph';
import {iterateChildren} from './iterate_children';

export function dictToGraph<T, I extends BranchDictOrLeaf<T>>(input: I): Graph<I> {
  const graph: Graph<I> = {
    nodes: [],
    edges: []
  };
  iterateChildren(graph, input)
  return graph;
}

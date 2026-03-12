import type { BranchDictOrLeaf } from '@razomy/tree-dict';
import type { EdgeListGraph } from '@razomy/abstracts/domains';
import { iterateChildren } from './iterate_children';

export function dictToGraph<T, I extends BranchDictOrLeaf<T>>(input: I): EdgeListGraph<I> {
  const graph: EdgeListGraph<I> = {
    nodes: [],
    edges: [],
  };
  iterateChildren(graph, input);
  return graph;
}

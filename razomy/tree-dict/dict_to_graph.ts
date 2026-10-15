import * as treeDict from '@razomy/tree-dict';
import * as abstractions from '@razomy/abstractions';

export function dictToGraph<T, I extends treeDict.BranchDictOrLeaf<T>>(input: I): abstractions.graphs.EdgeListGraph<I> {
  const graph: abstractions.graphs.EdgeListGraph<I> = {
    nodes: [],
    edges: [],
  };
  treeDict.iterateChildren(graph, input);
  return graph;
}

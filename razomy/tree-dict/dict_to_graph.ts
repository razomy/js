import * as treeDict from '@razomy/tree-dict';
import * as abstractions from '@razomy/abstractions';

export function dictToGraph<T, I extends treeDict.BranchDictOrLeaf<T>>(input: I): abstractions.graph.EdgeListGraph<I> {
  const graph: abstractions.graph.EdgeListGraph<I> = {
    nodes: [],
    edges: [],
  };
  treeDict.iterateChildren(graph, input);
  return graph;
}

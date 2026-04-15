import * as treeDict from '@razomy/tree-dict';
import * as abstracts from '@razomy/abstracts';

export function dictToGraph<T, I extends treeDict.BranchDictOrLeaf<T>>(input: I): abstracts.graphs.EdgeListGraph<I> {
  const graph: abstracts.graphs.EdgeListGraph<I> = {
    nodes: [],
    edges: [],
  };
  treeDict.iterateChildren(graph, input);
  return graph;
}

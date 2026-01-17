import {BranchDictOrLeaf} from 'razomy.tree/dict/map_branch';
import {Graph} from 'razomy.graph/graph';
import {iterateChildren} from './iterate_children';

export function dictToGraph<T, I extends BranchDictOrLeaf<T>>(input: I): Graph<I> {
  const graph: Graph<I> = {
    nodes: [],
    edges: []
  };
  iterateChildren(graph, input)
  return graph;
}

import {BranchDictOrLeaf} from "razomy/trees/dict/dict";
import {Graph} from "razomy/graph/graph";


function iterate_children<T>(
  graph: Graph<BranchDictOrLeaf<T>>,
  branch: BranchDictOrLeaf<T>
) {
  graph.nodes.push(branch);
  if ('children' in branch && branch.children.lenght) {
    for (const entity_key in branch.children) {
      const value = branch.children[entity_key];
      graph.edges.push([branch, value]);
      iterate_children(graph, value)
    }
  }
}

export function dict_to_graph<T, I extends BranchDictOrLeaf<T>>(input: I): Graph<I> {
  const graph: Graph<I> = {
    nodes: [],
    edges: []
  };

  iterate_children(graph, input)

  return graph;
}
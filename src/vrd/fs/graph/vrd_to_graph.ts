import {BranchDictOrLeaf} from "razomy.js/trees/dict/dict";
import {Graph} from "razomy.js/graph/graph";
import {is_vrd, VrdOrValue} from "razomy.js/vrd/vrd";


function iterate_children<T>(
  graph: Graph<VrdOrValue<T>>,
  branch: VrdOrValue<T>
) {
  graph.nodes.push(branch);
  if (is_vrd(branch)) {
    for (const entityKey in branch) {
      const value = branch[entityKey];
      graph.edges.push([branch, value]);
      iterate_children(graph, value)
    }
  }
}

export function vrd_to_graph<T, I extends VrdOrValue<T>>(input: I): Graph<I> {
  const graph: Graph<I> = {
    nodes: [],
    edges: []
  };

  iterate_children(graph, input)

  return graph;
}
import {BranchDictOrLeaf} from "razomy/trees/dict/dict";
import {Graph} from "razomy/graph/graph";
import {is_vrd, VrdOrValue} from "razomy/vrd/vrd";


function iterate_children<T>(
  graph: Graph<VrdOrValue<T>>,
  branch: VrdOrValue<T>
) {
  graph.nodes.push(branch);
  if (is_vrd(branch)) {
    for (const entity_key in branch) {
      const value = branch[entity_key];
      graph.edges.push([branch, value]);
      iterate_children(graph, value)
    }
  }
}

function vrd_to_graph<T, I extends VrdOrValue<T>>(input: I): Graph<I> {
  const graph: Graph<I> = {
    nodes: [],
    edges: []
  };

  iterate_children(graph, input)

  return graph;
}

export default vrd_to_graph;

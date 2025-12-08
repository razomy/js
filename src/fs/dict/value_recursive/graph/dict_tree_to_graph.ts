import {BranchDictOrLeaf} from "razomy.js/trees/dict/dict";
import {Graph} from "razomy.js/graph/graph";
import {is_value_recursion, ValueRecursiveDictOrValue} from "razomy.js/vrd/value";


function iterate_children<T>(
  graph: Graph<ValueRecursiveDictOrValue<T>>,
  branch: ValueRecursiveDictOrValue<T>
) {
  graph.nodes.push(branch);
  if (is_value_recursion(branch)) {
    for (const entityKey in branch) {
      const value = branch[entityKey];
      graph.edges.push([branch, value]);
      iterate_children(graph, value)
    }
  }
}

export function dict_to_graph<T, I extends ValueRecursiveDictOrValue<T>>(input: I): Graph<I> {
  const graph: Graph<I> = {
    nodes: [],
    edges: []
  };

  iterate_children(graph, input)

  return graph;
}
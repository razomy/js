import {DictRoot, DictRootOrLeaf} from "razomy.js/trees/dict_tree";

export interface NodesAndEdges<T> {
  nodes: T[],
  edges: [T, T][],
}

function iterate_children<T>(
  nodes_and_edges: NodesAndEdges<DictRootOrLeaf<T>>,
  branch: DictRootOrLeaf<T>
) {
  nodes_and_edges.nodes.push(branch);

  if('children' in branch)
  {
    for (const entityKey in branch.children) {
      const value = branch.children[entityKey];
      nodes_and_edges.edges.push([branch, value]);
      iterate_children(nodes_and_edges, value)
    }
  }
}

export function dict_tree_to_nodes_and_edges<T, I extends DictRoot<T>>(input: I): NodesAndEdges<I> {
  const nodes_and_edges: NodesAndEdges<I> = {
    nodes: [],
    edges: []
  };

  iterate_children(nodes_and_edges, input)

  return nodes_and_edges;
}
import * as treeDict from "@razomy/tree-dict";
import * as abstracts from "@razomy/abstracts";

export function iterateChildren<T>(graph: abstracts.domains.EdgeListGraph<treeDict.BranchDictOrLeaf<T>>, branch: treeDict.BranchDictOrLeaf<T>) {
  graph.nodes.push(branch);
  if ('children' in branch && branch.children.lenght) {
    for (const entityKey in branch.children) {
      const value = branch.children[entityKey];
      graph.edges.push([branch, value]);
      iterateChildren(graph, value);
    }
  }
}

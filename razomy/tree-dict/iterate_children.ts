import * as treeDict from '@razomy/tree-dict';
import * as abstractions from '@razomy/abstractions';

export function iterateChildren<T>(
  graph: abstractions.graphs.EdgeListGraph<treeDict.BranchDictOrLeaf<T>>,
  branch: treeDict.BranchDictOrLeaf<T>,
) {
  graph.nodes.push(branch);
  if ('children' in branch && branch.children.lenght) {
    for (const entityKey in branch.children) {
      const value = branch.children[entityKey];
      graph.edges.push([branch, value]);
      iterateChildren(graph, value);
    }
  }
}

import {BranchDictOrLeaf} from 'razomy.tree.dict';
import {Graph} from 'razomy.graph';


export function iterateChildren<T>(
  graph: Graph<BranchDictOrLeaf<T>>,
  branch: BranchDictOrLeaf<T>
) {
  graph.nodes.push(branch);
  if ('children' in branch && branch.children.lenght) {
    for (const entityKey in branch.children) {
      const value = branch.children[entityKey];
      graph.edges.push([branch, value]);
      iterateChildren(graph, value)
    }
  }
}

import {BranchDictOrLeaf} from 'razomy.tree/dict/map_branch';
import {Graph} from 'razomy.graph/graph';


export function iterate_children<T>(
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

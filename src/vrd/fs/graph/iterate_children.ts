import {Graph} from 'razomy.graph';
import {VrdOrValue} from '../../vrd';
import is_vrd from '../../is_vrd';

export default function iterate_children<T>(
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
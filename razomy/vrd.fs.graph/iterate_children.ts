import {Graph} from 'razomy.graph';
import {VrdOrValue} from 'razomy.vrd';
import {isVrd} from '../vrd/is_vrd';

export function iterateChildren<T>(
  graph: Graph<VrdOrValue<T>>,
  branch: VrdOrValue<T>
) {
  graph.nodes.push(branch);
  if (isVrd(branch)) {
    for (const entityKey in branch) {
      const value = branch[entityKey];
      graph.edges.push([branch, value]);
      iterateChildren(graph, value)
    }
  }
}
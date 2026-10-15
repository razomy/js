import * as abstractions from '@razomy/abstractions';
import * as vrd from '@razomy/vrd';

export function iterateChildren<T>(
  graph: abstractions.graphs.EdgeListGraph<vrd.VrdOrValue<T>>,
  branch: vrd.VrdOrValue<T>,
) {
  graph.nodes.push(branch);
  if (vrd.isVrd(branch)) {
    for (const entityKey in branch) {
      const value = branch[entityKey];
      graph.edges.push([branch, value]);
      iterateChildren(graph, value);
    }
  }
}

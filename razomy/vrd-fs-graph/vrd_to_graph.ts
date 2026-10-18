import * as vrd from '@razomy/vrd';
import * as abstractions from '@razomy/abstractions';
import * as vrdFsGraph from '@razomy/vrd-fs-graph';

export function vrdToGraph<T, I extends vrd.VrdOrValue<T>>(input: I): abstractions.graph.EdgeListGraph<I> {
  const graph: abstractions.graph.EdgeListGraph<I> = {
    nodes: [],
    edges: [],
  };

  vrdFsGraph.iterateChildren(graph, input);

  return graph;
}

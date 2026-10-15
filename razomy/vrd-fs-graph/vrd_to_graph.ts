import * as vrd from '@razomy/vrd';
import * as abstractions from '@razomy/abstractions';
import * as vrdFsGraph from '@razomy/vrd-fs-graph';

export function vrdToGraph<T, I extends vrd.VrdOrValue<T>>(input: I): abstractions.graphs.EdgeListGraph<I> {
  const graph: abstractions.graphs.EdgeListGraph<I> = {
    nodes: [],
    edges: [],
  };

  vrdFsGraph.iterateChildren(graph, input);

  return graph;
}

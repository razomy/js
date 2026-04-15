import * as vrd from '@razomy/vrd';
import * as abstracts from '@razomy/abstracts';
import * as vrdFsGraph from "@razomy/vrd-fs-graph";

export function vrdToGraph<T, I extends vrd.VrdOrValue<T>>(input: I): abstracts.graphs.EdgeListGraph<I> {
  const graph: abstracts.graphs.EdgeListGraph<I> = {
    nodes: [],
    edges: [],
  };

  vrdFsGraph.iterateChildren(graph, input);

  return graph;
}

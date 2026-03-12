import { iterateChildren } from './iterate_children';
import * as vrd from '@razomy/vrd';
import * as abstracts from '@razomy/abstracts';

export function vrdToGraph<T, I extends vrd.VrdOrValue<T>>(input: I): abstracts.graphs.EdgeListGraph<I> {
  const graph: abstracts.graphs.EdgeListGraph<I> = {
    nodes: [],
    edges: [],
  };

  iterateChildren(graph, input);

  return graph;
}

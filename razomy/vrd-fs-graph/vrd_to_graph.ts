import { iterateChildren } from './iterate_children';
import * as abstracts from "@razomy/abstracts";
import * as vrd from "@razomy/vrd";

export function vrdToGraph<T, I extends vrd.VrdOrValue<T>>(input: I): abstracts.domains.EdgeListGraph<I> {
  const graph: abstracts.domains.EdgeListGraph<I> = {
    nodes: [],
    edges: [],
  };

  iterateChildren(graph, input);

  return graph;
}

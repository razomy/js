import {Graph} from 'razomy.graph/graph';
import {VrdOrValue} from 'razomy.vrd/vrd';
import {iterate_children} from './iterate_children';


export function vrd_to_graph<T, I extends VrdOrValue<T>>(input: I): Graph<I> {
  const graph: Graph<I> = {
    nodes: [],
    edges: []
  };

  iterate_children(graph, input)

  return graph;
}



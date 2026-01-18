import {Graph} from 'razomy.graph';
import {VrdOrValue} from 'razomy.vrd';
import {iterateChildren} from './iterate_children';


export function vrdToGraph<T, I extends VrdOrValue<T>>(input: I): Graph<I> {
  const graph: Graph<I> = {
    nodes: [],
    edges: []
  };

  iterateChildren(graph, input)

  return graph;
}



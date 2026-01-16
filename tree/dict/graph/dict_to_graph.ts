import { BranchDictOrLeaf } from 'razomy.tree/dict/map_branch';
import { Graph } from 'razomy.graph/graph';
import {iterate_children} from './iterate_children';

export function dict_to_graph<T, I extends BranchDictOrLeaf<T>>(input: I): Graph<I> {
    const graph: Graph<I> = {
            nodes: [],
            edges: []
          };
    iterate_children(graph, input)
    return graph;
}

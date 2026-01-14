import { BranchDictOrLeaf } from 'razomy.trees/dict/dict';
import { Graph } from 'razomy.graph/graph';
import iterate_children from './dict_tree_to_graph';

export default function dict_to_graph<T, I extends BranchDictOrLeaf<T>>(input: I): Graph<I> {
    const graph: Graph<I> = {
            nodes: [],
            edges: []
          };
    iterate_children(graph, input)
    return graph;
}

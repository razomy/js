import * as dbGraph from "@razomy/db-graph";

export function stepIn(state: dbGraph.query.QueryState, edgeKey?: dbGraph.EdgeKey): dbGraph.query.QueryState {
    const nextVids = new Set<dbGraph.Id>();
    for (const id of state.currentVids) {
    const edges = dbGraph.storage.getIncomingEdges(state.storage, id, edgeKey);
    for (const edge of edges) nextVids.add(edge.from);
    }

    return {...state, currentVids: Array.from(nextVids)};
}

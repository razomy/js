import * as dbGraph from "@razomy/db-graph";

export function yieldVertices(state: dbGraph.query.QueryState): dbGraph.Node[] {
    return state.currentVids
    .map(id => dbGraph.storage.getVertex(state.storage, id))
    .filter((v): v is dbGraph.Node => v !== undefined);
}

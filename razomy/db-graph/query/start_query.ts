import * as dbGraph from "@razomy/db-graph";

export function startQuery(storage: dbGraph.storage.GraphStorage, vids: dbGraph.Id | dbGraph.Id[]): dbGraph.query.QueryState {
    return ({
      storage,
      currentVids: Array.isArray(vids) ? vids : [vids],
    });
}

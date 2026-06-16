import * as dbGraph from "@razomy/db-graph";

export function yieldIds(state: dbGraph.query.QueryState): dbGraph.Id[] {
    return state.currentVids;
}

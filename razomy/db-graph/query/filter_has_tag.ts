import * as dbGraph from "@razomy/db-graph";

export function filterHasTag(state: dbGraph.query.QueryState, tag: dbGraph.Tag): dbGraph.query.QueryState {
    const filtered = state.currentVids.filter(id => {
            const v = dbGraph.storage.getVertex(state.storage, id)!;
            return v && v.tags.includes(tag);
          });
    return {...state, currentVids: filtered};
}

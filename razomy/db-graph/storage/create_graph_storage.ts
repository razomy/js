import * as dbGraph from "@razomy/db-graph";

export function createGraphStorage(): dbGraph.storage.GraphStorage {
    return ({
      vertices: new Map(),
      outEdges: new Map(),
      inEdges: new Map(),
    });
}

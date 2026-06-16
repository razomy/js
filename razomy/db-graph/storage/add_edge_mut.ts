import * as dbGraph from "@razomy/db-graph";

export function addEdgeMut(storage: dbGraph.storage.GraphStorage, edge: dbGraph.Edge): void {
    const outList = storage.outEdges.get(edge.from) || [];
    outList.push(edge);
    storage.outEdges.set(edge.from, outList);
    const inList = storage.inEdges.get(edge.to) || [];
    inList.push(edge);
    storage.inEdges.set(edge.to, inList);
}

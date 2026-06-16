import * as dbGraph from "@razomy/db-graph";

export function addVertexMut(storage: dbGraph.storage.GraphStorage, vertex: dbGraph.Node): void {
    storage.vertices.set(vertex.id, vertex);
    if (!storage.outEdges.has(vertex.id)) storage.outEdges.set(vertex.id, []);
    if (!storage.inEdges.has(vertex.id)) storage.inEdges.set(vertex.id, []);
}

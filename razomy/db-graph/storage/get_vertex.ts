import * as dbGraph from "@razomy/db-graph";

export function getVertex(storage: dbGraph.storage.GraphStorage, id: dbGraph.Id): dbGraph.Node | undefined {
    return storage.vertices.get(id);
}

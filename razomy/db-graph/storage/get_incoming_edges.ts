import * as dbGraph from "@razomy/db-graph";

export function getIncomingEdges (storage: dbGraph.storage.GraphStorage, id: dbGraph.Id, edgeKey?: dbGraph.EdgeKey) : dbGraph.Edge[] {
  const edges = storage.inEdges.get(id) || [];
  return edgeKey ? edges.filter(e => e.edgeKey === edgeKey) : edges;
}

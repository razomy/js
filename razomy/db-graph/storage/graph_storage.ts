import * as dbGraph from "@razomy/db-graph";

export interface GraphStorage {
  vertices: Map<dbGraph.Id, dbGraph.Node>;
  outEdges: Map<dbGraph.Id, dbGraph.Edge[]>;
  inEdges: Map<dbGraph.Id, dbGraph.Edge[]>;
}

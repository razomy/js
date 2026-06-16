import * as dbGraph from "@razomy/db-graph";

// Состояние текущего запроса

export interface QueryState {
  storage: dbGraph.storage.GraphStorage;
  currentVids: dbGraph.Id[];
}

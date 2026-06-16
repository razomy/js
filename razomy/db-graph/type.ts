export type Id = string | number;
export type Value = Record<string, any>;
export type Tag = string;
export type EdgeKey = string;

export interface Node {
  id: Id;
  tags: Tag[];
  value: Value;
}

export interface Edge {
  from: Id;
  to: Id;
  edgeKey: EdgeKey;
  value: Value;
}


export interface GraphStorage {
  vertices: Map<Id, Node>;
  outEdges: Map<Id, Edge[]>;
  inEdges: Map<Id, Edge[]>;
}

// Состояние текущего запроса
export interface QueryState {
  storage: GraphStorage;
  currentVids: Id[];
}
